/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import { Button } from "@/components/ui/button";
import { adminCreateGenreBulk } from "@/src/service/admin.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Braces,  } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function GenreJsonAddDialog() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const { mutateAsync: createGenreBulk, isPending } =
    useMutation({
      mutationKey: ["genre-bulk-import"],
      mutationFn: (data: any) => adminCreateGenreBulk(data),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["admin-genres"]})
        setIsImportModalOpen(false);
        router.refresh()
        router.push("/admin/genres")
        toast.success("Genres imported successfully")
      },
      onError: (error:any) => {
        toast.error(error.message)
      }
    });


  return (
    <>
      <Button size={"lg"} onClick={() => setIsImportModalOpen(true)}>
        <Braces />
        Import JSON
      </Button>

    </>
  );
}