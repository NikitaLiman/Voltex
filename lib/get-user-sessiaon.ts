import { getServerSession } from 'next-auth';
import { authOptions } from './auth-options';

export const GetUserSession = async () => {
  const session = await getServerSession(authOptions);

  return session?.user ?? null;
};
