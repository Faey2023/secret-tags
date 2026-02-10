"use client";

import ProductForm from "@/components/admin/ProductForm";

type Category = {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  children?: Category[];
};

const dummyCategories: Category[] = [
  {
    id: "1",
    name: "Clothing",
    slug: "clothing",
    children: [
      { id: "2", name: "Men", slug: "men", parentId: "1" },
      { id: "3", name: "Women", slug: "women", parentId: "1" },
    ],
  },
  {
    id: "4",
    name: "Shoes",
    slug: "shoes",
    children: [],
  },
];

const AddProduct = () => {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Add Product</h1>

      <ProductForm categories={dummyCategories} />
    </div>
  );
};

export default AddProduct;
