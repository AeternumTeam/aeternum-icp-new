import { StatusCodes } from 'http-status-codes';

import authServices from '../services/authServices.js';
import { updateTokenExpiration } from '../models/TokenModel.js';
import { getUserLocaleDate } from '../utils/date.js';

export const getLoginGoogleUrl = (_, res) => {
  try {
    const result = authServices.getAuthUrl();
    const { authUrl } = result;

    if(result.error) {
      return res.status(result.status).json({
        status: result.status,
        message: result.message,
        error: result.error
      })
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Successfully generated auth URL',
      data: { 
        url: authUrl
      }
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

export const getToken = async (req, res) => {
  try {
    const result = await authServices.getAuthToken(req.query);
    const { token, user } = result;

    if(result.error) {
      return res.status(result.status).json({
        status: result.status,
        message: result.message,
        error: result.error
      })
    }

    return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: "Login successfully",
        data : {
          token, 
          user: {
            id: user.id, 
            name: user.name,
            username: user.username, 
            email: user.email, 
            picture: user.picture
          }
        }
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR, 
        message: 'Internal Server Error',
        error: error.message
    });
  }
};

export const isLoggedIn = async (req, res) => {
  const token = req.headers.authorization.replace('Bearer ', '');
  try {
    const result = await authServices.isUserLoggedIn({ token });
    const { newToken, loggedIn, user } = result;

    if(result.error) {
      return res.status(result.status).json({
        status: result.status,
        loggedIn: result.loggedIn,
        message: result.message,
        error: result.error
      })
    }

    return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        loggedIn,
        data : {
          token: newToken,
          user
        }
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        loggedIn: false,
        message: 'Internal Server Error',
        error: error.message
    });
  }
}

export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');

    await authServices.userLogout({ token });

    return res.status(StatusCodes.OK).json({ 
        status: StatusCodes.OK,
        message: 'Successfully logged out',
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
        error: error.message
    });
  }
};

export const login = async (_, res) => {
  res.status(StatusCodes.NOT_IMPLEMENTED).json({
    message: 'Login not implemented'
  });
};

export const register = async (_, res) => {
  res.status(StatusCodes.NOT_IMPLEMENTED).json({
    message: 'Registration not implemented'
  });
};