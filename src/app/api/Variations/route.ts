import { NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';

export async function GET() {
  const Variations = await prisma.variations.findMany({
    include: {
      recommendation: true,
    },
  });
  return NextResponse.json(Variations);
}
