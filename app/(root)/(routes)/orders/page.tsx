import { XsollaAuthOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { RedirectType, redirect } from "next/navigation";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navbar";

export default async function OrdersPage() {
  const session = await getServerSession(XsollaAuthOptions);

  if (!session?.user) {
    redirect("/", RedirectType.replace);
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="w-full min-h-screen flex flex-col items-start justify-start">
      <Navbar />
      <div className="md:container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Invoice</TableHead>
              <TableHead>Sku</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Currency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.order_id ?? "—"}>
                <TableCell className="font-medium">{order.order_id}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.invoice_id}</TableCell>
                <TableCell>{order.sku}</TableCell>
                <TableCell>{order.mode}</TableCell>
                <TableCell className="text-right">{order.amount}</TableCell>
                <TableCell className="text-right">{order.currency}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
