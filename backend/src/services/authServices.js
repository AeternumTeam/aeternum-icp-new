import axios from 'axios';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

import configs from '../config/config.js';
import { createUser, getUserByEmail } from '../models/UserModel.js';
import createSlug from '../utils/createSlug.js';
import { getUserLocaleDate } from '../utils/date.js';
import { StatusCodes } from 'http-status-codes';
import { createToken, updateToken, updateTokenExpiration } from '../models/TokenModel.js';

const OAUTH_SCOPES = ['openid', 'profile', 'email'].join(' ');
const STATE_VALUE = crypto.randomBytes(32).toString('hex');
  
const createTokenParams = (code) => new URLSearchParams({
    client_id: configs.googleClientId,
    client_secret: configs.googleClientSecret,
    code,
    grant_type: 'authorization_code',
    redirect_uri: configs.redirectUrl,
}).toString();

const createAuthParams = () => new URLSearchParams({
    client_id: configs.googleClientId,
    redirect_uri: configs.redirectUrl,
    response_type: 'code',
    scope: OAUTH_SCOPES,
    access_type: 'offline',
    state: STATE_VALUE,
    prompt: 'consent',
  }).toString();

const authServices = {
    getAuthUrl : () => {
        try {
          const authUrl = `${configs.authUrl}?${createAuthParams()}`;
          return { authUrl }
        } catch (error) {
          return { 
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            error: error.message
           };
        }
    },

    getAuthToken : async (data) => {
        const { code, state } = data;

        if (!code || typeof code !== 'string') {
            return { 
                status: StatusCodes.BAD_REQUEST,
                message: "Bad Request",
                error: 'Authorization code must be provided'
            };
        }

        if (state !== STATE_VALUE) {
            return {
                status: StatusCodes.BAD_REQUEST,
                message: "Bad Request",
                error: 'Invalid state parameter'
            };
        }

        try {
            const tokenParams = createTokenParams(code);
            const { data } = await axios.post(`${configs.tokenUrl}?${tokenParams}`, null, { 
                timeout: 5000 
            });

            if (!data.id_token) {
                return {
                    status: StatusCodes.NOT_FOUND, 
                    message: "Not Found",
                    error: 'OAuth token not found'
                };
            }

            const { email, name, picture } = jwt.decode(data.id_token);

            let user = await getUserByEmail({ email });

            if (!user) {
                user = await createUser({
                    id: uuidv4(),
                    name,
                    username: createSlug(name),
                    email,
                    picture,
                    password: null,
                    created_at: getUserLocaleDate(),
                    updated_at: getUserLocaleDate(),
                });
            }

            const token = jwt.sign({ id: user.id, username: user.username, email: user.email, picture: user.picture }, configs.tokenSecret, {
                expiresIn: configs.tokenExpiration,
                algorithm: 'HS256',
            });

            const tokenDB = await createToken({ id: uuidv4(), user : user.id, payload: token, expired: "no", created_at: getUserLocaleDate(), updated_at: getUserLocaleDate() });
            if(!tokenDB) {
                return {
                    status: StatusCodes.BAD_REQUEST,
                    message: "Bad Request",
                    error: "Failed created token"
                }
            }

            return {
                token,
                user
            };
        } catch (error) {
            return  {
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
                error: error.message
            };
        }
    },

    isUserLoggedIn : async (data) => {
        const { token } = data;
        try {
          if (!token) {
            return {
              status: StatusCodes.NOT_FOUND,
              message: 'Token not provided',
              loggedIn: false,
              error: 'Token is not provided',
            };
          }
      
          const user = jwt.verify(token, configs.tokenSecret);
          const newToken = jwt.sign({ user }, configs.tokenSecret, {
            expiresIn: configs.jwtExpiration,
            algorithm: 'HS256',
          });
      
          const updatedToken = await updateToken({
            payload: newToken,
            expired: 'no',
            updated_at: getUserLocaleDate(),
            payloadOld: token,
          });
      
          if (!updatedToken) {
            return {
              status: StatusCodes.BAD_REQUEST,
              message: 'Failed to update token',
              loggedIn: false,
              error: 'Failed to update token',
            };
          }
      
          return {
            newToken,
            loggedIn: true,
            user,
          };
        } catch (error) {
          if (error.name === 'TokenExpiredError') {
            const expiredTokenUpdate = await updateTokenExpiration({
              payload: token,
              expired: 'yes',
              updated_at: getUserLocaleDate(),
            });
      
            if (!expiredTokenUpdate) {
              return {
                status: StatusCodes.BAD_REQUEST,
                message: 'Failed to update expired token',
                loggedIn: false,
                error: 'Failed to update expired token',
              };
            }
      
            return {
              status: StatusCodes.UNAUTHORIZED,
              message: 'Token has expired',
              loggedIn: false,
              error: 'Token has expired',
            };
          }
      
          return {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
            loggedIn: false,
            error: error.message,
          };
        }
    },

    userLogout : async (data) => {
        try {
            const { token } = data;

            const updateTokenExpiration = await updateTokenExpiration({
                payload: token,
                expired: "yes",
                updated_at: getUserLocaleDate()
              });
          
            if (!updateTokenExpiration) {
                return {
                    status: StatusCodes.BAD_REQUEST,
                    message: 'Failed to update expired token',
                    error: 'Failed to update expired token',
                };
            }

            return {};
        } catch (error) {
            return  {
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
                error: error.message
            };
        }
    }
}

export default authServices;