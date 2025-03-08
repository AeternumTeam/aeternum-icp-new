import { StatusCodes } from "http-status-codes";

import blockchainServices from "../services/blockchainService.js";
import blockchainSchema from "../validations/blockchainSchema.js";
import transporter from "../config/mail.js";
import configs from "../config/config.js";

export const getCredentials = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = blockchainSchema.getBlock.validate({ id }, { abortEarly: false });
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

    const result = await blockchainServices.getBlocks({ id });
    const { blocks } = result;

    if(result.error){
      res.status(result.status).json({
        status: result.status,
        message: result.message,
        error: result.error
      })
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Successfully get the data',
      data: blocks
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Failed to get data',
      error: error.message
    });
  }
}

export const issuerCredential = async (req, res) => {
  try {
    const { email, recipient, id_issuer, issuer, email_issuer } = req.body;
    const certificateName = req.fileName;

    const { error } = blockchainSchema.addBlock.validate({ email, recipient, id_issuer, issuer, email_issuer }, { abortEarly: false });
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

    const result = await blockchainServices.addBlock({ recipient, id_issuer, issuer, certificateName });
    const { hash } = result;
    
    await sendEmail(email, recipient, issuer, email_issuer, hash);

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Certificate issued successfully',
      certificate: hash
    });

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      error: error.message
    });
  }
}

const options = (email, recipient, issuer, email_issuer, hash) => {
  return {
    from: email_issuer,
    to: email,
    subject: 'Congratulations! Your Certificate Has Been Issued',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <div style="text-align: center; padding: 20px; background-color: #f4f4f4;">
          <h2 style="color: #4CAF50;">Certificate Issued!</h2>
          <p style="font-size: 16px; color: #666;">Congratulations on your accomplishment!</p>
        </div>
        <div style="padding: 20px; background-color: #ffffff; border: 1px solid #dddddd;">
          <p style="font-size: 16px;">Hello <strong>${recipient}</strong>,</p>
          <p>
            We are delighted to inform you that your blockchain-based certificate has been successfully issued. 
            This certificate ensures a high level of security and authenticity.
          </p>
          <h3 style="color: #4CAF50;">Certificate Details</h3>
          <ul style="list-style-type: none; padding: 0; font-size: 15px; line-height: 1.6;">
            <li><strong>Name:</strong> ${recipient}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Credential:</strong> ${hash}</li>
            <li><strong>Date Issued:</strong> ${new Date().toISOString()}</li>
          </ul>
          <p>
            You can access your certificate using the link below:
          </p>
          <p style="text-align: center;">
            <a href="${configs.url}" style="color: #ffffff; background-color: #4CAF50; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
              View Certificate
            </a>
          </p>
          <p style="font-size: 15px;">
            If you have any questions or need further information, please feel free to contact us.
          </p>
          <p style="font-size: 16px;">Warm regards,</p>
          <p style="font-size: 16px;">
            <strong>${issuer}</strong><br>
            [Perusahaan Pengirim]
          </p>
        </div>
        <div style="text-align: center; padding: 20px; font-size: 12px; color: #777;">
          <p>Please do not reply to this email. For assistance, contact our support team.</p>
        </div>
      </div>
    `
  }
};

const sendEmail = async (email, recipient, issuer, email_issuer, hash) => {
  transporter.sendMail(options(email, recipient, issuer, email_issuer, hash), function(error, info){
    if (error) {
      console.log(error) ;
    } else {
      return true;
    }
  });
}
