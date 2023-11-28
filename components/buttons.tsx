"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <Link href="/auth">
      <Button variant={"secondary"} size={"sm"}>
        Sign In
      </Button>
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <Button variant={"secondary"} size={"sm"} onClick={() => signOut()}>
      Sign Out
    </Button>
  );
};
