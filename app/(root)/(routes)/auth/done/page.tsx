"use client";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AuthDonePage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const router = useRouter();
  const { token } = searchParams;
  useEffect(() => {
    const auth = async () => {
      const res = await signIn("xsolla-login", {
        redirect: false,
        token: token,
      });
      router.push(res?.url ?? "/");
    };

    auth();
  }, [router, token]);

  return (
    <main className="h-screen bg-slate-200 flex flex-col gap-2 items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin shadow-none" />
    </main>
  );
}
