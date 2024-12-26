import { z } from 'zod';

export const checkoutFormSchema = z.object({
  FirstName: z.string().min(2, { message: 'Not less 2 symbols' }),
  SecondName: z.string().min(2, { message: 'Not less 2 symbols' }),
  Mail: z.string().email({ message: 'Enter correct email' }),
  Phone: z.string().min(10, { message: 'Enter correct phone' }),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
