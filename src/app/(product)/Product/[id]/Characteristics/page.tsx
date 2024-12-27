import React from 'react';
import { prisma } from '../../../../../../prisma/prisma-client';
import { Container } from '@/components/shared';
import { CharacteristicsInfo } from '@/components/shared/CharacteristicsInfo';
import { PageProps } from '../../../../../../.next/types/app/(product)/Product/[id]/Characteristics/page';

export default async function Page({ params }: PageProps) {
  console.log('params:', params);
  const { id } = await params;
  if (!id) {
    throw new Error('ID is missing from params');
  }
  // Получение данных из базы через Prisma
  const Characteristics = await prisma.product.findFirst({
    where: {
      id: Number(id), // Преобразуем id в число
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

  // Подготовка данных для отображения
  const characteristicsData = Characteristics?.items?.[0]?.Characteristics || [];
  const Items = Characteristics?.items || [];
  console.log(Items, 'aw');
  return (
    <Container>
      <h1 style={{ padding: '10px 0', fontWeight: '500', fontSize: '18px', letterSpacing: '1px' }}>
        {characteristicsData?.[0]?.name}
      </h1>
      <CharacteristicsInfo Items={Items} />
    </Container>
  );
}
