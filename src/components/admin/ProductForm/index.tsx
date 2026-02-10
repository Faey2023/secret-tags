"use client";

import { Input } from "@/components/ui/input";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'react-toastify';
import { Category } from "@/types/category";
import { toastOptions } from "@/utils/toastOptions";
import { materialOptions } from "@/data/MaterialOptions";
import ImageDndD, { PreviewImage } from "@/components/ImageDnD";
// import { TProductVariant } from "@/types/ProductType";
import ProductVariants from "./ProductVariants";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export interface TSizeStocksFrontend {
    size: string;
    sku: string;
    price: string | number;
    stock: string | number;
    availability: boolean;
}

export interface TProductVariantFrontend {
    color: string;
    images: File[];
    sizeStocks: TSizeStocksFrontend[];
}

const ProductForm = ({ categories }: { categories: (Category & { children: Category[] })[] }) => {
    const formRef = useRef<HTMLFormElement>(null)
    const [isPending, setIsPending] = useState(false);
    const [productImages, setProductImages] = useState<PreviewImage[]>([])
    const [selectedCategory, setSelectedCategory] = useState<{ value: string, label: string } | null>()
    const [selectedTags, setSelectedTags] = useState<{ value: string, label: string }[]>([])
    const [selectedMaterials, setSelectedMaterials] = useState<{ value: string, label: string }[]>([])
    const [selectedProductFeatures, setSelectedProductFeatures] = useState<{ value: string, label: string }[]>([])
    const [productVariants, setProductVariants] = useState<TProductVariantFrontend[]>([]);
    const [listed, setListed] = useState(false);
    console.log("This is product variants:", productVariants);
    // console.log("selected category:", selectedCategory);

    // console.log("Uploaded images:", productImages);

    const handleSubmit = async (formData: FormData) => {
        setIsPending(true)
        // Validate product images
        if (!productImages || productImages.length < 1) {
            toast.error("Choose at least one product image.", toastOptions);
            return;
        }

        // Validate name
        const name = formData.get("name")?.toString().trim();
        if (!name) {
            toast.error("Product name is required.", toastOptions);
            return;
        }

        // Validate description
        const description = formData.get("description")?.toString().trim();
        if (!description) {
            toast.error("Product description is required.", toastOptions);
            return;
        }

        // Validate category
        const categorySlug = formData.get("category")?.toString();
        if (!categorySlug) {
            toast.error("Please select a category.", toastOptions);
            return;
        }

        // Validate discount
        const discountValue = Number(formData.get("discount"));
        const discount = isNaN(discountValue) || discountValue < 0 ? 0 : discountValue;

        // Validate tags, features, materials
        const tags = formData.getAll("tags").map((t) => t.toString().trim()).filter(Boolean);
        const features = formData.getAll("features").map((f) => f.toString().trim()).filter(Boolean);
        const materials = formData.getAll("materials").map((m) => m.toString().trim()).filter(Boolean);

        // Validate variants
        if (!productVariants || productVariants.length === 0) {
            toast.error("Add at least one product variant.", toastOptions);
            return;
        }

        // Validate each variant
        for (const variant of productVariants) {
            if (!variant.color) {
                toast.error("Each variant must have a color.", toastOptions);
                return;
            }

            if (!variant.sizeStocks || variant.sizeStocks.length === 0) {
                toast.error(`Variant ${variant.color} must have at least one size stock.`, toastOptions);
                return;
            }

            // for (const stock of variant.sizeStocks) {
            //     if (!stock.size || !stock.sku || stock.price <= 0 || stock.stock < 0) {
            //         toast.error(
            //             `Variant ${variant.color}: Each size stock must have size, sku, price > 0, and stock >= 0.`,
            //             toastOptions
            //         );
            //         return;
            //     }
            // }
        }

        // console.log("console listed:", formData.get('listed'));
        // Create FormData to send to backend
        formData.append("slug", name.toLowerCase().replace(/\s+/g, "-"));
        formData.append("categorySlug", categorySlug);
        formData.append("discount", discount.toString())
        formData.append("listed", listed ? 'true' : 'false');

        // Append tags, features, materials as JSON
        formData.append("tags", JSON.stringify(tags));
        formData.append("features", JSON.stringify(features));
        formData.append("materials", JSON.stringify(materials));

        // Append variants as JSON
        formData.append(
            "variants",
            JSON.stringify(
                productVariants.map((variant, i) => ({
                    ...variant,
                    images: variant.images.map((_, j) => `variant-${i}-${j}`),
                }))
            )
        );

        // Append variant files separately
        productVariants.forEach((variant, i) => {
            variant.images.forEach((img, j) => {
                formData.append(`variantImages-${i}-${j}`, img);
            });
        });

        // Append product images as files
        productImages.forEach((img) => formData.append("images", img.file));

        try {
            const res = await fetch("/api/product", {
                method: "POST",
                body: formData, // browser auto handles multipart headers
            });

            const responseData = await res.json();

            if (!res.ok) {
                toast.error(responseData.message || "Failed to create product.", toastOptions);
                resetForm()
                setIsPending(false)
                return;
            }

            console.log("API response:", responseData);
            console.log("This is response Data,", responseData);
            toast.success(responseData.message.message || "Product created successfully!", toastOptions);


            resetForm();
            setIsPending(false);
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong while creating the product.", toastOptions);
        }

    };

    const handleCancelSubmission = async () => {
        resetForm()

        toast.info("Form submission cancelled.", toastOptions);
    };

    const resetForm = async () => {
        setProductImages([])
        setSelectedCategory(null);
        setSelectedTags([]);
        setSelectedMaterials([]);
        setSelectedProductFeatures([])
        setProductVariants([]);
        formRef.current?.reset();
    }

    const tags = [
        { value: 'sale', label: 'Sale' },
        { value: 'fixed', label: 'Fixed' },
        { value: 'new', label: 'New' },
    ];

    const features = [
        { value: 'waterproof', label: 'Waterproof' },
        { value: 'wireless', label: 'Wireless' },
        { value: 'smart', label: 'Smart' },
    ];

    // const calculatedFinalPrice = (price: number | null, discount: number | null) => {
    //     if (!price || !discount) {
    //         return
    //     }
    //     const discountAmount = price * discount / 100
    //     if (discount < 0 || discount > 100 || isNaN(discountAmount)) return price;
    //     const finalPrice = price - discountAmount;
    //     return finalPrice;
    // };

    return (
        <div>
            <form
                ref={formRef}
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    handleSubmit(formData);
                }}
                className="space-y-4 flex flex-col"
            >

                <Card className="shadow-none px-5 py-5">
                    <div>
                        <h3 className="text-lg font-semibold">Upload Images</h3>
                        <ImageDndD images={productImages} setImages={setProductImages} />
                    </div>
                </Card>

                <div className="space-y-4">
                    <label htmlFor="name" className="text-sm">Product Name</label>
                    <Input
                        name="name"
                        placeholder="Product Name"
                        className=""
                    // required
                    />

                    <label htmlFor="description" className="text-sm">Product Description</label>
                    <Textarea
                        name="description"
                        placeholder="Product Description"
                        className=""
                    // required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="category" className="text-sm">Product Category</label>
                            <Select
                                name="category"
                                options={categories.map((cat) => { return { value: cat.slug, label: cat.name } })}
                                isClearable={true}
                                value={selectedCategory}
                                onChange={(selected) => setSelectedCategory(selected as { value: string, label: string })}
                            />
                        </div>
                        <div>
                            <label htmlFor="tags" className="text-sm">Product Tags</label>
                            <Select
                                name="tags"
                                options={tags}
                                isMulti
                                value={selectedTags}
                                onChange={(val) => setSelectedTags(val as { value: string, label: string }[])}
                            />
                        </div>
                    </div>


                    <div className="grid grid-cols-2 gap-4">
                        {/* material, height, width, weight, color */}
                        <div>
                            <label htmlFor="materials" className="text-sm">Material&#40;s&#41;</label>
                            <Select
                                name="materials"
                                options={materialOptions}
                                isMulti
                                value={selectedMaterials}
                                onChange={(val) => setSelectedMaterials(val as { value: string, label: string }[])}
                            />
                        </div>
                        <div>
                            <label htmlFor="features" className="text-sm">Product Features</label>
                            <CreatableSelect
                                name="features"
                                options={features}
                                isMulti
                                // isClearable={true}
                                value={selectedProductFeatures}
                                onChange={(val) => setSelectedProductFeatures(val as { value: string, label: string }[])}
                            />
                        </div>
                    </div>

                    {/* Product specifications section */}
                    <hr />
                    <p className="text-lg">Variants, price and stocks</p>
                    <ProductVariants
                        measurementSystem={categories.find((cat) => cat.slug === selectedCategory?.value)?.measurementSystem || ""}
                        productVariants={productVariants}
                        setProductVariants={setProductVariants}
                    />

                    <hr />

                    <div className="flex items-end justify-between gap-4">
                        <div className="w-1/2">
                            <label htmlFor="discount" className="text-sm">Product Discount (0-100) percentage</label>
                            <Input
                                name="discount"
                                type="number"
                                placeholder="Product Discount (0-100) percentage"
                            // required
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch name="listed" onCheckedChange={setListed} id="listed" />
                            <Label htmlFor="listed">Listed</Label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Button type="submit" className="mt-4">
                        {isPending ? <LoadingSpinner /> : "Submit"}
                    </Button>
                    <Button disabled type="button" variant="outline" className="mt-4">Save as Draft</Button>

                    <Button onClick={handleCancelSubmission} type="reset" variant="outline" className="mt-4">
                        {isPending ? <LoadingSpinner /> : "Cancel"}
                    </Button>
                </div>
            </form>
        </div >
    );
};

export default ProductForm;