"use client";

// import { TImage } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

type TImage = {
  public_id: string;
  secure_url: string;
};

const ProductImages = ({ images }: { images: TImage[] }) => {
    const [selectedImageId, setSelectedImageId] = useState<string>(images[0].public_id);
    const selectedImage = images.find((image) => image.public_id === selectedImageId);

    return (
        <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                <Image
                    src={selectedImage!.secure_url}
                    alt={'Product image'}
                    fill={true}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex gap-2 overflow-x-auto">
                {images.map((image) => (
                    <button
                        key={image.public_id}
                        onClick={() => setSelectedImageId(image.public_id)}
                        className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImageId === image.public_id ? "border-primary" : "border-border"
                            }`}
                    >
                        <Image
                            src={image.secure_url}
                            width={80}
                            height={80}
                            alt={`product image`}
                            className="w-full h-full object-cover bg-muted"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductImages;