'use client';
import React from 'react';
import Styles from '../../sass/Header.module.scss';
import Image from 'next/image';
import Vercel from '../../img/Logo.png';
import { Container } from './container';
import { SearchBar } from './SearchBar';
import { CartButton } from '../ui/cart-button';
import Link from 'next/link';
import { ProfileButton } from '../ui/profile-button';
import { AuthModel } from './auth-models/auth-models';

interface PropsHeader {
  hasSearch?: boolean;
  hasCart?: boolean;
  hasImage?: boolean;
}

export const Header: React.FC<PropsHeader> = ({
  hasSearch = true,
  hasCart = true,
  hasImage = true,
}) => {
  const [openPop, setOpenPop] = React.useState<boolean>(false);
  return (
    <header className={Styles.container}>
      <Container className={Styles.cont}>
        {/* Left part */}

        <div
          style={{
            backgroundImage: hasImage
              ? 'url("https://content1.rozetka.com.ua/files/images/original/496831108.png")'
              : '',
            backgroundColor: hasImage ? '' : 'black',
            maxWidth: hasImage ? '' : '100%',
          }}
          className={Styles.cont__LogoBlock}>
          <Link href="/">
            <Image src={Vercel} alt="" width={35} height={35} />
          </Link>
          <div className={Styles.cont__LogoBlock__Text}>
            <h1>Voltex</h1>
            <p>Hight Technology</p>
          </div>
        </div>

        {hasSearch && (
          <div className={Styles.Search}>
            <SearchBar />
          </div>
        )}
        {/* Right part */}
        <div className={Styles.ButtonBox}>
          {openPop && <AuthModel onClose={() => setOpenPop(!openPop)} />}
          <ProfileButton
            onClickSignin={() => {
              setOpenPop(true);
            }}
          />

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
