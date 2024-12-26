import { Container, Header } from '@/components/shared';
import styles from './page.module.scss';
import { TopBar } from '@/components/shared/top-bar';
import { Filter } from '@/components/shared/Filter';
import { ProductGroupList } from '@/components/shared/ProductGroupList';

import { prisma } from '../../prisma/prisma-client';
import { Catalog } from '@/components/shared/Catalog';
import { FindProduct, GetSearchParams } from '../../lib/find-product';

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const categories = await FindProduct(searchParams);
  console.log(categories, '12');
  return (
    <div className={styles.container}>
      <Header />
      <Container className={styles.container__content}>
        <h1>Catalog</h1>
      </Container>{' '}
      <TopBar />
      <Container className={styles.MainPart}>
        <div className={styles.filters}>
          <Filter />
        </div>
        <Catalog categories={categories} />
      </Container>
    </div>
  );
}
