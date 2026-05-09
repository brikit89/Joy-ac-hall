import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets window scroll to (0, 0) on every route change.
 * Without this, React Router preserves the previous page's scroll
 * position, so navigating from a deep section on the home page to
 * /rooms/* would leave the new page scrolled mid-way.
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Avoid the smooth-scroll animation here — for navigation we want an
    // instant jump to the top, like a fresh page load.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
};
