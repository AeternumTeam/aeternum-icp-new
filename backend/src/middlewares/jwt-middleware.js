import { StatusCodes } from 'http-status-codes';
import jwt from "jsonwebtoken";

import configs from "../config/config.js";
import { getTokenByPayload } from '../models/TokenModel.js';

const verifyJWT = async (req, res, next) => { 
  try { 
      const authorizationHeader = req.headers.authorization;
     
      if (!authorizationHeader) { 
        return res.status(StatusCodes.UNAUTHORIZED).json({ 
          status: StatusCodes.UNAUTHORIZED, 
          message: 'Unauthorized',
        }); 
      } 
    
      const token = authorizationHeader.replace('Bearer ', ''); 

      const blacklistedToken = await getTokenByPayload({ payload: token });
      if(blacklistedToken && blacklistedToken.expired === "yes" ) {
        return {
          status: StatusCodes.UNAUTHORIZED,
          message: 'Unauthorized',
          error: 'Token has expired',
        };
      }

      jwt.verify(token, configs.tokenSecret, (err) => { 
        if (err) { 
          return res.status(StatusCodes.UNAUTHORIZED).json({ 
              status: StatusCodes.UNAUTHORIZED, 
              message: 'Invalid token' 
            }); 
          } 
          req.token= token;
          next(); 
      }); 
    } catch (err) { 
      console.error('Error verifying JWT:', err); 
      res.status(StatusCodes.UNAUTHORIZED).json({ 
        status: StatusCodes.UNAUTHORIZED, 
        message: 'Unauthorized' 
      }); 
    }
}

export default verifyJWT;