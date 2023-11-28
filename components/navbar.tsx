import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { XsollaAuthOptions } from "@/lib/auth";
import { LoginButton, LogoutButton } from "./buttons";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";

export const Navbar = async () => {
  const session = await getServerSession(XsollaAuthOptions);

  return (
    <header className="supports-backdrop-blur:bg-background/60 md:sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="md:container flex h-14 items-center justify-center px-2">
        <div className="flex">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={"/next.svg"}
              alt={"xsolla"}
              width={40}
              height={40}
              className="object-cover transition-all hover:scale-105"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="pl-2 flex w-full"></div>
          <nav className="flex items-center justify-end space-x-2">
            {session?.user ? (
              <>
                <div className="text-sm">{session?.user?.email}</div>
                <Sheet>
                  <SheetTrigger>
                    <Button className="w-full px-2" variant="link" size="icon">
                      <Menu className="w-6 h-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="flex flex-col">
                    <SheetHeader>
                      <SheetTitle>Xsolla Sample</SheetTitle>
                    </SheetHeader>

                    <div className="flex flex-col justify-start items-start w-full h-full gap-2">
                      <Link href="/">Home</Link>
                      <Link prefetch={false} href="/orders">
                        Orders
                      </Link>
                      <Link prefetch={false} href="/transactions">
                        Transactions
                      </Link>
                      <div className="grow"></div>
                      <LogoutButton />
                    </div>
                  </SheetContent>
                </Sheet>
              </>
            ) : (
              <LoginButton />
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
