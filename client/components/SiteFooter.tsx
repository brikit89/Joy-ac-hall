import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "lucide-react";

interface QuickLink {
  label: string;
  href: string;
  external?: boolean;
}

const quickLinks: QuickLink[] = [
  { label: "Our Rooms", href: "/#rooms" },
  { label: "Amenities", href: "/#amenities" },
  { label: "Attractions", href: "/#attractions" },
  { label: "FAQ", href: "/#faq" },
  {
    label: "Book Now",
    href: "https://wa.me/918122445538",
    external: true,
  },
];

export const SiteFooter = () => {
  return (
    <footer className="bg-primary text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h4 className="text-xl font-bold mb-4">
              About Joy AC Hall
            </h4>
            <p className="text-gray-200">
              Joy AC Hall offers AC rooms, family stay, group accommodation,
              wedding hall and event facilities in Rameswaram, Tamil Nadu.
              Located near Ramanathaswamy Temple, Pamban Bridge and Dr APJ
              Abdul Kalam Memorial.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-200">
              {quickLinks.map((link) =>
                link.external ? (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
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

        <div className="mt-12 pt-8 border-t border-white/20">
          <h4 className="text-xl font-bold mb-6 text-center">
            Visit Our Location
          </h4>
          <div className="w-full max-w-2xl mx-auto aspect-[4/3] sm:aspect-[16/9] rounded-lg overflow-hidden">
            <iframe
              title="Joy AC Hall & Rooms — Google Maps location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.54552272344!2d79.24418387508052!3d9.284836190787066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b01e57b84786dc5%3A0x36f1e2f3e163a4e8!2sJoy%20AC%20Hall%20%26%20Dormitory!5e0!3m2!1sen!2sin!4v1773055304001!5m2!1sen!2sin"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 mt-8 text-center text-gray-200">
          <p>
            &copy; {new Date().getFullYear()} Joy AC Hall. All rights reserved.
            | AC Rooms, Group Stay &amp; Wedding Hall in Rameswaram near
            Ramanathaswamy Temple &amp; Pamban Bridge.
          </p>
        </div>
      </div>
    </footer>
  );
};
