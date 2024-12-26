import { prisma } from '../prisma/prisma-client';

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  items?: string;
}

export const FindProduct = async (params: GetSearchParams) => {
  const itemsIdArr = params?.items?.split(',').map(Number);

  const categories = await prisma.category.findMany({
    include: {
      product: {
        orderBy: {
          id: 'desc',
        },
        where: {
          filters: itemsIdArr
            ? {
                some: {
                  filterId: {
                    in: itemsIdArr,
                  },
                },
              }
            : undefined,
        },
        include: {
          filters: true,
          items: true,
        },
      },
    },
  });

  return categories;
};
