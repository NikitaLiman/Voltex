import type { Metadata } from 'next';
import { Header } from '@/components/shared/header';
import Styles from '../page.module.scss';
import { Container } from '@/components/shared';

export const metadata: Metadata = {
  title: 'Shop | Check-out',
  description: 'Generated by create next app',
};

export default function RootLayoutCart({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={Styles.checkout}>
      <Container>
        <Header hasSearch={false} hasCart={false} hasImage={false} />
        {children}
      </Container>
    </main>
  );
}
