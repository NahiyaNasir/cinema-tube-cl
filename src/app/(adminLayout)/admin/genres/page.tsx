export const dynamic = 'force-dynamic'



import { GenresClient } from "@/src/components/modules/Admin/geners/genersTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CT | Admin Genres",
  description: "Manage media genres for discovery and filtering.",
};

export default function GenresPage() {
  return <GenresClient />;
}