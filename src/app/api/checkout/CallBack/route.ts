import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../prisma/prisma-client';

export async function POST(req: NextRequest) {
  try {
    const event = await req.json();

    if (event.event_type === 'PAYMENT.SALE.COMPLETED') {
      const saleId = event.resource.id;
      const parentPayment = event.resource.parent_payment;
      const amount = event.resource.amount.total;

      // Логика обновления заказа в базе данных
      await prisma.order.update({
        where: { id: Number(parentPayment) },
        data: {
          status: 'SUCCEEDED',
          paymentId: saleId,
          totalAmount: amount,
        },
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ message: 'Event type not handled' }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
