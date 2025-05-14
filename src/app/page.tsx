import { Container, Header } from "../components";
import styles from "./page.module.scss";
import { TopBar } from "../components/top-bar";
import { Filter } from "../components/Filter";

import { Catalog } from "../components/Catalog";
import { FindProduct, GetSearchParams } from "../../lib/find-product";

interface PageProps {
  searchParams: Promise<GetSearchParams>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const categories = await FindProduct(params);

  return (
    <div className={styles.container}>
      <Header />
      <Container className={styles.container__content}>
        <h1>Catalog</h1>
      </Container>{" "}
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
