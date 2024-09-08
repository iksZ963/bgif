import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Home from './Home';
import GifList from './GifList';
import UploadGif from './UploadGif';
import { Menu, X, Search, LogIn, UserPlus } from 'lucide-react'
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from "../lib/utils";

interface NavItem {
    label: string
    to: string
    element: React.FC
}

const navItems: NavItem[] = [
    { label: 'Home', to: '/' , element: Home},
    { label: 'Gifs', to: '/gifs' , element: GifList},
    { label: 'Upload', to: '/upload' , element: UploadGif},
]

const NavLink: React.FC<NavItem & { onClick?: () => void }> = ({ label, to, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            onClick={onClick}
            className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive
                    ? "text-primary"
                    : "text-muted-foreground"
            )}
        >
            {label}
        </Link>
    );
};

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Implement search functionality here
        console.log("Search submitted:", searchQuery);
    }

    return (
        <Router>
            <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center">
                    <div className="mr-4 hidden md:flex">
                        <Link to="/" className="mr-6 flex items-center space-x-2">
                            <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="hidden font-bold sm:inline-block text-primary">BGif</span>
                        </Link>
                        <nav className="flex items-center space-x-6 text-sm font-medium">
                            {navItems.map((item) => (
                                <NavLink key={item.to} {...item} />
                            ))}
                        </nav>
                    </div>
                    <Button
                        className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? (
                            <X className="h-4 w-4" />
                        ) : (
                            <Menu className="h-4 w-4" />
                        )}
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                        <form onSubmit={handleSearch} className="w-full md:w-auto md:flex-1 md:ml-auto">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search gifs..."
                                    className="pl-8 md:w-[300px] lg:w-[400px]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </form>
                        <nav className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" className="hidden md:flex">
                                <LogIn className="mr-2 h-4 w-4" />
                                Sign In
                            </Button>
                            <Button size="sm" className="hidden md:flex">
                                <UserPlus className="mr-2 h-4 w-4" />
                                Sign Up
                            </Button>
                        </nav>
                    </div>
                </div>
            </nav>
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
                    <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-background p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-8">
                            <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="font-bold text-primary">BGif</span>
                            </Link>
                            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                                <X className="h-4 w-4" />
                                <span className="sr-only">Close</span>
                            </Button>
                        </div>
                        <nav className="flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <NavLink key={item.to} {...item} onClick={() => setIsOpen(false)} />
                            ))}
                        </nav>
                        <div className="mt-8 space-y-4">
                            <Button variant="ghost" className="w-full justify-start" size="sm">
                                <LogIn className="mr-2 h-4 w-4" />
                                Sign In
                            </Button>
                            <Button className="w-full justify-start" size="sm">
                                <UserPlus className="mr-2 h-4 w-4" />
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            <main className="container py-6">
                <Routes>
                    {navItems.map((item) => (
                        <Route key={item.to} path={item.to} element={<item.element />} />
                    ))}
                </Routes>
            </main>
        </Router>
    );
};

export default Navbar;