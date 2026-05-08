"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Search,
  Film,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ILoginResponse } from "@/src/types/auth.types";

interface NavbarProps {
  user: ILoginResponse["user"];
}

const Navbar = ({ user }: NavbarProps) => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  // Common navigation handlers
  const handleLoginClick = () => {
    router.push("/login");
    setIsMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    router.push("/profile");
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
  
    router.push("/logOut"); 
  };

  const handleDashboardClick = () => {
    setIsMobileMenuOpen(false);
    router.push("/admin/dashboard");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Film className="h-6 w-6 text-primary" />
              <span className="xs:inline text-xl font-bold tracking-tight">
                Cinema Tube
              </span>
            </Link>
          </div>

          {/* Desktop Navigation (Center) */}
          <nav className="hidden md:flex flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/media" className={navigationMenuTriggerStyle()}>
                    Movies
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/" className={navigationMenuTriggerStyle()}>
                    TV Series
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/top-rated" className={navigationMenuTriggerStyle()}>
                    Top Rated
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Right Side Tools */}
          <div className="flex items-center gap-2 lg:gap-4">
            


            {/* User Dropdown (Desktop) */}
            <div className="hidden sm:block">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {user?.name?.split(" ")[0] || "User"}
                    </span>
                  </DropdownMenuTrigger>
                  
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel className="font-semibold">
                      {user?.name || "User"}
                      <p className="text-[10px] font-normal text-muted-foreground uppercase tracking-wider">{user?.role}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuGroup>
                      {/* Admin Logic */}
                      {user?.role === "ADMIN" && (
                        <DropdownMenuItem onClick={handleDashboardClick}>
                          <LayoutDashboard className="h-4 w-4 mr-2" />
                          Dashboard
                        </DropdownMenuItem>
                      )}
                      
                      {/* Customer/User Logic */}
                      <DropdownMenuItem onClick={handleProfileClick}>
                        <Settings className="h-4 w-4 mr-2" />
                        Profile
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="default" onClick={handleLoginClick} className="gap-2">
                  <User className="h-4 w-4" />
                  Login
                </Button>
              )}
            </div>

            {/* Mobile Hamburger Menu */}
            <Button
              className="md:hidden"
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>


        {/* Mobile Menu Content */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-6 border-t">
            <div className="flex flex-col space-y-2 pt-4">
              <Link href="/movies" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 hover:bg-accent rounded-md">Movies</Link>
              <Link href="/series" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 hover:bg-accent rounded-md">TV Series</Link>
              <Link href="/top-rated" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 hover:bg-accent rounded-md">Top Rated</Link>

              <div className="h-px bg-border my-2" />

              {user ? (
                <div className="flex flex-col space-y-1">
                  <div className="px-4 py-2">
                    <p className="font-bold text-sm">{user?.name}</p>
                    <p className="text-xs text-muted-foreground uppercase">{user?.role}</p>
                  </div>
                  
                  {user?.role === "ADMIN" && (
                    <button onClick={handleDashboardClick} className="text-left px-4 py-2 hover:bg-accent rounded-md flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </button>
                  )}
                  
                  <button onClick={handleProfileClick} className="text-left px-4 py-2 hover:bg-accent rounded-md flex items-center gap-2">
                    <Settings className="h-4 w-4" /> Profile
                  </button>
                  
                  <button onClick={handleLogout} className="text-left px-4 py-2 hover:bg-accent rounded-md flex items-center gap-2 text-destructive">
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              ) : (
                <button onClick={handleLoginClick} className="mx-4 mt-2 bg-primary text-primary-foreground py-2 rounded-md font-medium">
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;