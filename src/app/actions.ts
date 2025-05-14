"use server";

import { CheckoutFormValues } from "@/components/auth-models/form-components/schemas/index";
import { prisma } from "../../prisma/prisma-client";
import { OrderStatus, Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { CreatePayPalPayment } from "../../lib/create-paymant";
import { GetUserSession } from "../../lib/get-user-sessiaon";
import { hashSync } from "bcrypt";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookie = cookies();
    const cartToken = (await cookie).get("token")?.value;

    if (!cartToken) {
      return;
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        CartItem: {
          include: {
            variations: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });
    if (!userCart) {
      throw new Error("Cart not found");
    }
    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is epmty");
    }

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.CartItem),
        totalAmount: userCart.totalAmount,
        fullname: data.FirstName + " " + data.SecondName,
        email: data.Mail,
        phone: data.Phone,
      },
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });
    const response = await CreatePayPalPayment(order.totalAmount);

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserInput(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await GetUserSession();

    if (!currentUser) {
      throw new Error("user not found");
    }

    const fintUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    const updatedUser = await prisma.user.update({
      where: { id: Number(currentUser.id) },
      data: {
        fullname: body.fullname,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : fintUser?.password,
      },
    });
    console.log("Updated user:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.log("error");
    throw error;
  }
}

export async function RegisterUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      console.log("no user");
    }

    if (user) {
      if (!user.verified) {
        throw new Error("Post not registrated");
      }
      throw new Error("User registrated");
    }

    const createUser = await prisma.user.create({
      data: {
        fullname: body.fullname,
        password: hashSync(body.password, 10),
        email: body.email,
        verified: new Date(),
      },
    });

    return createUser;
  } catch (error) {
    throw error;
  }
}
