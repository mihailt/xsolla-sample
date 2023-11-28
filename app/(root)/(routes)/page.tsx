import Item from "@/components/item";
import { Navbar } from "@/components/navbar";
import { XsollaAuthOptions } from "@/lib/auth";
import XsollaApi from "@/lib/xsolla";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  const data = await XsollaApi.fetchItems();
  const session = await getServerSession(XsollaAuthOptions);

  return (
    <div className="w-full min-h-screen flex flex-col items-start justify-start">
      <Navbar />
      {session?.user && (
        <div className="md:container">
          <div className="grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 py-4 px-2 md:px-0">
            {data.items.map((item: any) => {
              return (
                <div key={item.sku}>
                  <Item item={item} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
