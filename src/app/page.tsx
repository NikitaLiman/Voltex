import { Container, Header } from '@/components/shared';
import styles from './page.module.scss';
import { TopBar } from '@/components/shared/top-bar';
import { Filter } from '@/components/shared/Filter';

import { Catalog } from '@/components/shared/Catalog';
import { FindProduct, GetSearchParams } from '../../lib/find-product';

interface PageProps {
  searchParams: Promise<GetSearchParams>; // Тип searchParams изменен на Promise<GetSearchParams>
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams; // Разрешение промиса
  const categories = await FindProduct(params);

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
