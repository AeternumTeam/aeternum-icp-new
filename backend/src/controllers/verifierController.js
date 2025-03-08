import { StatusCodes } from "http-status-codes";
import blockchainServices from "../services/blockchainService.js";
import blockchainSchema from "../validations/blockchainSchema.js";

export const verifyCertificate = async (req, res) => {
    try {
      const { credential } = req.body;

      const { error } = blockchainSchema.verifyBlock.validate({ credential }, { abortEarly: false });
      if (error) {
        const errors = {};
        error.details.forEach(detail => {
          errors[detail.context.key] = detail.message;
        });

        return res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: 'Bad Request',
          error: errors
        });
      }

      const result = await blockchainServices.verifyBlockchain({ credential });
      const { certificate } = result;

      if(result.error) {
        return res.status(result.status).json({
          status: result.status,
          message: result.message,
          error: result.error
        });
      }

      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: "Successfully verification your certificate",
        data: certificate
      });

    } catch (error) {
      console.error('Error verifying certificate:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
        error: error.message 
      });
    }
  }