import { useSession } from 'next-auth/react';
import Styles from '../../sass/Header.module.scss';
import React from 'react';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';

interface Props {
  onClickSignin?: () => void;
}

export const ProfileButton: React.FC<Props> = ({ onClickSignin }) => {
  const { data: session } = useSession();
  return (
    <>
      {!session ? (
        <button onClick={onClickSignin} className={Styles.Profile}>
          <User size={16} />
          Log in
        </button>
      ) : (
        <button className={Styles.Profile}>
          {session?.user?.image ? (
            <img src={session.user.image} alt="" />
          ) : (
            <CircleUser size={20} />
          )}
          <Link href="/profile">Profile</Link>
        </button>
      )}
    </>
  );
};
