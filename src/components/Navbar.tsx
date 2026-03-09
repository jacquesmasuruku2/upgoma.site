import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAllFacultyContent } from "@/hooks/useSupabaseData";
import ThemeToggle from "./ThemeToggle";
import logoUpg from "@/assets/logo-upg.jpg";

const defaultFacultyLinks = [
  { label: "Polytechnique", href: "/faculte/polytechnique" },
  { label: "Sciences Économiques", href: "/faculte/sciences-economiques" },
  { label: "Santé Publique", href: "/faculte/sante-publique" },
  { label: "Management", href: "/faculte/management" },
  { label: "Sciences de Développement", href: "/faculte/sciences-developpement" },
  { label: "Sciences Agronomiques", href: "/faculte/sciences-agronomiques" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { data: dbFaculties } = useAllFacultyContent();

  const facultyLinks = dbFaculties && dbFaculties.length > 0
    ? dbFaculties.map((f: any) => ({ label: f.name, href: `/faculte/${f.slug}` }))
    : defaultFacultyLinks;

  const navItems = [
    { label: t("nav.home"), href: "/" },
    {
      label: t("nav.about"),
      children: [
        { label: "Présentation", href: "/about" },
        { label: "Nos Services", href: "/services" },
      ],
    },
    { label: t("nav.blog"), href: "/blog" },
    { label: t("nav.gallery"), href: "/galerie" },
    { label: t("nav.personnel"), href: "/personnel" },
    {
      label: t("nav.faculties"),
      children: facultyLinks,
    },
    {
      label: t("nav.student"),
      children: [
        { label: t("nav.student.portal"), href: "https://upg-system.vercel.app/login-etudiant", external: true },
        { label: t("nav.student.college"), href: "/college-etudiants" },
        { label: t("nav.student.inscription"), href: "https://upg-system.vercel.app/inscription", external: true },
      ],
    },
    { label: t("nav.contact"), href: "/contact" },
    { label: t("nav.faq"), href: "/faq" },
  ];

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setDropdownOpen(null);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-primary text-lg">
          <img src={logoUpg} alt="Logo UPG" className="h-10 w-10 rounded-full object-cover" />
          <span className="hidden lg:inline text-sm font-semibold text-foreground leading-tight">
            Université Polytechnique<br />de Goma
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(item.label)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-secondary">
                  {item.label}
                  <ChevronDown className="w-3 h-3" />
                </button>
                {dropdownOpen === item.label && (
                  <div className="absolute top-full left-0 bg-card border border-border rounded-lg shadow-lg py-2 min-w-[220px] animate-fade-in">
                    {item.children.map((child) =>
                      child.href.startsWith("/#") ? (
                        <button
                          key={child.label}
                          onClick={() => handleNavClick(child.href)}
                          className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-primary transition-colors"
                        >
                          {child.label}
                        </button>
                      ) : (child as any).external ? (
                        <a
                          key={child.label}
                          href={child.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-primary transition-colors"
                          onClick={() => setDropdownOpen(null)}
                        >
                          {child.label}
                        </a>
                      ) : (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-primary transition-colors"
                          onClick={() => setDropdownOpen(null)}
                        >
                          {child.label}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ) : item.href?.startsWith("/#") ? (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href!)}
                className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-secondary"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.label}
                to={item.href!}
                className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-secondary"
              >
                {item.label}
              </Link>
            )
          )}
          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden flex items-center gap-1">
          <ThemeToggle />
          <button
            className="p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() =>
                      setDropdownOpen(dropdownOpen === item.label ? null : item.label)
                    }
                    className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-foreground rounded-md hover:bg-secondary"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        dropdownOpen === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {dropdownOpen === item.label && (
                    <div className="pl-4 flex flex-col gap-1">
                      {item.children.map((child) =>
                        child.href.startsWith("/#") ? (
                          <button
                            key={child.label}
                            onClick={() => handleNavClick(child.href)}
                            className="block text-left px-3 py-2 text-sm text-muted-foreground hover:text-primary"
                          >
                            {child.label}
                          </button>
                        ) : (child as any).external ? (
                          <a
                            key={child.label}
                            href={child.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </a>
                        ) : (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              ) : item.href?.startsWith("/#") ? (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href!)}
                  className="block text-left px-3 py-2 text-sm font-medium text-foreground rounded-md hover:bg-secondary"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  to={item.href!}
                  className="block px-3 py-2 text-sm font-medium text-foreground rounded-md hover:bg-secondary"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
