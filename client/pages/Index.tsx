import { useState, useEffect } from "react";
import {
  Menu,
  X,
  MapPin,
  ChevronDown,
  Star,
  Wifi,
  Droplets,
  Shield,
  ParkingSquare,
  UtensilsCrossed,
  Wind,
  Tv,
  Coffee,
  Thermometer,
  Mic2,
  Bus,
  Facebook,
  Instagram,
  Youtube,
  Phone as PhoneIcon,
  MessageCircle,
  Clock,
  Users,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { GoogleReviews } from "@/components/GoogleReviews";
import faqsData from "@/data/faqs.json";
import attractionsData from "@/data/attractions.json";
import siteConfig from "@/data/site.json";

interface NavLink {
  id: string;
  label: string;
  href: string;
}

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [currentRoomImageIndex, setCurrentRoomImageIndex] = useState(0);

  const navLinks: NavLink[] = [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "rooms", label: "Rooms", href: "#rooms" },
    { id: "amenities", label: "Amenities", href: "#amenities" },
    { id: "attractions", label: "Attractions", href: "#attractions" },
    { id: "faq", label: "FAQ", href: "#faq" },
  ];

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

  // Hero images array
  const heroImages = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&h=900&fit=crop",
  ];

  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const heroVideo = "https://cdn.builder.io/o/assets%2F9ab187ea44d746dabf821e39227b5937%2Fa1335934641e4b4ebce173b7ca108902?alt=media&token=66214e13-9c6d-4e26-806c-c914f6ce775b&apiKey=9ab187ea44d746dabf821e39227b5937";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentRoomImageIndex(0);
  }, [selectedRoom]);

  // Rooms data
  const rooms = [
    {
      id: 2,
      name: "Family Deluxe Room",
      route: "/rooms/family-deluxe-room",
      capacity: "8 persons",
      price: "Rs. 3,600",
      priceType: "per room",
      features: ["AC / Non-AC available", "Attached bathroom", "Family comfort"],
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F9ab187ea44d746dabf821e39227b5937%2Fa868046a47434959ae400cccb9334e5f",
      sliderImages: [
        "https://cdn.builder.io/api/v1/image/assets%2F9ab187ea44d746dabf821e39227b5937%2Fa868046a47434959ae400cccb9334e5f",
        "https://cdn.builder.io/api/v1/image/assets%2F9ab187ea44d746dabf821e39227b5937%2F850d5c09120b49b591e3d1794b7b6152",
        "https://cdn.builder.io/api/v1/image/assets%2F9ab187ea44d746dabf821e39227b5937%2F25a1e4ad5c244c33b09c258c12ddee9d",
        "https://cdn.builder.io/api/v1/image/assets%2F9ab187ea44d746dabf821e39227b5937%2F900edb8e5d2940ddbf03b0ca8b36ef59",
      ],
      sliderVideos: [
        "https://cdn.builder.io/o/assets%2F9ab187ea44d746dabf821e39227b5937%2Fbf0bf71d75da4c7f921170e18da96927%2Fcompressed?apiKey=9ab187ea44d746dabf821e39227b5937&token=bf0bf71d75da4c7f921170e18da96927&alt=media&optimized=true",
        "https://cdn.builder.io/o/assets%2F9ab187ea44d746dabf821e39227b5937%2Fc5ed09529210485fa74fbb8528e046f9%2Fcompressed?apiKey=9ab187ea44d746dabf821e39227b5937&token=c5ed09529210485fa74fbb8528e046f9&alt=media&optimized=true",
      ],
      roomTypes: ["AC Family Room", "Non-AC Family Room"],
    },
    {
      id: 3,
      name: "Double Room",
      route: "/rooms/double-room",
      capacity: "4 persons",
      price: "Rs. 2,000",
      priceType: "per room",
      features: ["AC / Non-AC available", "Electric kettle", "Wardrobe"],
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F9ab187ea44d746dabf821e39227b5937%2Ffbcf8d3ad06549ea92bdc5081361a8a5",
      sliderImages: [
        "https://cdn.builder.io/api/v1/image/assets%2F9ab187ea44d746dabf821e39227b5937%2Ffbcf8d3ad06549ea92bdc5081361a8a5",
        "https://cdn.builder.io/api/v1/image/assets%2F9ab187ea44d746dabf821e39227b5937%2F9ea134dd255344f09e2f2f1e3d2a0fea",
        "https://cdn.builder.io/api/v1/image/assets%2F9ab187ea44d746dabf821e39227b5937%2F1b81c2bf85ba4a4796db83571f7334a0",
      ],
      sliderVideos: [
        "https://cdn.builder.io/o/assets%2F9ab187ea44d746dabf821e39227b5937%2F7443dbf4ae5649ec834da0899d60ae16%2Fcompressed?apiKey=9ab187ea44d746dabf821e39227b5937&token=7443dbf4ae5649ec834da0899d60ae16&alt=media&optimized=true",
      ],
      roomTypes: ["AC Double Room", "Non-AC Double Room"],
    },
    {
      id: 1,
      name: "Dormitory Hall",
      route: "/rooms/dormitory-hall",
      capacity: "30–50 persons",
      price: "Rs. 250",
      priceType: "per person",
      features: [
        "AC / Non-AC available",
        "4 Shared Bathrooms",
        "Best for pilgrimage groups",
      ],
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F9ab187ea44d746dabf821e39227b5937%2Fd10d1e1d85c1408c982f58841ec64b68",
      sliderImages: [
        "https://cdn.builder.io/api/v1/image/assets%2F9ab187ea44d746dabf821e39227b5937%2Fd10d1e1d85c1408c982f58841ec64b68",
        "https://cdn.builder.io/api/v1/image/assets%2F9ab187ea44d746dabf821e39227b5937%2F16885125ed994845879d07da56b0e6b5",
        "https://cdn.builder.io/api/v1/image/assets%2F9ab187ea44d746dabf821e39227b5937%2Ff1ae1ed1b3ea4895bd238dcbbd942ef5",
      ],
      sliderVideos: [],
      roomTypes: ["AC Dormitory", "Non-AC Dormitory"],
    },
  ];

  // Amenities data
  const amenities = [
    { icon: Wifi, label: "WiFi" },
    { icon: Wind, label: "AC Rooms" },
    { icon: Droplets, label: "RO Drinking Water" },
    { icon: Shield, label: "CCTV Security" },
    { icon: ParkingSquare, label: "Free Parking" },
    { icon: UtensilsCrossed, label: "Dining Area" },
    { icon: Coffee, label: "Kitchen Space" },
    { icon: UtensilsCrossed, label: "Cooking Vessels" },
    { icon: Mic2, label: "Speakers & Mic" },
    { icon: Thermometer, label: "Hot Water" },
    { icon: Coffee, label: "Electric Kettle" },
    { icon: Tv, label: "TV in Rooms" },
    { icon: Bus, label: "Bus Parking" },
    { icon: Shield, label: "24/7 Security" },
  ];

  // Attractions sourced from CMS-managed JSON
  const attractions = attractionsData.items;

  // FAQs sourced from CMS-managed JSON
  const faqs = faqsData.items;

  // Trust signals data
  const trustSignals = [
    {
      icon: Users,
      title: "Ideal for Large Groups",
      description:
        "Dormitory halls accommodating 30–50 people perfect for school tours and pilgrimage groups.",
    },
    {
      icon: MapPin,
      title: "Prime Location in Rameswaram",
      description:
        "Located on the National Highway with easy access to Ramanathaswamy Temple and tourist sites.",
    },
    {
      icon: CheckCircle,
      title: "Pilgrim Friendly Facilities",
      description:
        "Dining area, kitchen space, hot water and large dormitories designed for group comfort.",
    },
    {
      icon: Shield,
      title: "Safe and Comfortable Stay",
      description:
        "CCTV security, hygienic bathrooms and clean accommodation for peace of mind.",
    },
  ];

  // Nearby landmarks SEO sections
  const nearbyLandmarks = [
    {
      title: "Rooms near Ramanathaswamy Temple",
      description:
        "Stay at Joy AC Hall & Rooms, just 8.4 km from the sacred Ramanathaswamy Temple. Perfect accommodation for pilgrims visiting one of the 12 Jyotirlingas.",
    },
    {
      title: "Accommodation near Pamban Bridge",
      description:
        "Book dormitory or rooms near Pamban Bridge in Rameswaram. Just 5.7 km away, ideal for tourists exploring this historic bridge.",
    },
    {
      title: "Rooms near Dr APJ Abdul Kalam Memorial",
      description:
        "Stay close to Dr APJ Abdul Kalam Memorial at Joy AC Hall & Rooms. Only 2.8 km away, perfect for visitors honoring this great scientist.",
    },
    {
      title: "Group stay near Dhanushkodi Beach",
      description:
        "Book group accommodation near Dhanushkodi Beach. Just 19 km from our property, ideal for group tours and beach visits.",
    },
    {
      title: "Budget dormitory in Rameswaram",
      description:
        "Affordable dormitory accommodation starting from Rs. 250 per person. Best budget option for large groups and pilgrims in Rameswaram.",
    },
  ];

  // FAQ Schema Markup for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  useDocumentMeta({
    title: "Joy AC Hall & Rooms — Family Rooms & Group Stay Dormitory in Rameswaram",
    description:
      "Budget AC dormitory and family rooms in Rameswaram near Ramanathaswamy Temple, Pamban Bridge & Dr APJ Abdul Kalam Memorial. Group stay for pilgrimage tours, school tours and families. Book direct: +91 81224 45538.",
    canonical: "https://joyachall.com/",
    ogImage:
      "https://cdn.builder.io/api/v1/image/assets%2F9ab187ea44d746dabf821e39227b5937%2F6cb03dfcf88d421e94c4b20dd13e32b3?format=webp&width=1200",
    keywords:
      "dormitory in Rameswaram, group stay Rameswaram, AC rooms Rameswaram, accommodation near Ramanathaswamy Temple, lodge near Pamban Bridge, pilgrimage stay Rameswaram, family rooms Rameswaram, budget hotel Rameswaram",
    jsonLd: [faqSchema],
  });

  return (
    <div className="min-h-screen bg-white pb-16 lg:pb-0">

      {/* Sticky Header */}
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          headerScrolled
            ? "bg-white shadow-lg"
            : "bg-gradient-to-b from-black/60 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img
                src={headerScrolled ? "/logo-coloured.png" : "/logo.png"}
                alt="Joy AC Hall Logo"
                className="h-20 w-auto max-w-full"
              />
            </button>

            <nav className="hidden lg:flex items-center gap-8">
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

            <a
              href="https://wa.me/918122445538"
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
                Book Group Stay
              </Button>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden transition-colors ${
                headerScrolled ? "text-primary" : "text-white"
              }`}
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
                <a
                  href="https://wa.me/918122445538"
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
                    Book Group Stay
                  </Button>
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section - Video with Image Fallback */}
      <section id="home" className="relative h-screen sm:min-h-[70vh] md:h-screen overflow-hidden pt-24">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
            {/* Fallback to image slider if video fails */}
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/50" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto w-full animate-fadeInUp flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg leading-tight max-w-4xl">
              {siteConfig.heroTitle}
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl drop-shadow-md">
              {siteConfig.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/918122445538"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                >
                  Check Group Rates
                </Button>
              </a>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/20 border-white text-white hover:bg-white/30"
                onClick={() => scrollToSection("rooms")}
              >
                Explore Stay Options
              </Button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 animate-pulse-slow">
            <ChevronDown className="w-8 h-8 text-white" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-in fade-in duration-1000">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F9ab187ea44d746dabf821e39227b5937%2F6cb03dfcf88d421e94c4b20dd13e32b3"
                alt="Joy AC Hall & Rooms Rameswaram"
                loading="lazy"
                decoding="async"
                className="rounded-lg shadow-lg w-full max-w-full h-auto object-cover"
              />
            </div>
            <div className="animate-in fade-in duration-1000">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Welcome to Joy AC Hall & Rooms
              </h2>
              <div className="w-20 h-1 bg-accent rounded-full mb-6" />
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Joy AC Hall & Rooms offers spacious dormitory and room
                accommodation for travelers visiting the sacred island of
                Rameswaram. Perfect <strong>dormitory in Rameswaram</strong> for
                pilgrimage groups, school tours, family travelers, and tourist
                groups exploring Pamban Bridge and Dhanushkodi.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Dormitory in Rameswaram</strong> - Perfect for groups
                    and pilgrims
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Group stay in Rameswaram</strong> - Specialized group
                    accommodations
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Accommodation near Ramanathaswamy Temple</strong> - Just
                    8.4 km away
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            Accommodation Options
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-6" />
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Choose from budget-friendly dormitory rooms or comfortable family and
            double rooms near Ramanathaswamy Temple and Pamban Bridge.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map((room: any) => (
              <div
                key={room.id}
                className="card-hover rounded-lg overflow-hidden shadow-md border border-gray-100 bg-white"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={room.image}
                    alt={room.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    {room.name}
                  </h3>
                  <p className="text-gray-600 font-medium text-sm mb-3">{room.capacity}</p>
                  <p className="mb-4">
                    <span className="text-2xl font-bold text-accent">{room.price}</span>{" "}
                    <span className="text-sm font-normal text-gray-600">
                      {room.priceType}
                    </span>
                  </p>
                  <ul className="space-y-2 mb-6">
                    {room.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="text-accent">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to={room.route} className="block">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      View Room Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            Facilities & Amenities
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-6" />
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Our dormitory and rooms are equipped with essential amenities to ensure
            a comfortable stay near Ramanathaswamy Temple.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {amenities.map((amenity, idx) => {
              const Icon = amenity.icon;
              return (
                <div
                  key={idx}
                  className="group bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-[calc(50%-0.75rem)] sm:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)]"
                >
                  <div className="flex justify-center mb-3">
                    <Icon className="w-10 h-10 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <p className="text-gray-700 font-medium">{amenity.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Attractions Section */}
      <section id="attractions" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            Explore Rameswaram Island
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-6" />
          <p className="text-center text-gray-600 mb-4">
            All major Rameswaram attractions are easily accessible from Joy AC
            Hall & Dormitory located on the National Highway.
          </p>
          <p className="text-center text-sm text-gray-500 mb-16">
            Distance, travel time, and visitor hours from our property
          </p>

          <div className="flex flex-wrap justify-center gap-8">
            {attractions.map((attraction, idx) => (
              <div key={idx} className="card-hover rounded-lg overflow-hidden shadow-md bg-white w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]">
                <div className="relative h-40 overflow-hidden bg-gray-100">
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {attraction.name}
                  </h3>
                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} className="text-accent" />
                      <span>{attraction.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} className="text-accent" />
                      <span>{attraction.travelTime}</span>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-accent mb-2">
                    Visitor Hours: {attraction.visitorTime}
                  </p>
                  <p className="text-gray-700 text-sm">{attraction.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Social Proof Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            Why Guests Choose Joy AC Hall & Rooms
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-12" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustSignals.map((signal, idx) => {
              const Icon = signal.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center border border-gray-100"
                >
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">
                    {signal.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{signal.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <GoogleReviews background="gray" />


      {/* Nearby Landmarks SEO Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            Stay Near Major Landmarks in Rameswaram
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-12" />

          <div className="flex flex-wrap justify-center gap-8">
            {nearbyLandmarks.map((landmark, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all w-full md:w-[calc(50%-1rem)]"
              >
                <h3 className="text-xl font-bold text-primary mb-3">
                  {landmark.title}
                </h3>
                <p className="text-gray-700">{landmark.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-12" />

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="border border-gray-200 rounded-lg px-6 bg-white"
              >
                <AccordionTrigger className="text-lg font-semibold text-primary hover:text-primary/90">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h4 className="text-xl font-bold mb-4">
                About Joy AC Hall & Rooms
              </h4>
              <p className="text-gray-200">
                Premium dormitory and group accommodation in Rameswaram for
                pilgrims and travelers. Strategic location near Ramanathaswamy
                Temple, Pamban Bridge and Dr APJ Abdul Kalam Memorial.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-200">
                <li>
                  <button
                    onClick={() => scrollToSection("rooms")}
                    className="hover:text-white transition-colors"
                  >
                    Our Rooms
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("amenities")}
                    className="hover:text-white transition-colors"
                  >
                    Amenities
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("attractions")}
                    className="hover:text-white transition-colors"
                  >
                    Attractions
                  </button>
                </li>
                <li>
                  <a
                    href="https://wa.me/918122445538"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Book Now
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <h4 className="text-xl font-bold mb-6 text-center">Visit Our Location</h4>
            <div className="flex justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.54552272344!2d79.24418387508052!3d9.284836190787066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b01e57b84786dc5%3A0x36f1e2f3e163a4e8!2sJoy%20AC%20Hall%20%26%20Dormitory!5e0!3m2!1sen!2sin!4v1773055304001!5m2!1sen!2sin"
                width="600"
                height="450"
                style={{ border: 0, borderRadius: "8px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 mt-8 text-center text-gray-200">
            <p>
              &copy; {new Date().getFullYear()} Joy AC Hall & Rooms. All
              rights reserved. | Budget Dormitory in Rameswaram near
              Ramanathaswamy Temple & Pamban Bridge.
            </p>
          </div>
        </div>
      </footer>

      {/* Room Details Modal */}
      {selectedRoom && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedRoom(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const room = rooms.find((r) => r.id === selectedRoom);
              if (!room) return null;

              return (
                <>
                  {/* Image & Video Slider */}
                  <div className="relative bg-gray-200 h-96 flex items-center justify-center group">
                    {(() => {
                      const totalMedia = (room.sliderImages?.length || 0) + (room.sliderVideos?.length || 0);
                      const isVideo = currentRoomImageIndex >= (room.sliderImages?.length || 0);
                      const mediaIndex = isVideo ? currentRoomImageIndex - (room.sliderImages?.length || 0) : currentRoomImageIndex;

                      return isVideo ? (
                        <video
                          src={room.sliderVideos[mediaIndex]}
                          controls
                          className="w-full h-full max-w-full object-contain"
                        />
                      ) : (
                        <img
                          src={room.sliderImages[mediaIndex]}
                          alt={`${room.name} - Image ${mediaIndex + 1}`}
                          className="w-full h-full max-w-full object-contain"
                        />
                      );
                    })()}

                    {/* Previous Button */}
                    <button
                      onClick={() =>
                        setCurrentRoomImageIndex((prev) => {
                          const totalMedia = (room.sliderImages?.length || 0) + (room.sliderVideos?.length || 0);
                          return prev === 0 ? totalMedia - 1 : prev - 1;
                        })
                      }
                      className="absolute left-4 bg-white/80 hover:bg-white p-2 rounded-full transition-all"
                      aria-label="Previous media"
                    >
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>

                    {/* Next Button */}
                    <button
                      onClick={() =>
                        setCurrentRoomImageIndex((prev) => {
                          const totalMedia = (room.sliderImages?.length || 0) + (room.sliderVideos?.length || 0);
                          return prev === totalMedia - 1 ? 0 : prev + 1;
                        })
                      }
                      className="absolute right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-all"
                      aria-label="Next media"
                    >
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>

                    {/* Media Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                      {currentRoomImageIndex + 1} / {(room.sliderImages?.length || 0) + (room.sliderVideos?.length || 0)}
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={() => setSelectedRoom(null)}
                      className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-all"
                      aria-label="Close modal"
                    >
                      <X className="w-6 h-6 text-primary" />
                    </button>
                  </div>

                  {/* Room Details */}
                  <div className="p-8">
                    <h2 className="text-4xl font-bold text-primary mb-2">
                      {room.name}
                    </h2>
                    <p className="text-gray-600 mb-6">{room.capacity}</p>

                    {/* Pricing */}
                    <div className="bg-primary/10 rounded-lg p-4 mb-6">
                      <p className="text-gray-700 mb-2">Starting Price:</p>
                      <p className="text-3xl font-bold text-primary">
                        {room.price}
                        <span className="text-lg ml-2 text-gray-600 font-normal">
                          {room.priceType}
                        </span>
                      </p>
                    </div>

                    {/* Room Types */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-primary mb-3">
                        Available Room Types
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {room.roomTypes.map((type: string, idx: number) => (
                          <span
                            key={idx}
                            className="bg-accent/20 text-primary px-4 py-2 rounded-full text-sm font-medium"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-primary mb-3">
                        Features
                      </h3>
                      <ul className="space-y-2">
                        {room.features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Star className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <a
                        href="tel:+918122445538"
                        className="flex-1"
                      >
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          Book Now
                        </Button>
                      </a>
                      <a
                        href="https://wa.me/918122445538"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button className="w-full bg-green-600 hover:bg-green-700 gap-2">
                          <MessageCircle size={18} />
                          WhatsApp
                        </Button>
                      </a>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Mobile Sticky Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden z-40 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex h-16 w-full max-w-full">
          {/* Call Now Button */}
          <a
            href="tel:+918122445538"
            className="flex-1 flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-semibold transition-colors border-r border-gray-100"
            aria-label="Call Now"
          >
            <PhoneIcon size={20} className="mr-2" />
            <span className="text-sm">Call</span>
          </a>

          {/* WhatsApp Booking Button */}
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

export default Index;
