"use client";

import { useState, useTransition, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { toast } from "react-toastify";
import { toastOptions } from "@/utils/toastOptions";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Card } from "@/components/ui/card";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import { Category } from "@/types/category";


export default function CategoryTable({ categories }: { categories: (Category & { children: Category[] })[] }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [editCategory, setEditCategory] = useState<Category | null>(null);
    const [editName, setEditName] = useState("");
    const [highlightedId, setHighlightedId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState("")

    // Store refs for each row
    const rowRefs = useRef<Record<string, HTMLTableRowElement | null>>({});

    // Delete category
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this category?")) return;

        setDeleteId(id)
        startTransition(async () => {
            try {
                const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
                if (!res.ok) throw new Error("Delete failed");
                toast.success("Category deleted", toastOptions);
                setDeleteId("")
                router.refresh()
            } catch (err) {
                console.error(err);
                toast.error("Failed to delete", toastOptions);
            }
        });
    };

    // Update category
    const handleUpdate = async () => {
        if (!editCategory) return;

        startTransition(async () => {
            try {
                const res = await fetch(`/api/categories/${editCategory.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: editName }),
                });
                if (!res.ok) throw new Error("Update failed");

                toast.success("Category updated", toastOptions);
                setEditCategory(null);
                // fetchCategories();
            } catch (err) {
                console.error(err);
                toast.error("Failed to update", toastOptions);
            }
        });
    };

    // Navigate to child row
    const handleNavigateToChild = (childId: string) => {
        const row = rowRefs.current[childId];
        if (row) {
            row.scrollIntoView({ behavior: "smooth", block: "center" });
            setHighlightedId(childId);
            // Remove highlight after 2.5s
            setTimeout(() => setHighlightedId(null), 2500);
        }
    };

    return (
        <div className={`space-y-4`}>
            <h2 className="text-xl font-semibold">Manage Categories</h2>
            <Card className="py-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Measurement</TableHead>
                            <TableHead>Parent</TableHead>
                            <TableHead>Children</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((cat) => (
                            <TableRow
                                key={cat.id}
                                ref={(el) => { rowRefs.current[cat.id] = el; }}
                                className={clsx(
                                    highlightedId === cat.id &&
                                    "bg-yellow-100 transition-colors duration-500"
                                )}
                            >
                                <TableCell>{cat.name}</TableCell>
                                <TableCell>{cat.slug}</TableCell>
                                <TableCell>{cat.measurementSystem}</TableCell>
                                <TableCell>{cat.parentSlug || "-"}</TableCell>

                                {/* Children column */}
                                <TableCell>
                                    <div className="space-x-2">
                                        {cat.children && cat.children.length > 0 ? (
                                            cat.children.map((child) => (
                                                <Button
                                                    key={child.id}
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => handleNavigateToChild(child.id)}
                                                >
                                                    {child.name}
                                                </Button>
                                            ))
                                        ) : (
                                            <span>-</span>
                                        )}
                                    </div>
                                </TableCell>

                                {/* Actions */}
                                <TableCell className="flex gap-2 justify-end">
                                    {/* Edit via Sheet */}
                                    <Sheet
                                        open={editCategory?.id === cat.id}
                                        onOpenChange={(open) => {
                                            if (!open) setEditCategory(null);
                                        }}
                                    >
                                        <SheetTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => {
                                                    setEditCategory(cat);
                                                    setEditName(cat.name);
                                                }}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent>
                                            <SheetHeader>
                                                <SheetTitle>Edit Category</SheetTitle>
                                                <SheetDescription>
                                                    Update the category details and save changes.
                                                </SheetDescription>
                                            </SheetHeader>
                                            <div className="mt-4 space-y-4">
                                                <Input
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    placeholder="Category name"
                                                />
                                                <Button onClick={handleUpdate} disabled={isPending}>
                                                    {isPending ? "Saving..." : "Save Changes"}
                                                </Button>
                                            </div>
                                        </SheetContent>
                                    </Sheet>

                                    {/* Delete */}
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDelete(cat.id)}
                                        disabled={isPending && deleteId === cat.id}
                                    >
                                        {
                                            isPending && deleteId === cat.id ? <LoadingSpinner /> :
                                                <Trash className="h-4 w-4" />
                                        }
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
