export type TSizeStocks = {
    size: string;
    sku: string;
    price: number;
    stock: number;
    availability: boolean;
};

export type TProductVariant = {
    color: string;
    images: File[];
    sizeStocks: TSizeStocks[];
};

export type TProductType = {
    name: string;
    slug: string;
    description: string;
    tags: string[];
    features: string[];
    materials: string[];

    images: File[];

    discount: number;
    listed: boolean;

    categorySlug: string;

    variants: TProductVariant[];
};
