import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from 'crypto';
import { prisma } from "@/lib/prisma";

const verifySignature = (data: any, authorizationHeader: string | null) => {
  if (!authorizationHeader || !authorizationHeader.startsWith('Signature ')) {
    return false;
  }

  const requestSignature = authorizationHeader.replace('Signature ', '');
  const concatenatedString = JSON.stringify(data) + process.env.XSOLLA_WEBHOOK_SECRET_KEY;
  const computedSignature = crypto
    .createHash('sha1')
    .update(concatenatedString)
    .digest('hex');

  return computedSignature === requestSignature;
};

const isUserValid = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email
    }
  });
  return user ? true : false;
};

const handleUserValidation = async (data: any) => {
  if (data.notification_type === "user_validation" && data.user) {
    const valid = await isUserValid(data.user.email);
    if (valid) {
      return new Response(null, { status: 204 });
    }
  }
};

const handlePayment = async (data: any) => {
  if (data.notification_type === "payment" && data.transaction) {

    const user = await prisma.user.findFirstOrThrow({
      where: {
        email: data.user.email
      }
    })

    const transaction = await prisma.transaction.create({
      data: {
        transaction_id: data.transaction.id,
        payment_method_order_id: data.transaction.payment_method_order_id,
        dry_run: data.transaction.dry_run,
        agreement: data.transaction.agreement,
        payment_date: data.transaction.payment_date,
        payment_method: data.transaction.payment_method,
        payment_method_name: data.transaction.payment_method_name,
        amount: data.purchase.total.amount,
        currency: data.purchase.total.currency,
        userId: user.id
      }
    })

    return new Response(null, { status: 204 });
  }
};

const handleOrderPaid = async (data: any) => {
  if (data.notification_type === "order_paid" && data.order) {
    const order = await prisma.order.update({
      where: {
        order_id: data.order.id
      },
      data: {
        status: data.order.status,
        mode: data.order.mode,
        invoice_id: data.order.invoice_id
      }
    })
    return new Response(null, { status: 200 });
  }
};

const handleOrderCanceled = async (data: any) => {
  if (data.notification_type === "order_canceled" && data.order) {
    console.log(data)
    const order = await prisma.order.update({
      where: {
        order_id: data.order.id
      },
      data: {
        status: data.order.status,
        mode: data.order.mode,
        invoice_id: data.order.invoice_id
      }
    })
    return new Response(null, { status: 200 });
  }
};

const handler = async (request: Request) => {
  try {
    const data = await request.json();
    const authorizationHeader: string | null = headers().get("Authorization");
    if (!verifySignature(data, authorizationHeader)) {
      return new Response(
        JSON.stringify({ error: 'Signature missing or invalid' }),
        { status: 401 }
      );
    }

    const response = 
      await handleUserValidation(data) ||
      await handlePayment(data) ||
      await handleOrderPaid(data) ||
      await handleOrderCanceled(data);

    return response || NextResponse.json(
      { error: "An error occurred." },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred." },
      { status: 400 }
    );
  }
};

export { handler as POST }