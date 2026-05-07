import MediaListClient from "@/src/components/modules/Admin/media/mediaClient";

export const dynamic = "force-dynamic";


export const metadata = {
  title: "Media Library | CT Admin",
  description: "Manage all movies, series, and media content.",
};

export default function AdminMediaPage() {
  return <MediaListClient />;
}