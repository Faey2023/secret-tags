"use client";

import { Button } from "@/components/ui/button";
import { Heart, Share2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import Quantity from "../Quantity";
import { useSearchParams } from "next/navigation";

type SizeStock = {
  id: string;
  stock: number;
};

type ProductVariant = {
  id: string;
  sizeStocks: SizeStock[];
};

type AddToCartProps = {
  productVariants: ProductVariant[];
};

const AddToCart = ({ productVariants }: AddToCartProps) => {
  const searchParams = useSearchParams();
  const variantId = searchParams.get("variantId");
  const sizeId = searchParams.get("sizeId");

  const [quantity, setQuantity] = useState(1);

  // Preprocess stock lookup
  const stockRecord: Record<string, number> = {};

  for (const variant of productVariants) {
    for (const sizeStock of variant.sizeStocks) {
      stockRecord[`${variant.id}-${sizeStock.id}`] = sizeStock.stock;
    }
  }

  const stock = variantId && sizeId ? stockRecord[`${variantId}-${sizeId}`] : 0;

  return (
    <div className="space-y-4 mt-4">
      <Quantity quantity={quantity} setQuantity={setQuantity} />

      <div className="flex gap-3">
        <Button
          className="flex-1 btn-hero"
          disabled={quantity > stock || !stock}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {stock ? "Add to Cart" : "Out of Stock"}
        </Button>

        <Button variant="outline" size="icon">
          <Heart className="w-4 h-4" />
        </Button>

        <Button variant="outline" size="icon">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      {stock > 0 && (
        <p className="text-green-600 text-sm font-medium">
          ✓ {stock} in stock and ready to ship
        </p>
      )}
    </div>
  );
};

export default AddToCart;
