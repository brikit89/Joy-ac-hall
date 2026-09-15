import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

interface HeaderProps {
  navLinks: NavLink[];

  bookingUrl: string;
  bookingLabel?: string;

  logo?: string;
  logoAlt?: string;
  scrolledLogo?: string;

  onNavigate?: (sectionId: string) => void;
}

const Header = ({
  navLinks,
  bookingUrl,
  bookingLabel = "Book Now",
  logo = "/logo.png",
  logoAlt,
  scrolledLogo = "/logo-coloured.png",
  onNavigate,
}: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 50);

      for (const link of navLinks) {
        const element = document.getElementById(link.id);

        if (!element) continue;

        const rect = element.getBoundingClientRect();

        if (rect.top <= 200 && rect.bottom >= 200) {
          setActiveSection(link.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navLinks]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }

    setMobileMenuOpen(false);

    onNavigate?.(sectionId);
  };

  const navigate = useNavigate();
  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        headerScrolled
          ? "bg-white shadow-lg"
          : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">

          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-start hover:opacity-80 transition-opacity self-start"
            aria-label="Go to home"
          >
            <img
              src={headerScrolled ? scrolledLogo : logo}
              alt={logoAlt}
              className="h-32 w-auto max-w-full"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  if (link.id === "home") {
                    navigate("/");
                  } else {
                    scrollToSection(link.id);
                  }
                }}
                className={`text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? headerScrolled
                      ? "text-primary"
                      : "text-white"
                    : headerScrolled
                    ? "text-gray-700 hover:text-primary"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Booking Button */}
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:block"
          >
            <Button
              className={`transition-all ${
                headerScrolled
                  ? "bg-primary hover:bg-primary/90"
                  : "bg-white text-primary hover:bg-gray-100"
              }`}
            >
              {bookingLabel}
            </Button>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={`lg:hidden transition-colors ${
              headerScrolled ? "text-primary" : "text-white"
            }`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav
            className={`lg:hidden pb-6 border-t transition-colors ${
              headerScrolled
                ? "border-gray-200 bg-white"
                : "border-white/20 bg-black/40 backdrop-blur-sm"
            }`}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  if (link.id === "home") {
                    navigate("/");
                  } else {
                    scrollToSection(link.id);
                  }
                }}
                className={`block w-full text-left py-3 px-4 transition-colors font-medium ${
                  headerScrolled
                    ? "text-gray-700 hover:text-primary hover:bg-gray-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Mobile Booking Button */}
            <div className="px-4 mt-4">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  className={`w-full h-12 transition-all font-semibold ${
                    headerScrolled
                      ? "bg-primary hover:bg-primary/90 text-white"
                      : "bg-white text-primary hover:bg-gray-100"
                  }`}
                >
                  {bookingLabel}
                </Button>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;