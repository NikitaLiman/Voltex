import { hashSync } from 'bcrypt';
import { prisma } from './prisma-client';
import {
  categories,
  Characteristics,
  Earphones,
  filtersSeed,
  keyboards,
  Laptop,
  Mouses,
  Peripherals,
  Phone,
  product,
  productFilters,
  Reccomendation,
  TVs,
  variations,
} from './costans';
import { create } from 'domain';

const RandomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

async function Up() {
  await prisma.user.createMany({
    data: [
      {
        fullname: 'test user',
        email: 'userTEst@gmail.com',
        password: hashSync('11111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullname: 'AdminUser',
        email: 'AdminUser@gmail.com',
        password: hashSync('11111', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ],
  });
  await prisma.filter.createMany({
    data: filtersSeed,
  });
  await prisma.category.createMany({
    data: categories,
  });
  await prisma.product.createMany({
    data: product,
  });
  await prisma.variations.createMany({
    data: variations,
  });
  await prisma.recommendation.createMany({
    data: Reccomendation,
  });
  await prisma.characteristics.createMany({
    data: Characteristics,
  });
  await prisma.phone.createMany({
    data: Phone,
  });
  await prisma.laptop.createMany({
    data: Laptop,
  });
  await prisma.tvMonitor.createMany({
    data: TVs,
  });
  await prisma.peripherals.createMany({
    data: Peripherals,
  });

  await prisma.earphones.createMany({
    data: Earphones,
  });
  await prisma.keyBoards.createMany({
    data: keyboards,
  });
  await prisma.mouses.createMany({
    data: Mouses,
  });
  await prisma.productFilter.createMany({
    data: productFilters,
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: '1212',
      },
      {
        userId: 2,
        totalAmount: 0,
        token: '121212',
      },
    ],
  });
  await prisma.cartItem.create({
    data: {
      cartId: 1,
      variationsItemId: 1,
      quanity: 1,
    },
  });
}

async function Down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Variations" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Characteristics" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Phone" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Laptop" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "TvMonitor" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Recommendation" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Filter" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Peripherals" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Earphones" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "KeyBoards" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Mouses" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductFilter" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await Down();
    await Up();
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
