"use client";

import { Button } from "@/components/ui/button";
import { logoutAction } from "@/src/app/(commonLayout)/(authPages)/logOut/_action";

export const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await logoutAction();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      className="w-full justify-start"
    >
      Logout
    </Button>
  );
};
