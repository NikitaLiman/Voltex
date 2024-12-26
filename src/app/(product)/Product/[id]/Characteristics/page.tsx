import React from 'react';
import { prisma } from '../../../../../../prisma/prisma-client';
import { Container } from '@/components/shared';
import { CharacteristicsInfo } from '@/components/shared/CharacteristicsInfo';

export default async function Charackteristics({ params: { id } }: { params: { id: string } }) {
  const Characteristics = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      items: {
        include: {
          Characteristics: {
            include: {
              phone: true,
              Tvs: true,
              laptops: true,
              Earpohnes: true,
              Keyboard: true,
              Mouse: true,
            },
          },
          product: true,
        },
      },
    },
  });
  console.log(Characteristics, '123');
  const characteristicsData = Characteristics?.items?.[0]?.Characteristics || [];
  const Items = Characteristics?.items || [];
  return (
    <Container>
      <h1 style={{ padding: '10px 0', fontWeight: '500', fontSize: '18px', letterSpacing: '1px' }}>
        {characteristicsData?.[0]?.name}
      </h1>
      <CharacteristicsInfo Items={Items} Characteristics={characteristicsData} />
    </Container>
  );
}
