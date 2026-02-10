"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { CloudUploadIcon, X } from "lucide-react";
import Image from "next/image";
import {
    DndContext,
    closestCenter,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    useSortable,
    horizontalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type PreviewImage = {
    id: string;
    file: File;
    url: string;
    width: number;
    height: number;
    order: number;
};

type ImageDnDProps = {
    images: PreviewImage[];
    setImages: React.Dispatch<React.SetStateAction<PreviewImage[]>>;
};

function SortableImage({ image, onRemove }: { image: PreviewImage; onRemove: (id: string) => void }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="relative w-24 h-24 border rounded overflow-hidden"
        >
            {/* Apply listeners only to the image, not the remove button */}
            <div {...listeners} className="w-full h-full cursor-grab">
                <Image
                    src={image.url}
                    alt={image.file.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                />
            </div>

            <button
                type="button"
                onClick={() => onRemove(image.id)}
                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 hover:bg-red-500 transition-colors"
            >
                <X className="w-3 h-3" />
            </button>

            <span className="absolute bottom-0 right-0 bg-black text-white text-xs px-1">
                {image.order + 1}
            </span>
        </div>
    );
}

export default function ImageDnD({ images, setImages }: ImageDnDProps) {
    // const [images, setImages] = useState<PreviewImage[]>([]);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (files: FileList | null) => {
        if (!files) return;
        Array.from(files).forEach((file) => {
            const url = URL.createObjectURL(file);
            const img = document.createElement("img");
            img.src = url;
            img.onload = () => {
                setImages((prev) => [
                    ...prev,
                    {
                        id: `${file.name}-${Date.now()}-${prev.length}`,
                        file,
                        url,
                        width: img.width,
                        height: img.height,
                        order: prev.length,
                    },
                ]);
            };
        });
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingOver(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = images.findIndex((img) => img.id === active.id);
            const newIndex = images.findIndex((img) => img.id === over?.id);
            setImages(arrayMove(images, oldIndex, newIndex).map((img, idx) => ({
                ...img,
                order: idx,
            })));
        }
    };

    const handleRemove = (id: string) => {
        setImages((prev) => prev.filter((img) => img.id !== id).map((img, idx) => ({ ...img, order: idx })));
    };

    return (
        <div>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDraggingOver ? "border-primary bg-gray-100" : "border-gray-300 hover:border-primary hover:bg-gray-50"
                    }`}
            >
                <CloudUploadIcon className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-gray-600 font-medium">Click or drag & drop images here</span>
                <span className="text-xs text-gray-400">Supports multiple images</span>
                <Input
                    type="file"
                    multiple
                    ref={inputRef}
                    onChange={(e) => handleFiles(e.currentTarget.files)}
                    className="hidden"
                />
            </div>

            {images.length > 0 && (
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={images.map((img) => img.id)} strategy={horizontalListSortingStrategy}>
                        <div className="flex gap-2 mt-4 overflow-x-auto">
                            {images.map((img) => (
                                <SortableImage key={img.id} image={img} onRemove={handleRemove} />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            )}
        </div>
    );
}
