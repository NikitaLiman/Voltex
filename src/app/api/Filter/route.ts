import { NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';

export async function GET() {
  const filters = await prisma.filter.findMany({
    include: {
      products: true,
    },
  });
  return NextResponse.json(filters);
}
