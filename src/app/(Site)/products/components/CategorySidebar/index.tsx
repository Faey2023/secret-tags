"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

// ✅ Replace Prisma Category type
type Category = {
  id: string;
  name: string;
  slug: string;
  parentSlug?: string | null;
};

interface CategorySidebarProps {
  categories: Category[];
}

interface CategoryNode extends Category {
  children: CategoryNode[];
}

const CategorySidebar = ({ categories }: CategorySidebarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSlug = searchParams.get("category");

  // State to manage which categories are expanded
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set([currentSlug].filter(Boolean) as string[])
  );

  // Build hierarchical category structure
  const buildCategoryTree = (categories: Category[]): CategoryNode[] => {
    const categoryMap = new Map<string, CategoryNode>();
    const rootCategories: CategoryNode[] = [];

    // First pass: create nodes
    categories.forEach((category) => {
      categoryMap.set(category.slug, { ...category, children: [] });
    });

    // Second pass: link parents
    categories.forEach((category) => {
      const node = categoryMap.get(category.slug)!;

      if (category.parentSlug && categoryMap.has(category.parentSlug)) {
        categoryMap.get(category.parentSlug)!.children.push(node);
      } else {
        rootCategories.push(node);
      }
    });

    return rootCategories;
  };

  const categoryTree = buildCategoryTree(categories);

  // Handle category selection
  const handleCategoryClick = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (currentSlug === slug) {
      params.delete("category");
    } else {
      params.set("category", slug);
    }

    params.delete("page");

    router.push(`?${params.toString()}`);
  };

  // Toggle category expansion
  const toggleExpanded = (slug: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      newSet.has(slug) ? newSet.delete(slug) : newSet.add(slug);
      return newSet;
    });
  };

  // Clear filters
  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  // Render category item recursively
  const renderCategoryItem = (category: CategoryNode, level = 0) => {
    const isSelected = currentSlug === category.slug;
    const isExpanded = expandedCategories.has(category.slug);
    const hasChildren = category.children.length > 0;

    return (
      <div key={category.id}>
        <div className="flex items-center space-x-1">
          <Button
            variant="link"
            size="sm"
            onClick={() => handleCategoryClick(category.slug)}
            className={cn(
              "justify-start flex-1 h-8 px-2 text-sm font-normal text-black",
              level > 0 && "ml-4",
              !hasChildren && "mr-7",
              isSelected && "text-primary underline"
            )}
          >
            <span className="truncate">{category.name}</span>
          </Button>

          {hasChildren && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={(e) => toggleExpanded(category.slug, e)}
            >
              {isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronLeft className="h-3 w-3" />
              )}
            </Button>
          )}
        </div>

        {hasChildren && (
          <Collapsible open={isExpanded}>
            <CollapsibleContent className="ml-2">
              {category.children.map((child) =>
                renderCategoryItem(child, level + 1)
              )}
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    );
  };

  return (
    <Card className="w-fit max-w-xs shadow-none rounded-sm px-2 py-3">
      <CardHeader className="px-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Categories</CardTitle>

          {currentSlug && (
            <Button variant="link" size="sm" onClick={clearFilters} className="text-xs">
              Clear
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0 px-2">
        <div className="space-y-1 max-h-96 overflow-y-auto">
          {categoryTree.length > 0 ? (
            categoryTree.map((category) => renderCategoryItem(category))
          ) : (
            <div className="text-sm text-muted-foreground py-4 text-center">
              No categories available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategorySidebar;
