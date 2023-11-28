import { XsollaAuthOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { RedirectType, redirect } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
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

  const transactions = await prisma.transaction.findMany({
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
              <TableHead className="w-[100px]">Transaction</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Payment Method Name</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Currency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.transaction_id}>
                <TableCell className="font-medium">
                  {transaction.transaction_id}
                </TableCell>
                <TableCell>{transaction.payment_method}</TableCell>
                <TableCell>{transaction.payment_method_name}</TableCell>
                <TableCell className="text-right">
                  {transaction.amount}
                </TableCell>
                <TableCell className="text-right">
                  {transaction.currency}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
