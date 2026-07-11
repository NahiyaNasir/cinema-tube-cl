"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const SORT_OPTIONS = [
  { label: "Newest", sortBy: "createdAt", sortOrder: "desc" },
  { label: "Oldest", sortBy: "createdAt", sortOrder: "asc" },
  { label: "Highest Rated", sortBy: "avgRating", sortOrder: "desc" },
  { label: "Release Year (Newest)", sortBy: "releaseYear", sortOrder: "desc" },
  { label: "Release Year (Oldest)", sortBy: "releaseYear", sortOrder: "asc" },
  { label: "Title (A–Z)", sortBy: "title", sortOrder: "asc" },
];

export default function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSortBy = searchParams.get("sortBy") || "createdAt";
  const currentSortOrder = searchParams.get("sortOrder") || "desc";
  const currentValue =
    SORT_OPTIONS.findIndex(
      (o) => o.sortBy === currentSortBy && o.sortOrder === currentSortOrder,
    ) !== -1
      ? `${currentSortBy}:${currentSortOrder}`
      : `${SORT_OPTIONS[0].sortBy}:${SORT_OPTIONS[0].sortOrder}`;

  const handleChange = (value: string) => {
    const [sortBy, sortOrder] = value.split(":");
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      value={currentValue}
      onChange={(e) => handleChange(e.target.value)}
      className="bg-white/5 border border-white/10 text-gray-300 text-sm font-medium rounded-lg px-4 py-2 outline-none focus:border-primary/50 cursor-pointer"
    >
      {SORT_OPTIONS.map((opt) => (
        <option
          key={`${opt.sortBy}:${opt.sortOrder}`}
          value={`${opt.sortBy}:${opt.sortOrder}`}
          className="bg-neutral-900"
        >
          {opt.label}
        </option>
      ))}
    </select>
  );
}