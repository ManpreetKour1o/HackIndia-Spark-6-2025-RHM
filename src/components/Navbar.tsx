
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import AnimatedButton from "@/components/AnimatedButton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, User, LogOut } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Skin Analysis", path: "/skin-analysis" },
    { name: "Products", path: "/products" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link
          to={user ? "/dashboard" : "/"}
          className="flex items-center space-x-2 font-bold text-2xl text-primary"
        >
          <span className="animate-float">✨</span>
          <span>GlowGenius</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {user && (
            <>
              <nav className="flex items-center space-x-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname === link.path
                        ? "text-primary font-semibold"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <AnimatedButton
                variant="outline"
                size="sm"
                className="border-primary/20 text-primary hover:bg-primary/10"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </AnimatedButton>
            </>
          )}

          {!user && (
            <AnimatedButton
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              <User className="mr-2 h-4 w-4" />
              Log In
            </AnimatedButton>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-primary">GlowGenius</SheetTitle>
                <SheetDescription>Your skincare companion</SheetDescription>
              </SheetHeader>
              <div className="mt-8 flex flex-col space-y-4">
                {user && (
                  <>
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`py-2 px-4 rounded-md transition-colors ${
                          location.pathname === link.path
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                    <Button
                      variant="outline"
                      className="mt-4 border-primary/20 text-primary hover:bg-primary/10"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </Button>
                  </>
                )}
                {!user && (
                  <Button
                    onClick={() => navigate("/")}
                    className="w-full bg-gradient-to-r from-primary to-accent"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Log In
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
