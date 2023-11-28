"use client";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function AuthPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const XL = require("@xsolla/login-sdk");

    const xl = new XL.Widget({
      projectId: process.env.NEXT_PUBLIC_XSOLLA_LOGIN_PROJECT_ID!,
      preferredLocale: process.env.NEXT_PUBLIC_XSOLLA_PREFFERED_LOCALE!,
      callbackUrl: process.env.NEXT_PUBLIC_XSOLLA_CALLBACK_URI!,
    });

    xl.on(xl.events.Open, function () {
      setLoading(false);
    });

    xl.mount("xl_auth");
  }, []);

  return (
    <main className="h-screen bg-slate-100 flex items-center justify-center">
      {loading && <Loader2 className="h-6 w-6 animate-spin shadow-none" />}
      <div
        id="xl_auth"
        className={`${!loading ? "block" : "hidden"} h-[450px] w-[340px]`}
      ></div>
    </main>
  );
}
