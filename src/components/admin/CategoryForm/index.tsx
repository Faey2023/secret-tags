"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { measurementSystemOptions } from "@/utils/categoryUtils";
import { toastOptions } from "@/utils/toastOptions";
import { Category } from "@/types/category";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

const CategoryForm = ({ categories }: { categories: Category[] }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedMeasurementSystem, setSelectedMeasurementSystem] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedParent, setSelectedParent] = useState<{
    value: string;
    label: string;
  } | null>(null);

  console.log(selectedMeasurementSystem);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    startTransition(async () => {
      const parentSlug = selectedParent?.value;
      console.log("Parent slug", parentSlug);
      formData.append("parentSlug", parentSlug as string);
      // Submit the form data
      const res = await fetch("/api/categories", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("Failed to create category:", res.statusText);
        toast.error("Failed to create category.", toastOptions);
        return;
      } else {
        toast.success("Category created successfully.", toastOptions);
        setSelectedMeasurementSystem(null);
        setSelectedParent(null);
        form.reset();
        router.refresh();
      }
    });
  };

  return (
    <form
      className="space-y-4 mt-3"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        handleSubmit(e);
      }}
    >
      <label htmlFor="name" className="text-sm">
        Category Name
      </label>
      <Input id="name" name="name" placeholder="Enter category name" required />

      <label htmlFor="measurementSystem" className="text-sm">
        Measurement System
      </label>
      {/* have to reset after form submission */}
      <Select
        name="measurementSystem"
        value={selectedMeasurementSystem}
        onChange={(selected) =>
          setSelectedMeasurementSystem(
            selected as { value: string; label: string },
          )
        }
        options={measurementSystemOptions}
        isClearable
      />

      <label htmlFor="parent" className="text-sm">
        Parent Category
      </label>
      <Select
        name="parent"
        value={selectedParent}
        onChange={(selected) =>
          setSelectedParent(selected as { value: string; label: string } | null)
        }
        options={categories.map((cat) => {
          return { value: cat.slug, label: cat.name };
        })}
        isClearable
      />

      <div className="flex justify-end">
        <Button type="submit">
          {isPending ? <LoadingSpinner /> : "Create Category"}
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
