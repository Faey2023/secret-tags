"use client";

import CategoryForm from "@/components/admin/CategoryForm";
import CategoryTable from "@/components/admin/CategoryTable";

// Dummy Category type (match your Prisma model fields)
type Category = {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  children?: Category[];
};

// Dummy categories
const dummyCategories: Category[] = [
  {
    id: "1",
    name: "Clothing",
    slug: "clothing",
    children: [
      {
        id: "2",
        name: "Men",
        slug: "men",
        parentId: "1",
        children: [],
      },
      {
        id: "3",
        name: "Women",
        slug: "women",
        parentId: "1",
        children: [],
      },
    ],
  },
  {
    id: "4",
    name: "Shoes",
    slug: "shoes",
    children: [],
  },
  {
    id: "5",
    name: "Accessories",
    slug: "accessories",
    children: [],
  },
];

const CategoryManagement = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Category Management</h1>
      <hr />

      {/* Category adding form */}
      <CategoryForm categories={dummyCategories} />

      <hr className="my-4" />

      {/* Category list table */}
      <CategoryTable categories={dummyCategories} />
    </div>
  );
};

export default CategoryManagement;
