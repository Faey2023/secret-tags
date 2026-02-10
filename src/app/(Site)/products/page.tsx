"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import CategorySidebar from "./components/CategorySidebar";
import SearchbarAndOtherFilters from "./components/SearchbarAndOtherFilters";

// ---------------------------
// Types
// ---------------------------
type Category = {
  id: string;
  name: string;
  slug: string;
};

type SizeStock = {
  id: string;
  size: string;
  price: number;
  availability: boolean;
};

type Variant = {
  id: string;
  color: string;
  sizeStocks: SizeStock[];
};

type Product = {
  id: string;
  name: string;
  description: string;
  Category: Category;
  tags: string[];
  images: { secure_url: string }[];
  variants: Variant[];
  discount: number; // percent
};

// ---------------------------
// Dummy Data
// ---------------------------
const dummyCategories: Category[] = [
  { id: "1", name: "Clothing", slug: "clothing" },
  { id: "2", name: "Men", slug: "men" },
  { id: "3", name: "Women", slug: "women" },
  { id: "4", name: "Shoes", slug: "shoes" },
];

const dummyProducts: Product[] = [
  {
    id: "p1",
    name: "Cool T-Shirt",
    description: "A very cool t-shirt for everyday use.",
    Category: { id: "2", name: "Men", slug: "men" },
    tags: ["new", "popular"],
    images: [{ secure_url: "/placeholder.png" }],
    variants: [
      {
        id: "v1",
        color: "red",
        sizeStocks: [
          { id: "s1", size: "S", price: 20, availability: true },
          { id: "s2", size: "M", price: 20, availability: true },
        ],
      },
    ],
    discount: 10,
  },
  {
    id: "p2",
    name: "Stylish Sneakers",
    description: "Comfortable and stylish sneakers.",
    Category: { id: "4", name: "Shoes", slug: "shoes" },
    tags: ["sale"],
    images: [{ secure_url: "/placeholder.png" }],
    variants: [
      {
        id: "v2",
        color: "white",
        sizeStocks: [
          { id: "s3", size: "8", price: 50, availability: true },
          { id: "s4", size: "9", price: 50, availability: false },
        ],
      },
    ],
    discount: 20,
  },
];

// ---------------------------
// Component
// ---------------------------
export type ProductsPageProps = {
  searchParams?: {
    search?: string;
    category?: string;
    viewMode?: "grid" | "list";
  };
};

const Products = ({ searchParams }: ProductsPageProps) => {
  const { search, category, viewMode } = searchParams || {};

  // Filter products based on search or category
  const filteredProducts = dummyProducts.filter((p) => {
    const matchesCategory = category ? p.Category.slug === category : true;
    const matchesSearch = search
      ? p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Products</h1>
        <p className="text-muted-foreground">
          Discover our curated collection of lifestyle products
        </p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <CategorySidebar categories={dummyCategories} />

        {/* Main Content */}
        <div className="flex-1">
          <SearchbarAndOtherFilters />

          <p className="text-muted-foreground mb-2">
            Showing {filteredProducts.length} product
            {filteredProducts.length !== 1 && "s"}
          </p>

          <div
            className={
              viewMode === "list"
                ? "space-y-4"
                : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
            }
          >
            {filteredProducts.map((product) => {
              const variant = product.variants[0];
              const size = variant.sizeStocks[0];
              const price = size.price;
              const finalPrice = price - (price * product.discount) / 100;

              return (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card className="group h-full rounded-sm overflow-hidden">
                    {/* Image */}
                    <div className="relative w-full h-48 bg-muted">
                      <Image
                        src={product.images?.[0]?.secure_url || "/placeholder.png"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />

                      <div className="absolute top-2 left-2 flex gap-2">
                        {product.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="capitalize">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <CardContent className="p-3 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <Badge variant="outline" className="text-xs">
                            {product.Category.name}
                          </Badge>

                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-primary text-primary" />
                          </div>
                        </div>

                        <h3 className="font-semibold group-hover:text-primary">
                          {product.name}
                        </h3>

                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      {/* Price + Button */}
                      <div className="flex justify-between items-center mt-3">
                        <div>
                          <span className="text-lg font-bold text-primary">
                            ${finalPrice.toFixed(2)}
                          </span>
                          {product.discount > 0 && (
                            <span className="text-sm line-through text-muted-foreground ml-2">
                              ${price.toFixed(2)}
                            </span>
                          )}
                        </div>

                        <Button size="sm">Add To Cart</Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No products found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
