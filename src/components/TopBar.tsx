import { useState, useEffect } from "react";
import { Mail, Globe, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const TopBar = () => {
  const [visible, setVisible] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const handler = () => setVisible(window.scrollY < 80);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={`bg-[hsl(210,70%,25%)] text-white text-xs sm:text-sm transition-all duration-300 z-50 ${
        visible ? "h-10 opacity-100" : "h-0 opacity-0 overflow-hidden"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-10 px-4">
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto">
          <Link to="/frais" className="hover:underline whitespace-nowrap">{t("topbar.fees")}</Link>
          <span className="opacity-40 hidden sm:inline">|</span>
          <a href="https://systeme-upgoma.lovable.app/inscription" target="_blank" rel="noopener noreferrer" className="hover:underline whitespace-nowrap hidden sm:inline">{t("topbar.inscription")}</a>
          <span className="opacity-40 hidden md:inline">|</span>
          <Link to="/bibliotheque" className="hover:underline whitespace-nowrap hidden md:inline">{t("topbar.library")}</Link>
          <span className="opacity-40 hidden md:inline">|</span>
          <a href="https://systeme-upgoma.lovable.app/login-etudiant" target="_blank" rel="noopener noreferrer" className="hover:underline whitespace-nowrap hidden md:inline">{t("topbar.login")}</a>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 ml-auto shrink-0">
          <a href="tel:+16132612229" className="flex items-center gap-1 hover:underline">
            <Phone className="w-3 h-3" />
            <span className="hidden sm:inline">+1 613-261-2229</span>
          </a>
          <a href="https://www.facebook.com/upgoma/?locale=fr_FR" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center hover:opacity-80 transition-opacity">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="mailto:info@upgoma.org" className="flex items-center gap-1 hover:underline">
            <Mail className="w-3 h-3" />
            <span className="hidden sm:inline">info@upgoma.org</span>
          </a>
          <div className="flex items-center gap-1">
            <Globe className="w-3 h-3" />
            <div id="google_translate_element" className="google-translate-container" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
