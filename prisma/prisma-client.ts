import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

// const allProducts = [
//   { productId: 1, filters: [2, 3, 4, 6, 7, 8, 9, 10] },

//   { productId: 2, filters: [2, 3, 4, 6, 7, 8, 9, 10] },

//   { productId: 3, filters: [2, 3, 4, 5, 7, 11, 12, 10] },

//   { productId: 4, filters: [3, 4, 5, 7, 11, 12, 10] },

//   { productId: 5, filters: [2, 3, 4, 12, 13, 14] },

//   { productId: 6, filters: [2, 3, 4, 12, 13, 14] },

//   { productId: 7, filters: [2, 3, 6] },

//   { productId: 8, filters: [2, 3, 6] },

//   { productId: 9, filters: [2, 3, 4, 10, 7, 12, 6] },

//   { productId: 10, filters: [3, 4, 10, 7, 12, 6] },

//   { productId: 11, filters: [2, 3, 6, 12] },

//   { productId: 12, filters: [2, 3, 4, 6, 12, 9] },
// ];

const allProducts = [
  { productId: 1, filters: [1, 12, 13, 14, 16, 17, 18, 19, 20, 26] },

  { productId: 2, filters: [1, 12, 13, 14, 16, 17, 18, 19, 20, 27] },

  { productId: 3, filters: [1, 12, 13, 14, 15, 16, 21, 20, 22, 26] },

  { productId: 4, filters: [1, 13, 14, 15, 16, 21, 20, 22, 27] },

  { productId: 5, filters: [2, 13, 14, 22, 23, 24, 26] },

  { productId: 6, filters: [2, 13, 14, 22, 23, 24, 27] },

  { productId: 7, filters: [2, 13, 14, 15, 22, 23, 24, 27] },

  { productId: 8, filters: [3, 12, 13, 16, 26] },

  { productId: 9, filters: [3, 12, 13, 16, 26] },

  { productId: 10, filters: [3, 12, 13, 14, 15, 16, 22, 17, 20, 27] },

  { productId: 11, filters: [4, 12, 13, 16, 22, 27] },

  { productId: 12, filters: [4, 12, 13, 14, 16, 19, 22, 27] },

  { productId: 13, filters: [4, 12, 13, 16, 19, 18, 27] },
];
