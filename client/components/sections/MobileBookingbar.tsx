import {
  MessageCircle,
  Phone as PhoneIcon,
} from "lucide-react";

interface MobileBookingBarProps {
  phoneUrl: string;
  whatsappUrl: string;
}

const MobileBookingBar = ({
  phoneUrl,
  whatsappUrl,
}: MobileBookingBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden z-40 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex h-16 w-full max-w-full">

        {/* Call */}
        <a
          href={phoneUrl}
          className="flex-1 flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-semibold transition-colors border-r border-gray-100"
          aria-label="Call Now"
        >
          <PhoneIcon size={20} className="mr-2" />
          <span className="text-sm">Call</span>
        </a>

        {/* WhatsApp */}
        <a
          href={whatsappUrl}
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
  );
};

export default MobileBookingBar;