import { Navbar } from "@/components/navbar";
import Image from "next/image";

export default async function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-start justify-start">
      <Navbar />
    </div>
  );
}
