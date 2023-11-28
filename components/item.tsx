"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export interface VirtualItemItemProps {
  item: any;
}

type ObjectFit = "fill" | "contain" | "cover" | "none" | "scale-down";
export interface ItemImageProps {
  url?: string | null;
  alt?: string | null;
  objectFit?: ObjectFit;
  ratio?: string;
  grayscale?: boolean;
}

function ItemImage({ props }: { props?: ItemImageProps }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div>
      <div
        className={cn(
          "w-full overflow-hidden rounded-sm bg-slate-100 shadow-sm",
          props?.ratio ?? "aspect-w-1 aspect-h-1"
        )}
      >
        <Image
          alt={props?.alt ?? ""}
          src={props?.url ?? ""}
          className={cn(
            "group-hover:opacity-75 duration-400 ease-in-out transition-all hover:scale-105",
            isLoading ? "blur-2xl scale-110" : "blur-0 scale-100",
            props?.grayscale ? "grayscale" : ""
          )}
          onLoad={() => setLoading(false)}
          fill
          sizes="100vw"
          style={{
            objectFit: props?.objectFit ?? "cover",
          }}
        />
      </div>
    </div>
  );
}

export default function Item(props: VirtualItemItemProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const fetchPurchaseItemLink = async ({ sku }: { sku: string }) => {
    let url = `/api/purchase/${sku}`;
    const resp = await fetch(url, { cache: "no-store" });
    return resp.json();
  };

  const onBuyClickHandler = async (sku: string) => {
    if (loading) return;
    setLoading(true);
    const data = await fetchPurchaseItemLink({ sku });
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col justify-start items-start">
      <div className="group w-full">
        <div
          className="w-full cursor-pointer"
          onClick={() => {
            onBuyClickHandler(props.item.sku);
          }}
        >
          <ItemImage
            props={{
              url: props.item.image_url,
              ratio: "aspect-w-1 aspect-h-1",
            }}
          />
        </div>
      </div>
      <div className="space-y-1 mt-4 text-sm w-full">
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <h3 className="w-full font-medium leading-none group line-clamp-2">
            {props.item.name}
          </h3>
          <div>
            <p className="text-xs font-light leading-tight tracking-tighter lg:leading-[1.1] line-clamp-1">
              {props.item.description}&nbsp;
            </p>
          </div>
        </div>
        <div className="w-full mb-2 pb-2 pt-2">
          {props?.item.price && (
            <Button
              onClick={() => {
                onBuyClickHandler(props.item.sku);
              }}
              className="w-full"
            >
              {loading ? (
                <Loader2 className={cn("h-6 w-6 animate-spin shadow-none")} />
              ) : (
                `${props?.item.price?.amount} ${props?.item.price?.currency}`
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
