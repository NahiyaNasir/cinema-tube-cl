/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { serverManagedFilter, useServerManagedDataTableFilters } from "@/src/hooks/useServerManagedDataTableFilters";
import { useRowActionModalState } from "@/src/hooks/useRowActionModalState";
import { useServerManagedDataTable } from "@/src/hooks/useServerManagedDataTable";
import { useServerManagedDataTableSearch } from "@/src/hooks/useServerManagedDataTableSearch";
import { adminGetAllMedia } from "@/src/service/admin.service";
import { TanTableFilterConfig, TanTableFilterValues } from "@/src/app/shared/table/tanTableFilter";
import TanTable from "@/src/app/shared/table/TanTable";
import { mediaColumns } from "./mediaColume";
import DeleteMediaDialog from "./DeleteMediaDialog";


const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const MEDIA_FILTER_DEFINITIONS = [
  serverManagedFilter.single("type"),
  serverManagedFilter.single("pricing"),
];

const MediaTable = ({
  // initialQueryString,
}: {
  initialQueryString?: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { deletingItem, isDeleteDialogOpen, onDeleteOpenChange, tableActions } =
    useRowActionModalState<any>();

  const {
    queryStringFromUrl,
    optimisticSortingState,
    optimisticPaginationState,
    isRouteRefreshPending,
    updateParams,
    handleSortingChange,
    handlePaginationChange,
  } = useServerManagedDataTable({
    searchParams,
    defaultPage: DEFAULT_PAGE,
    defaultLimit: DEFAULT_LIMIT,
  });

  const queryString = queryStringFromUrl || "";

  const { searchFromUrl, handleDebouncedSearchChange } =
    useServerManagedDataTableSearch({
      searchParams,
      updateParams,
    });

  const { filterValues, handleFilterChange, clearAllFilters } =
    useServerManagedDataTableFilters({
      searchParams,
      definitions: MEDIA_FILTER_DEFINITIONS,
      updateParams,
    });

  const { data, isLoading, isFetching } = useQuery({
   
    queryKey: ["admin-medias", queryString],
    queryFn: () =>
      adminGetAllMedia(Object.fromEntries(new URLSearchParams(queryString))),
  });

  const items = (data as any)?.data || [];
  const meta = (data as any)?.meta;


// console.log(items);


// console.log("queryString:", queryString);
console.log("searchParams.toString():", searchParams.toString());

  const filterConfigs = useMemo<TanTableFilterConfig[]>(() => {
    return [
      {
        id: "type",
        label: "Content Type",
        type: "single-select",
        options: [
          { label: "Movie", value: "MOVIE" },
          { label: "Series", value: "SERIES" },
          { label: "Drama", value: "DRAMA" },
          { label: "Anime", value: "ANIME" },
          { label: "Documentary", value: "DOCUMENTARY" },
        ],
      },
      {
        id: "pricing",
        label: "Pricing",
        type: "single-select",
        options: [
          { label: "Free", value: "FREE" },
          { label: "Premium", value: "PREMIUM" },
          { label: "Rental", value: "RENTAL" },
        ],
      },
    ];
  }, []);

  const filterValuesForTable = useMemo<TanTableFilterValues>(() => {
    return {
      type: filterValues.type,
      pricing: filterValues.pricing,
    };
  }, [filterValues]);

  return (
    <>
      <TanTable
        data={items}
        columns={mediaColumns}
        isLoading={isLoading || isFetching || isRouteRefreshPending}
        emptyMessage="No media found."
        sorting={{
          state: optimisticSortingState,
          onSortingChange: handleSortingChange,
        }}
        pagination={{
          state: optimisticPaginationState,
          onPaginationChange: handlePaginationChange,
        }}
        search={{
          initialValue: searchFromUrl,
          placeholder: "Search title or director...",
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        filters={{
          configs: filterConfigs,
          values: filterValuesForTable,
          onFilterChange: handleFilterChange,
          onClearAll: clearAllFilters,
        }}
        toolbarAction={
          <div className="flex items-center gap-3">
            <Link href="/admin/media/create">
              <Button size="lg">
                <Plus />
                Add Media
              </Button>
            </Link>
         
          </div>
        }
        meta={meta}
        actions={{
          onEdit: (item) => router.push(`/admin/media/${item.id}`),
          onDelete: (item) => tableActions.onDelete(item),
        }}
      />

      <DeleteMediaDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteOpenChange}
        media={deletingItem}
      />
    </>
  );
};

export default MediaTable;