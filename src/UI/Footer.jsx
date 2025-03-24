import React from "react";

export const Footer = () => {
  return (
    <footer
      className="p-1 sm:p-1 border-t border-gray-200 dark:border-gray-800
      bg-white dark:bg-gray-900 flex flex-col items-center justify-center
      space-y-1 sm:space-y-1"
    >
      <p className="text-center text-xs sm:text-sm dark:text-white">
        Stocks AI provides informational content only and does not offer
        financial advice. Use our platform at your own risk. We are not liable
        for any financial losses.
      </p>

      <p className="text-center text-xs sm:text-sm dark:text-white">
        Copyright © 2025 Deinpi
      </p>
    </footer>
  );
};

export default Footer;