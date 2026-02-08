import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/prisma";
import CategorySidebar from "./components/CategorySidebar";
import SearchbarAndOtherFilters from "./components/SearchbarAndOtherFilters";

export type ProductsPageProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Products = async ({ searchParams }: ProductsPageProps) => {
    const { search, category, price, viewMode } = await searchParams;
    console.log("category:", category);

    const products = await prisma.product.findMany({
        where: {
            categorySlug: category as string,
            ...(search && {
                OR: [
                    {
                        name: {
                            contains: search as string,
                            mode: 'insensitive'
                        }
                    },
                    {
                        slug: {
                            contains: search as string,
                            mode: 'insensitive'
                        }
                    },
                    {
                        description: {
                            contains: search as string,
                            mode: 'insensitive'
                        }
                    }
                ]
            })
            // listed: true,
        },
        include: {
            Category: true,
            variants: {
                take: 1,
                include: {
                    sizeStocks: {
                        take: 1
                    }
                }
            }
        }
    });

    const categories = await prisma.category.findMany();
    // console.log('categories:', categories);

    // console.log("products:", products);

    return (
        <div>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Products</h1>
                    <p className="text-muted-foreground">Discover our curated collection of lifestyle products</p>
                </div>

                <div className="flex justify-between gap-6">
                    <div>
                        <CategorySidebar categories={categories} />
                    </div>


                    <div>
                        <SearchbarAndOtherFilters />
                        {/* Results Count */}
                        <div className="mb-2">
                            <p className="text-muted-foreground">
                                Showing {products.length} product{products.length !== 1 ? 's' : ''}
                            </p>
                        </div>

                        {/* Products Grid */}
                        <div
                            className={viewMode === "list"
                                ? "space-y-4"
                                : "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4"
                            }
                        >
                            {products.map((product) => (
                                <Link key={product.id} href={`/products/${product.id}`}>
                                    <Card className="product-card p-0 gap-0 group h-full justify-between rounded-sm">
                                        <div className="relative w-full min-h-48 overflow-hidden">
                                            <Image
                                                src={product.images[0].secure_url}
                                                alt={product.name}
                                                fill={true}
                                                className="product-card-image w-full min-h-48 bg-muted rounded-t-sm"
                                            />
                                            <div className="absolute top-2 left-2 flex gap-2">
                                                {
                                                    product.tags.map((tag) => (
                                                        <Badge key={tag} variant='secondary' className="capitalize">{tag}</Badge>
                                                    ))
                                                }
                                            </div>
                                        </div>

                                        <CardContent className="p-3 h-full flex flex-col justify-between">
                                            <div>
                                                <div className="mb-1 flex justify-between items-center">
                                                    <div>
                                                        <Badge variant="outline" className="text-xs">
                                                            {product.Category.name}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-muted-foreground text-sm">
                                                            {/* ({product.reviews} reviews) */}
                                                        </span>
                                                        <div className="flex items-center">
                                                            <Star className="w-4 h-4 fill-primary text-primary" />
                                                            {/* <span className="ml-1 text-sm font-medium">{product.rating}</span> */}
                                                        </div>
                                                    </div>
                                                </div>

                                                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                                                    {product.name}
                                                </h3>

                                                <p className="text-mut-+**ed-foreground text-sm mb-2 line-clamp-2">
                                                    {product.description}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg font-bold text-primary">
                                                        ${(product.variants[0].sizeStocks[0].price * product.discount) / 100}
                                                    </span>
                                                    <span className="text-sm text-muted-foreground line-through">
                                                        ${product.variants[0].sizeStocks[0].price}
                                                    </span>
                                                </div>

                                                <Button size="sm">
                                                    Add To Cart
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>

                        {/* {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("All");
                            }}
                            className="mt-4"
                        >
                            Clear Filters
                        </Button>
                    </div>
                )} */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;