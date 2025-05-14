"use client";

import React from "react";
import Styles from "../sass/Search.module.scss";
import { Search } from "lucide-react";
import { useClickAway, useDebounce } from "react-use";
import Image from "next/image";
import { Api } from "../../services/api-client";
import Link from "next/link";

interface PropsSearch {
  id: number;
  name: string;
  imageUrl: string;
  items: {
    price: number[];
  }[];
}

export const SearchBar = () => {
  const [search, setSearch] = React.useState<boolean>(false);
  const [SearchQuery, setSearchQuery] = React.useState<string>("");
  const [product, setProduct] = React.useState<PropsSearch[]>([]);
  const ref = React.useRef(null);

  const onClickItem = () => {
    setSearchQuery("");
    setSearch(false);
    setProduct([]);
  };
  useClickAway(ref, () => {
    setSearch(false);
  });
  useDebounce(
    () => {
      Api.products.Search(SearchQuery).then((res) => {
        const formattedData = res.map((item: any) => ({
          ...item,
          items: item.items || [],
        }));
        setProduct(formattedData);
      });
    },
    100,
    [SearchQuery]
  );
  return (
    <>
      {search && <div className={Styles.containerSearch}></div>}
      <div ref={ref} className={Styles.container}>
        <Search size={20} />
        <input
          type="text"
          placeholder="Search..."
          onFocus={() => setSearch(true)}
          value={SearchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {product.length > 0 && (
          <div
            style={
              search ? { visibility: "visible" } : { visibility: "hidden" }
            }
            className={Styles.container__content}
          >
            <div className={Styles.CardsBlock}>
              <div className={Styles.CardsBlock__Named}>
                {product.map((item, index) => (
                  <div
                    onClick={() => onClickItem()}
                    key={index}
                    className={Styles.CardsBlock__Named__content}
                  >
                    <Search size={20} />
                    <Link href={`/Product/${item.id}`}>
                      <p>{item.name}</p>
                    </Link>
                  </div>
                ))}
              </div>

              <div className={Styles.CardsBlock__BLockInfo}>
                {product.map((item, index) => (
                  <Link key={index} href={`/Product/${item.id}`}>
                    {" "}
                    <div className={Styles.CardsBlock__BLockInfo__info}>
                      {" "}
                      <Image
                        src={item.imageUrl}
                        alt=""
                        width={100}
                        height={100}
                      />{" "}
                      <div className={Styles.Text}>
                        {" "}
                        <h1>{item.name}</h1>
                        <p>{item?.items?.[0]?.price?.[0]} $</p>
                      </div>
                    </div>{" "}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
