const { z } = require('zod');
const { parsePhoneNumberFromString } = require('libphonenumber-js');

const login = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character' }),
});

const register = z.object({
  email: z.email(),
  username: z.string().min(6),
  phoneNumber: z.string().refine(
    (value) => {
      const phone = parsePhoneNumberFromString(value, 'AZ');
      return phone && phone.isValid();
    },
    {
      message: 'Invalid phone number',
    },
  ),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character' }),
});

const authValidation = {
  login,
  register,
};

module.exports = authValidation;
