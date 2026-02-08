'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

type SizeStock = {
  id: string;
  size: string;
  stock: number;
  availability: boolean;
};

type ImageType = {
  secure_url: string;
};

type ProductVariant = {
  id: string;
  color: string;
  images: ImageType[];
  sizeStocks: SizeStock[];
};

type SelectVariantsAndSizeProps = {
  productVariants: ProductVariant[];
};

const SelectVariantsAndSize = ({ productVariants }: SelectVariantsAndSizeProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSizeId = searchParams.get("sizeId");

  const [selectedColor, setSelectedColor] = useState(productVariants[0].color);

  const currentVariant = productVariants.find(v => v.color === selectedColor);

  useEffect(() => {
    if (currentVariant?.sizeStocks?.length) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("variantId", currentVariant.id);
      params.set("sizeId", currentVariant.sizeStocks[0].id);

      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [currentVariant?.id, currentVariant?.sizeStocks,router,searchParams]);

  const handleChangeSizeOnClick = (sizeId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sizeId", sizeId);
    params.delete("page");

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-4">
      {/* Color */}
      <div>
        <p className="text-sm font-medium mb-2">Color Family</p>
        <div className="flex space-x-2">
          {productVariants.map(variant => (
            <Button
              key={variant.id}
              variant={selectedColor === variant.color ? 'default' : 'outline'}
              className="p-1"
              onClick={() => setSelectedColor(variant.color)}
            >
              <div className="relative w-10 h-10">
                {variant.images[0] && (
                  <Image
                    src={variant.images[0].secure_url}
                    alt={variant.color}
                    fill
                    className="object-cover rounded"
                  />
                )}
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Size */}
      {currentVariant && (
        <div>
          <p className="text-sm font-medium mb-2">Size</p>
          <div className="flex space-x-2">
            {currentVariant.sizeStocks.map(size => (
              <Button
                key={size.id}
                variant={currentSizeId === size.id ? 'default' : 'outline'}
                disabled={!size.availability || size.stock === 0}
                onClick={() => handleChangeSizeOnClick(size.id)}
                className="w-12 h-10"
              >
                {size.size}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectVariantsAndSize;
