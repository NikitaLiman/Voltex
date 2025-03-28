import React from "react";
import { prisma } from "../../../../../prisma/prisma-client";
import { Container } from "@/components/shared";
import Styles from "@/sass/pagePop.module.scss";
import { ColorProps, Sticky } from "@/components/ui/sticky";
import { PageProps } from "../../../../../.next/types/app/(product)/Product/[id]/Characteristics/page";

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      items: {
        include: {
          recommendation: true,
          cartItem: true,
        },
      },
    },
  });

  return (
    <>
      <Container className={Styles.container}>
        {" "}
        <div className={Styles.container__content}>
          <Sticky
            name={product?.name}
            price={product?.items?.[0]?.price}
            describe={product?.items?.[0]?.describe ?? undefined}
            id={id}
            varitaions={product?.items?.[0]?.variation}
            colorArr={product?.items?.[0]?.color as ColorProps[] | undefined}
            recommendation={product?.items?.[0].recommendation}
            cartItem={product?.items?.[0]?.cartItem?.[0]?.variationsItemId ?? 0}
          />
        </div>
      </Container>
    </>
  );
}
