"use client"

import { useEffect, useState } from "react";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";

type AppUser = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
};

const Navbar = ({ user }: { user?: AppUser | null }) => {
// const Navbar = ({ user }: { user: AppUser | null }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hideNav, setHideNav] = useState(false);
    const location = usePathname();
    const isMainAdmin = location.includes('/admin');


    const isActive = (path: string) => location === path;

    useEffect(() => {
        if (isMainAdmin) {
            setHideNav(true);
        }
        else {
            setHideNav(false);
        }
    }, [isMainAdmin]);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Cart", path: "/cart" },
    ];

    return (
        <nav className={`border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/80 ${hideNav ? "hidden" : "block"}`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-sm">LM</span>
                        </div>
                        <span className="text-xl font-bold text-foreground">LifeStyle Mart</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className={`font-medium transition-colors duration-200 ${isActive(link.path)
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ?
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 p-0">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="" alt="User profile" />
                                            <AvatarFallback>LM</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 z-50">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile">Manage my account</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile/orders">My orders</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile/wishlist">Wishlist</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile/settings">Settings</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={
                                        () => signOut()
                                    }>
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu> :
                            <Link href="/login">
                                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                                    <User className="w-4 h-4" />
                                    <span>Login</span>
                                </Button>
                            </Link>
                        }


                        <Link href="/cart">
                            <Button variant="outline" size="sm" className="flex items-center space-x-2">
                                <ShoppingCart className="w-4 h-4" />
                                <span className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                                    0
                                </span>
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.path}
                                    className={`font-medium transition-colors duration-200 ${isActive(link.path)
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                        }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex items-center space-x-4 pt-4 border-t border-border">
                                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                                    <User className="w-4 h-4" />
                                    <span>Login</span>
                                </Button>
                                <Link href="/cart">
                                    <Button variant="outline" size="sm" className="flex items-center space-x-2">
                                        <ShoppingCart className="w-4 h-4" />
                                        <span className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                                            0
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;