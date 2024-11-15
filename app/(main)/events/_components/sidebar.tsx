'use client';

import React, { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { SearchIcon, Menu, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterOption {
    value: string;
    label: string;
}

interface SearchAndFilterProps {
    placeholder: string;
    categories: FilterOption[];
    locations: FilterOption[];
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ placeholder, categories, locations }) => {
    const [open, setOpen] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        updateSearchParams('query', term);
    }, 300);

    const handleCategoryChange = (category: string) => {
        updateSearchParams('category', category);
    };

    const handleLocationChange = (location: string) => {
        updateSearchParams('location', location);
    };

    const updateSearchParams = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const FilterSection: React.FC = () => (
        <div className='space-y-4 py-4'>
            <div className="px-3 py-2">
                <h2 className="mb-4 px-4 text-lg font-semibold flex items-center">
                    <Filter className="mr-2 h-5 w-5" />
                    Filters
                </h2>
                <div className="space-y-4">
                    <div className="px-4">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Category</label>
                        <Select onValueChange={handleCategoryChange} defaultValue={searchParams.get('category') || ''}>
                            <SelectTrigger className="w-full mt-1">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="px-4">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Location</label>
                        <Select onValueChange={handleLocationChange} defaultValue={searchParams.get('location') || ''}>
                            <SelectTrigger className="w-full mt-1">
                                <SelectValue placeholder="Select a location" />
                            </SelectTrigger>
                            <SelectContent>
                                {locations.map((location) => (
                                    <SelectItem key={location.value} value={location.value}>{location.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex items-center space-x-4">

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <FilterSection />
                </SheetContent>
            </Sheet>
            <div className="hidden md:flex md:w-64 md:flex-col">
                <FilterSection />
            </div>
        </div>
    );
};

export default SearchAndFilter;
