const Joi = require('joi');

exports.signupSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(60)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name must not exceed 60 characters',
    }),
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ['com', 'net'] },
    })
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be valid (e.g., user@example.com)',
      'any.required': 'Email is required',
    }),
  phone: Joi.string()
    .min(10)
    .max(15)
    .required()
    .messages({
      'string.empty': 'Phone number is required',
      'string.min': 'Phone number must be at least 10 digits',
      'string.max': 'Phone number must not exceed 15 digits',
    }),
  password: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'))
    .messages({
      'string.empty': 'Password is required',
      'string.pattern.base': 'Password must contain: uppercase letter, lowercase letter, number, and be at least 8 characters (e.g., "Password123")',
    }),
}).unknown(false); // Don't allow unknown fields

exports.signinSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ['com', 'net'] },
    })
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be valid (e.g., user@example.com)',
    }),
  password: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'))
    .messages({
      'string.empty': 'Password is required',
      'string.pattern.base': 'Password must contain: uppercase letter, lowercase letter, number, and be at least 8 characters (e.g., "Password123")',
    }),
}).unknown(false);

exports.acceptCodeSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ['com', 'net'] },
    })
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be valid',
    }),
  providedCode: Joi.number()
    .required()
    .messages({
      'any.required': 'Verification code is required',
      'number.base': 'Verification code must be a number',
    }),
}).unknown(false);

exports.changePasswordSchema = Joi.object({
  oldPassword: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'))
    .messages({
      'string.empty': 'Old password is required',
      'string.pattern.base': 'Password must contain: uppercase letter, lowercase letter, number, and be at least 8 characters',
    }),
  newPassword: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'))
    .messages({
      'string.empty': 'New password is required',
      'string.pattern.base': 'Password must contain: uppercase letter, lowercase letter, number, and be at least 8 characters',
    }),
}).unknown(false);

exports.acceptFPCodeSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ['com', 'net'] },
    })
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be valid',
    }),
  providedCode: Joi.number()
    .required()
    .messages({
      'any.required': 'Verification code is required',
    }),
  newPassword: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'))
    .messages({
      'string.empty': 'New password is required',
      'string.pattern.base': 'Password must contain: uppercase letter, lowercase letter, number, and be at least 8 characters',
    }),
}).unknown(false);

exports.createPostSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(60)
    .required()
    .messages({
      'string.empty': 'Title is required',
      'string.min': 'Title must be at least 3 characters',
    }),
  description: Joi.string()
    .min(3)
    .max(600)
    .required()
    .messages({
      'string.empty': 'Description is required',
      'string.min': 'Description must be at least 3 characters',
    }),
  userId: Joi.string()
    .required()
    .messages({
      'any.required': 'User ID is required',
    }),
}).unknown(false);