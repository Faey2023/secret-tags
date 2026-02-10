import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Select from "react-select";
import { PlusIcon } from "lucide-react";
import {
  generateCategoryMeasurements,
  TMeasurementSystem,
} from "@/utils/categoryUtils";
import Image from "next/image";
import { TProductVariant, TSizeStocks } from "@/types/ProductType";
import { TProductVariantFrontend } from "..";

const colorOptions = [
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
];

type ProductVariantsProps = {
  measurementSystem: string;
  productVariants: TProductVariantFrontend[];
  setProductVariants: Dispatch<SetStateAction<TProductVariantFrontend[]>>;
};

const ProductVariants = ({
  measurementSystem,
  productVariants,
  setProductVariants,
}: ProductVariantsProps) => {
  const [imagePreviews, setImagePreviews] = useState<string[][]>([]);

  const availableSizes = generateCategoryMeasurements(
    measurementSystem as TMeasurementSystem,
  );

  const makeEmptySizeStocks = () => {
    const returnSize = availableSizes.map((size) => ({
      size: size.toString(),
      sku: "",
      // price: undefined as unknown as number,
      // stock: undefined as unknown as number,
      price: "", // Empty string for UX
      stock: "", // Empty string for UX
      availability: false,
    }));

    return returnSize;
  };

  const getSizesField = makeEmptySizeStocks();
  // console.log("getSizes:", getSizesField);

  useEffect(() => {
    if (!availableSizes.length) return;

    // initialize only if empty
    if (productVariants.length === 0) {
      const initialVariant: TProductVariantFrontend = {
        color: "",
        images: [],
        sizeStocks: availableSizes.map((size) => ({
          size: size.toString(),
          sku: "",
          price: "", // Empty string for UX
          stock: "", // Empty string for UX
          // price: undefined as unknown as number,
          // stock: undefined as unknown as number,
          availability: false,
        })),
      };

      setProductVariants([initialVariant]);
    }
  }, [availableSizes, productVariants.length, setProductVariants]);

  // console.log("Product variants:", productVariants);

  const [addImages, setAddImages] = useState(false);

  const handleVariantChange = <K extends keyof TProductVariant>(
    variantIndex: number,
    field: K,
    value: TProductVariant[K],
  ) => {
    setProductVariants((prev) =>
      prev.map((v, i) => (i === variantIndex ? { ...v, [field]: value } : v)),
    );
  };

  const handleSizeStockChange = (
    variantIndex: number,
    sizeIndex: number,
    field: keyof TSizeStocks,
    value: TSizeStocks[typeof field],
  ) => {
    setProductVariants((prev) =>
      prev.map((v, vi) => {
        if (vi !== variantIndex) return v;
        const newSizeStocks = v.sizeStocks.map((s, si) =>
          si === sizeIndex ? { ...s, [field]: value } : s,
        );
        return { ...v, sizeStocks: newSizeStocks };
      }),
    );
  };

  const handleAddVariant = () => {
    setProductVariants([
      ...productVariants,
      {
        color: "",
        images: [],
        sizeStocks: getSizesField,
      },
    ]);
  };

  const handleRemoveVariant = (index: number) => {
    const updated = [...productVariants];
    updated.splice(index, 1);
    setProductVariants(updated);
  };

  const handleSetImages = (files: FileList | null, variantIndex: number) => {
    if (!files) return;
    const fileArray = Array.from(files);

    // Update productVariants
    setProductVariants((prev) => {
      const updated = [...prev];
      updated[variantIndex] = { ...updated[variantIndex], images: fileArray };
      return updated;
    });

    // Generate image previews
    setImagePreviews((prev) => {
      const updated = [...prev];
      updated[variantIndex] = fileArray.map((f) => URL.createObjectURL(f));
      return updated;
    });
  };

  // const handleSetImages = (files: FileList | null, variantIndex: number) => {
  //     if (!files) return;
  //     // convert FileList to an array
  //     const fileArray = Array.from(files);

  //     setProductVariants((prev) => {
  //         const updated = [...prev];
  //         updated[variantIndex] = {
  //             ...updated[variantIndex],
  //             images: fileArray, // assign the array of files
  //         };
  //         return updated;
  //     });
  // }

  if (!measurementSystem) {
    return (
      <Card className="p-5">
        <h2 className="font-medium text-md mb-3">Product Variants</h2>
        <p className="text-red-500">
          Please select a category to add Product variants and prices
        </p>
      </Card>
    );
  }

  return (
    <div>
      <Card className="p-5">
        <h2 className="font-medium text-md mb-3">Product Variants</h2>

        {/* Availability */}
        <div className="flex items-center gap-2">
          <Checkbox onCheckedChange={(val) => setAddImages(Boolean(val))} />
          <span className="text-sm">Add Images For variant</span>
        </div>

        {productVariants.map((pv, variantIndex) => (
          <div key={variantIndex} className="mb-4 border p-3 rounded-xl">
            {/* Color */}
            <Select
              options={colorOptions}
              placeholder="Select color"
              value={pv.color ? { value: pv.color, label: pv.color } : null}
              onChange={(opt) =>
                handleVariantChange(variantIndex, "color", opt?.value || "")
              }
              className="w-fit mb-2"
            />

            <h3 className="font-semibold">Sizes</h3>
            <div>
              {availableSizes.map((availableSize, sizeIndex) => {
                const stock = pv?.sizeStocks[sizeIndex];
                return (
                  <div
                    key={availableSize}
                    className="grid grid-cols-6 gap-3 items-center mb-2"
                  >
                    <div>
                      <h4>{availableSize}</h4>
                    </div>

                    {/* Price */}
                    <Input
                      type="number"
                      placeholder="Price (defaults to 0)"
                      value={stock?.price ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleSizeStockChange(
                          variantIndex,
                          sizeIndex,
                          "price",
                          value === "" ? "" : Number(value),
                        );
                      }}
                    />

                    {/* Stock */}
                    <Input
                      type="number"
                      placeholder="Stock (defaults to 0)"
                      value={stock?.stock ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleSizeStockChange(
                          variantIndex,
                          sizeIndex,
                          "stock",
                          value === "" ? "" : Number(value),
                        );
                      }}
                    />

                    {/* SKU */}
                    <Input
                      placeholder="SKU"
                      value={stock?.sku}
                      onChange={(e) =>
                        handleSizeStockChange(
                          variantIndex,
                          sizeIndex,
                          "sku",
                          e.target.value,
                        )
                      }
                    />

                    {/* Availability */}
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={stock?.availability}
                        onCheckedChange={(val) =>
                          handleSizeStockChange(
                            variantIndex,
                            sizeIndex,
                            "availability",
                            Boolean(val),
                          )
                        }
                      />
                      <span className="text-sm">Available</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between mt-5">
              <div className="flex items-center gap-3">
                {imagePreviews[variantIndex]?.map((src) => (
                  <Image
                    key={src}
                    src={src}
                    height={80}
                    width={80}
                    alt=""
                    className="border size-20 rounded-lg"
                  />
                ))}

                {/* {
                                    pv.images.map((img) => {
                                        const url = URL.createObjectURL(img)
                                        const newImage = document.createElement("img");
                                        newImage.src = url;

                                        return (
                                            <Image src={newImage.src} height={80} width={80} alt="" className="border size-20 rounded-lg" />
                                        )

                                    })
                                } */}
                {addImages && (
                  <div>
                    <label
                      htmlFor={`variant_images-${variantIndex}`}
                      className="cursor-pointer"
                    >
                      <div className="border border-gray-400 p-1">
                        <PlusIcon className="text-gray-400" />
                      </div>
                      <Input
                        id={`variant_images-${variantIndex}`}
                        type="file"
                        className="hidden"
                        multiple
                        onChange={(e) => {
                          const files = e.currentTarget.files;
                          handleSetImages(files, variantIndex);
                        }}
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Remove Button */}
              {productVariants.length > 1 && (
                <div className="flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveVariant(variantIndex)}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}

        <Button type="button" variant="outline" onClick={handleAddVariant}>
          + Add Variant
        </Button>

        {/* Debug */}
        {/* <pre className="mt-5 bg-gray-100 p-2 text-xs rounded">
                    {JSON.stringify(productVariants, null, 2)}
                </pre> */}
      </Card>
    </div>
  );
};

export default ProductVariants;
