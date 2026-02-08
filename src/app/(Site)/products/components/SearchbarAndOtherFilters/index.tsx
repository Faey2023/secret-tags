"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Grid, List, Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const SearchbarAndOtherFilters = () => {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [sortByPrice, setSortByPrice] = useState<"lth" | "htl">();

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    const handleSearchOnchange = (value: string) => {
        router.push(pathname + '?' + createQueryString('search', value))
    }

    useEffect(() => {
        router.push(pathname + '?' + createQueryString('viewMode', viewMode))
    }, [createQueryString, pathname, router, viewMode])

    const handleViewModeChange = () => {
        router.push(pathname + '?' + createQueryString('viewMode', viewMode))
    }

    const handleSortByPrice = (value: "lth" | "htl") => {
        setSortByPrice(value)
        router.push(pathname + '?' + createQueryString('price', value))
    }


    return (
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        type="text"
                        placeholder="Search products..."
                        onChange={(e) => handleSearchOnchange(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            {sortByPrice ? (sortByPrice === 'lth' ? "Low to High" : "High to Low") : 'Sort By Price'}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-fit" align="start">
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                onClick={() => {
                                    const params = new URLSearchParams(searchParams.toString());
                                    params.delete('price');
                                    setSortByPrice(undefined);
                                    router.push(pathname + '?' + params.toString());
                                }}
                                className={`${!sortByPrice && 'bg-primary-foreground'}`}
                            >
                                Default
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    handleSortByPrice('lth')
                                }}
                                className={`${sortByPrice === 'lth' && 'bg-primary-foreground'}`}
                            >
                                Price low to high
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    handleSortByPrice('htl')
                                }}
                                className={`${sortByPrice === 'htl' && 'bg-primary-foreground'}`}
                            >
                                Price high to low
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex border border-border rounded-lg">
                    <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => {
                            setViewMode("grid")
                            handleViewModeChange()
                        }}
                        className="rounded-r-none"
                    >
                        <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => {
                            setViewMode("list")
                            handleViewModeChange()
                        }}
                        className="rounded-l-none"
                    >
                        <List className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SearchbarAndOtherFilters;