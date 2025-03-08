import Joi from 'joi';
import path from 'path';

const validateFileExtension = (value, helpers) => {
  const allowedExtensions = ['.png', '.pdf', '.svg', '.json'];
  const ext = path.extname(value).toLowerCase();
  
  if (!allowedExtensions.includes(ext)) {
    return helpers.error('file.invalidExtension');
  }
  return value;
};

const blockchainSchema = {
    getBlock : Joi.object({
        id: Joi.string()
        .guid({ version: ['uuidv4'] }) 
        .required() 
        .messages({ 
          'string.guid': 'Invalid ID format', 
          'any.required': 'ID is required' 
        })
    }),

    verifyBlock: Joi.object({
        credential: Joi.string()
        .pattern(/^0x[a-fA-F0-9]{64}$/)
        .trim()
        .required() 
        .messages({ 
          'string.pattern.base': 'Invalid credential', 
          'any.required': 'Credential hash is required'
        })
    }),
    
    addBlock : Joi.object({
        email: Joi.string()
          .email({ minDomainSegments: 2 })
          .lowercase()
          .required()
          .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
          .max(254)
          .messages({
            'string.email': 'Please provide a valid email address',
            'string.pattern.base': 'Email contains invalid characters',
            'string.max': 'Email address is too long'
          }),
          
        email_issuer: Joi.string()
          .email({ minDomainSegments: 2 })
          .lowercase()
          .required()
          .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
          .max(254)
          .messages({
            'string.email': 'Please provide a valid email address',
            'string.pattern.base': 'Email contains invalid characters',
            'string.max': 'Email address is too long'
          }),
        
        recipient: Joi.string()
          .min(3)
          .max(50)
          .required()
          .messages({
            'string.min': 'Recipient name must be at least 3 characters long',
            'string.max': 'Recipient name cannot exceed 50 characters'
          }),

        id_issuer: Joi.string()
          .guid({ version: ['uuidv4'] }) 
          .required() 
          .messages({ 
            'string.guid': 'Invalid ID format', 
            'any.required': 'ID is required' 
          }),

        issuer: Joi.string()
          .min(3)
          .max(50)
          .required()
          .messages({
            'string.min': 'Recipient name must be at least 3 characters long',
            'string.max': 'Recipient name cannot exceed 50 characters'
          })
    })
}

export default blockchainSchema;