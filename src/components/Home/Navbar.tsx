"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Film, Menu, X, User, Settings, LogOut } from "lucide-react";
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 py-0">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Film className="h-6 w-6 text-primary" />
              <span className="xs:inline text-xl font-bold tracking-tight">
                Cinema Tube 
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/movies" className={navigationMenuTriggerStyle()}>
                    Movies
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/series" className={navigationMenuTriggerStyle()}>
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

          {/* Right Side */}
          <div className="flex items-center gap-2 lg:gap-4">

            {/* Desktop Search */}
            <div className="relative hidden lg:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search movies..."
                className="w-50 rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:w-75"
              />
            </div>

            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* User Dropdown / Login */}
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
                
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="font-semibold">
                        {user?.name || "User"}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleProfileClick}>
                        <Settings className="h-4 w-4 mr-2" />
                        Profile
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                    href="/login"
                  className="flex items-center gap-2"
                  onClick={handleLoginClick}
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              className="md:hidden"
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search movies..."
                className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t">
            <div className="flex flex-col space-y-2 pt-4">
              <button
                onClick={() => { router.push("/movies"); setIsMobileMenuOpen(false); }}
                className="text-left px-4 py-2 hover:bg-accent rounded-md transition-colors"
              >
                Movies
              </button>
              <button
                onClick={() => { router.push("/series"); setIsMobileMenuOpen(false); }}
                className="text-left px-4 py-2 hover:bg-accent rounded-md transition-colors"
              >
                TV Series
              </button>
              <button
                onClick={() => { router.push("/top-rated"); setIsMobileMenuOpen(false); }}
                className="text-left px-4 py-2 hover:bg-accent rounded-md transition-colors"
              >
                Top Rated
              </button>

              <div className="h-px bg-border my-2" />

              {user ? (
                <>
                  <div className="px-4 py-2">
                    <p className="font-semibold text-sm">{user?.name || "User"}</p>
                  </div>
                  <button
                    onClick={handleProfileClick}
                    className="text-left px-4 py-2 hover:bg-accent rounded-md transition-colors flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-left px-4 py-2 hover:bg-accent rounded-md transition-colors flex items-center gap-2 text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="text-left px-4 py-2 hover:bg-accent rounded-md transition-colors flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
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