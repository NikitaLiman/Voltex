import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") || "";

  const Product = await prisma.product.findMany({
    include: {
      items: true,
    },
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 3,
  });

  return NextResponse.json(Product);
}
