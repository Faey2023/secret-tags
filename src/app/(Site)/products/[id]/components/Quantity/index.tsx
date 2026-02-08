"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const Quantity = ({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}) => {
  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <div className="flex items-center gap-4">
      <span className="font-medium">Quantity:</span>
      <div className="flex items-center border border-border rounded-lg">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleQuantityChange(-1)}
          disabled={quantity <= 1}
        >
          <Minus className="w-4 h-4" />
        </Button>
        <span className="px-4 py-2 font-medium">{quantity}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleQuantityChange(1)}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Quantity;
