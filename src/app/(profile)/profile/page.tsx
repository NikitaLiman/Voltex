import { redirect } from 'next/navigation';
import React from 'react';
import { GetUserSession } from '../../../../lib/get-user-sessiaon';
import { prisma } from '../../../../prisma/prisma-client';
import { ProfilePage } from '@/components/shared/profilePage';

export default async function page() {
  const session = await GetUserSession();

  if (!session) {
    return redirect('/not-auth');
  }

  const user = await prisma.user.findFirst({
    where: {
      id: Number(session?.id),
    },
  });

  if (!user) {
    return redirect('/not-auth');
  }
  return <ProfilePage data={user} />;
}
