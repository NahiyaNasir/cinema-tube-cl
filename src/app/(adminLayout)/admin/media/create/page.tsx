import MediaForm from "@/src/components/modules/Admin/media/mediaFrom";

export const dynamic = 'force-dynamic'



export const metadata = {
  title: "Add New Media | CT Admin",
  description: "Add a new movie or series to the library.",
};

export default function NewMediaPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl tracking-tight">Add New Media</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Create a new movie, series, or other content entry.
          </p>
        </div>

      </div>

      <MediaForm initialData={{}} />
    </div>
  );
}