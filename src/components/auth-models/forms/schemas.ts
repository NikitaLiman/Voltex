import z from 'zod';

export const passwordSchema = z.string().min(4, { message: 'Enter Correct password' });

export const formLoginSchema = z.object({
  email: z.string().email({ message: 'Enter Correct Mail' }),
  password: z.string().min(4, { message: 'Password have to include at least 4 symbols' }),
});

export const registerSchema = formLoginSchema
  .merge(
    z.object({
      fullname: z.string().min(4, { message: 'Enter Firstname & LastName' }),
      confirmPassword: passwordSchema,
    }),
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords are not the same',
    path: ['confirmPassword'],
  });

export type TformLoginValues = z.infer<typeof formLoginSchema>;
export type TformRegisterValues = z.infer<typeof registerSchema>;
