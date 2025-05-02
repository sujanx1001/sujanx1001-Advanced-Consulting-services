
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, User, LogOut, Bell, Search } from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for navbar styling
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${
      isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container flex h-16 items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="hidden md:flex w-8 h-8 bg-cause rounded-full items-center justify-center">
            <span className="text-white font-bold">SC</span>
          </div>
          <span className="font-bold text-xl text-cause-dark">SocialAwareConnect</span>
        </Link>

        {/* Center Nav - Desktop Only */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-cause transition-colors">
            Home
          </Link>
          <Link to="/campaigns" className="text-foreground hover:text-cause transition-colors">
            Campaigns
          </Link>
          <Link to="/businesses" className="text-foreground hover:text-cause transition-colors">
            Businesses
          </Link>
          <Link to="/about" className="text-foreground hover:text-cause transition-colors">
            About
          </Link>
        </nav>

        {/* Right side - Auth & Actions */}
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {isAuthenticated ? (
            <>
              <Button variant="outline" size="icon" className="hidden sm:flex relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full"></span>
                <span className="sr-only">Notifications</span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar || '/placeholder.svg'} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                  <DropdownMenuItem 
                    onClick={() => navigate('/dashboard')}
                    className="cursor-pointer"
                  >
                    Dashboard
                  </DropdownMenuItem>
                  {user?.role === 'admin' && (
                    <DropdownMenuItem 
                      onClick={() => navigate('/admin')}
                      className="cursor-pointer"
                    >
                      Admin Panel
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden sm:flex space-x-2">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Log in
              </Button>
              <Button onClick={() => navigate('/register')}>Sign up</Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>SocialAwareConnect</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-6">
                <Link to="/" className="text-lg font-semibold">
                  Home
                </Link>
                <Link to="/campaigns" className="text-lg font-semibold">
                  Campaigns
                </Link>
                <Link to="/businesses" className="text-lg font-semibold">
                  Businesses
                </Link>
                <Link to="/about" className="text-lg font-semibold">
                  About
                </Link>

                {isAuthenticated ? (
                  <>
                    <div className="h-px bg-border my-2" />
                    <div className="flex items-center gap-3 py-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.avatar || '/placeholder.svg'} alt={user?.name} />
                        <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-0.5">
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="flex items-center justify-start gap-2"
                      onClick={() => navigate('/dashboard')}
                    >
                      <User className="w-4 h-4" />
                      Dashboard
                    </Button>
                    {user?.role === 'admin' && (
                      <Button 
                        variant="outline" 
                        className="flex items-center justify-start gap-2"
                        onClick={() => navigate('/admin')}
                      >
                        Admin Panel
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      className="flex items-center justify-start gap-2"
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="h-px bg-border my-2" />
                    <Button onClick={() => navigate('/login')}>Log in</Button>
                    <Button variant="outline" onClick={() => navigate('/register')}>
                      Sign up
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
