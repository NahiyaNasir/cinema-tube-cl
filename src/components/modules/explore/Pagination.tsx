import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
};

export default function Pagination({
  page,
  totalPages,
  buildHref,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "ellipsis")[] = [];
  const window = 1;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= page - window && i <= page + window)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "ellipsis") {
      pages.push("ellipsis");
    }
  }

  const arrowBase =
    "flex items-center justify-center size-10 rounded-full border transition-all shrink-0";
  const arrowActive =
    "border-white/10 text-gray-300 hover:border-primary/50 hover:text-primary hover:bg-primary/10 active:scale-95";
  const arrowDisabled =
    "border-white/5 text-gray-700 pointer-events-none";

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col items-center gap-3 mt-12"
    >
      <div className="flex items-center gap-2">
        <a
          href={page > 1 ? buildHref(page - 1) : undefined}
          aria-disabled={page <= 1}
          aria-label="Previous page"
          className={`${arrowBase} ${page <= 1 ? arrowDisabled : arrowActive}`}
        >
          <ChevronLeft className="size-4" />
        </a>

        <div className="flex items-center gap-1.5">
          {pages.map((p, idx) =>
            p === "ellipsis" ? (
              <span
                key={`ellipsis-${idx}`}
                className="w-10 text-center text-gray-600 select-none"
              >
                ⋯
              </span>
            ) : (
              <a
                key={p}
                href={buildHref(p)}
                aria-current={p === page ? "page" : undefined}
                className={`relative flex items-center justify-center size-10 rounded-full text-sm font-semibold transition-all ${
                  p === page
                    ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                    : "text-gray-400 border border-white/10 hover:border-primary/40 hover:text-primary hover:bg-primary/10"
                }`}
              >
                {p}
              </a>
            ),
          )}
        </div>

        <a
          href={page < totalPages ? buildHref(page + 1) : undefined}
          aria-disabled={page >= totalPages}
          aria-label="Next page"
          className={`${arrowBase} ${
            page >= totalPages ? arrowDisabled : arrowActive
          }`}
        >
          <ChevronRight className="size-4" />
        </a>
      </div>

      <p className="text-xs text-gray-500 tracking-wide">
        Page <span className="text-gray-300 font-medium">{page}</span> of{" "}
        <span className="text-gray-300 font-medium">{totalPages}</span>
      </p>
    </nav>
  );
}