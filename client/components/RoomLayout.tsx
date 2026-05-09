import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Phone as PhoneIcon,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavLink {
  id: string;
  label: string;
}

const navLinks: NavLink[] = [
  { id: "about", label: "Gallery" },
  { id: "features", label: "Features" },
  { id: "amenities", label: "Amenities" },
  { id: "attractions", label: "Attractions" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

interface RoomLayoutProps {
  children: ReactNode;
}

export const RoomLayout = ({ children }: RoomLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 50);

      for (const link of navLinks) {
        const element = document.getElementById(link.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-16 lg:pb-0">
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          headerScrolled
            ? "bg-white shadow-lg"
            : "bg-gradient-to-b from-black/60 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              aria-label="Back to home"
            >
              <img
                src={headerScrolled ? "/logo-coloured.png" : "/logo.png"}
                alt="Joy AC Hall Logo"
                className="h-20 w-auto max-w-full"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  headerScrolled
                    ? "text-gray-700 hover:text-primary"
                    : "text-white/90 hover:text-white"
                }`}
              >
                Home
              </Link>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
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

            <Button
              onClick={() => scrollToSection("contact")}
              className={`hidden lg:block transition-all ${
                headerScrolled
                  ? "bg-primary hover:bg-primary/90"
                  : "bg-white text-primary hover:bg-gray-100"
              }`}
            >
              Book Now
            </Button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden transition-colors ${
                headerScrolled ? "text-primary" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <nav
              className={`lg:hidden pb-6 border-t transition-colors ${
                headerScrolled
                  ? "border-gray-200 bg-white"
                  : "border-white/20 bg-black/40 backdrop-blur-sm"
              }`}
            >
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left py-3 px-4 transition-colors font-medium ${
                  headerScrolled
                    ? "text-gray-700 hover:text-primary hover:bg-gray-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                Home
              </Link>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full text-left py-3 px-4 transition-colors font-medium ${
                    headerScrolled
                      ? "text-gray-700 hover:text-primary hover:bg-gray-50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="px-4 mt-4">
                <Button
                  onClick={() => scrollToSection("contact")}
                  className={`w-full h-12 transition-all font-semibold ${
                    headerScrolled
                      ? "bg-primary hover:bg-primary/90 text-white"
                      : "bg-white text-primary hover:bg-gray-100"
                  }`}
                >
                  Book Now
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {children}

      {/* Mobile Sticky Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden z-40 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex h-16 w-full max-w-full">
          <a
            href="tel:+918122445538"
            className="flex-1 flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-semibold transition-colors border-r border-gray-100"
            aria-label="Call Now"
          >
            <PhoneIcon size={20} className="mr-2" />
            <span className="text-sm">Call</span>
          </a>
          <a
            href="https://wa.me/918122445538"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
            aria-label="WhatsApp Booking"
          >
            <MessageCircle size={20} className="mr-2" />
            <span className="text-sm">WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Desktop Floating Buttons */}
      <div className="fixed bottom-8 right-4 flex flex-col gap-4 hidden lg:flex z-40">
        <a
          href="tel:+918122445538"
          className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
          aria-label="Call"
        >
          <PhoneIcon size={20} />
        </a>
        <a
          href="https://wa.me/918122445538"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-colors"
          aria-label="WhatsApp"
        >
          <MessageCircle size={20} />
        </a>
      </div>
    </div>
  );
};
