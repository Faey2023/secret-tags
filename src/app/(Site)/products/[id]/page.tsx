import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductImages from "./components/ProductImages";
import SelectVariantsAndSize from "./components/SelectVariantsAndSize";
import AddToCart from "./components/AddToCart";

// ✅ Dummy Product Data
const dummyProduct = {
  id: "1",
  name: "Premium Cotton T-Shirt",
  description: "Soft breathable cotton t-shirt. Perfect for daily wear.",
  tags: ["New", "Trending"],
  features: ["100% Cotton", "Slim Fit", "Machine Washable"],
  Category: { name: "Clothing" },

  images: [
    {
      public_id: "1",
      secure_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
      public_id: "2",
      secure_url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    },
  ],

  variants: [
    {
      id: "v1",
      color: "Red",
      images: [
        { secure_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e" },
      ],
      sizeStocks: [
        { id: "s1", size: "S", stock: 5, availability: true },
        { id: "s2", size: "M", stock: 0, availability: false },
        { id: "s3", size: "L", stock: 3, availability: true },
      ],
    },
    {
      id: "v2",
      color: "Blue",
      images: [
        { secure_url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },
      ],
      sizeStocks: [
        { id: "s4", size: "S", stock: 2, availability: true },
        { id: "s5", size: "M", stock: 1, availability: true },
      ],
    },
  ],
};

const ProductDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log("Product ID:", id);

  // ✅ Replace Prisma with dummy data
  const product = dummyProduct;

  if (!product) {
    notFound();
  }

  const productVariants = product.variants;
  const images = product.images;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/products"
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <ProductImages images={images} />

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{product.Category.name}</Badge>
              {product.tags.map((tag) => (
                <Badge key={tag} className="bg-primary text-primary-foreground">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-4">
              {product.name}
            </h1>

            <p className="text-muted-foreground leading-relaxed mb-6">
              {product.description}
            </p>

            <SelectVariantsAndSize productVariants={productVariants} />
            <AddToCart productVariants={productVariants} />
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Product Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Specifications</h3>
            <p className="text-muted-foreground">
              Specifications coming soon...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
