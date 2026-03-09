import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, LogOut, Mail, KeyRound, ArrowRight, ShieldAlert } from "lucide-react";
import logoUpg from "@/assets/logo-upg.jpg";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";
import AdminPersonnel from "@/components/admin/AdminPersonnel";
import AdminBlog from "@/components/admin/AdminBlog";
import AdminGallery from "@/components/admin/AdminGallery";
import AdminCollege from "@/components/admin/AdminCollege";
import AdminCalendar from "@/components/admin/AdminCalendar";
import AdminFees from "@/components/admin/AdminFees";
import AdminFaculties from "@/components/admin/AdminFaculties";
import AdminServices from "@/components/admin/AdminServices";
import AdminLibrary from "@/components/admin/AdminLibrary";

const AdminPage = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState("personnel");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        checkAdminRole(session.user.id);
      } else {
        setIsAdmin(null);
        setLoading(false);
      }
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session?.user) {
        checkAdminRole(data.session.user.id);
      } else {
        setLoading(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: userId,
        _role: 'admin'
      });
      if (error) throw error;
      setIsAdmin(data === true);
    } catch (err) {
      console.error("Role check failed:", err);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Connexion réussie !");
    } catch (err: any) {
      toast.error(err.message || "Email ou mot de passe incorrect.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(null);
    toast.success("Déconnexion réussie");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden bg-[hsl(215,30%,8%)]">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[hsl(25,90%,55%,0.08)] blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[hsl(210,70%,35%,0.08)] blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(210,50%,20%,0.05)] blur-3xl" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(hsl(0,0%,100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0,0%,100%) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="w-full max-w-[420px] relative z-10 animate-fade-in">
          {/* Shield badge */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-2xl shadow-[hsl(25,90%,55%,0.3)] rotate-3 hover:rotate-0 transition-transform duration-500">
                <img src={logoUpg} alt="Logo UPG" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[hsl(145,60%,45%)] border-4 border-[hsl(215,30%,8%)] flex items-center justify-center">
                <Lock className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          {/* Header text */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black tracking-tight text-white mb-2">
              Espace <span className="bg-gradient-to-r from-[hsl(25,90%,55%)] to-[hsl(35,95%,60%)] bg-clip-text text-transparent">Administrateur</span>
            </h1>
            <p className="text-[hsl(210,15%,50%)] text-sm">Connectez-vous pour gérer le contenu UPG</p>
          </div>

          {/* Login Card */}
          <div className="bg-[hsl(215,25%,13%)] border border-[hsl(215,20%,20%)] rounded-3xl p-8 shadow-2xl shadow-black/50 backdrop-blur-sm">
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email field */}
              <div className="space-y-2">
                <label className="text-[hsl(210,15%,65%)] text-xs font-semibold uppercase tracking-wider pl-1 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  Adresse email
                </label>
                <div className="relative group">
                  <Input
                    type="email"
                    placeholder="admin@upg.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[hsl(215,20%,10%)] border-[hsl(215,20%,22%)] text-white placeholder:text-[hsl(215,15%,35%)] h-12 rounded-xl pl-4 pr-4 text-sm focus:border-[hsl(25,90%,55%)] focus:ring-2 focus:ring-[hsl(25,90%,55%,0.15)] transition-all duration-300 hover:border-[hsl(215,20%,30%)]"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[hsl(25,90%,55%,0.1)] to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <label className="text-[hsl(210,15%,65%)] text-xs font-semibold uppercase tracking-wider pl-1 flex items-center gap-2">
                  <KeyRound className="w-3.5 h-3.5" />
                  Mot de passe
                </label>
                <div className="relative group">
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[hsl(215,20%,10%)] border-[hsl(215,20%,22%)] text-white placeholder:text-[hsl(215,15%,35%)] h-12 rounded-xl pl-4 pr-4 text-sm focus:border-[hsl(25,90%,55%)] focus:ring-2 focus:ring-[hsl(25,90%,55%,0.15)] transition-all duration-300 hover:border-[hsl(215,20%,30%)]"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[hsl(25,90%,55%,0.1)] to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>

              {/* Login button */}
              <Button
                type="submit"
                className="w-full h-12 mt-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 group text-sm tracking-wide"
                disabled={loggingIn}
              >
                {loggingIn ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Connexion en cours...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Se connecter
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="mt-6 pt-6 border-t border-[hsl(215,20%,18%)]">
              <div className="flex items-center justify-center gap-2 text-[hsl(210,15%,40%)] text-xs">
                <Lock className="w-3 h-3" />
                <span>Connexion sécurisée · Accès restreint</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-[hsl(210,15%,30%)] text-xs mt-6 font-medium">
            © {new Date().getFullYear()} Université Polytechnique de Goma
          </p>
        </div>
      </div>
    );
  }

  // User is authenticated but NOT admin
  if (isAdmin === false) {
    return (
      <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden bg-[hsl(215,30%,8%)]">
        <div className="w-full max-w-[420px] text-center animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-2xl">
              <ShieldAlert className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-white mb-3">Accès refusé</h1>
          <p className="text-[hsl(210,15%,50%)] text-sm mb-8">
            Votre compte n'a pas les permissions nécessaires pour accéder au panneau d'administration.
          </p>
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="px-8"
          >
            <LogOut className="w-4 h-4 mr-2" /> Se déconnecter
          </Button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "personnel", label: "Personnel" },
    { id: "blog", label: "Blog" },
    { id: "college", label: "Collège Étudiants" },
    { id: "galerie", label: "Galerie" },
    { id: "calendrier", label: "Calendrier" },
    { id: "frais", label: "Frais" },
    { id: "facultes", label: "Facultés" },
    { id: "services", label: "Services" },
    { id: "bibliotheque", label: "Bibliothèque" },
  ];

  return (
    <div className="min-h-screen bg-[hsl(210,30%,12%)]">
      {/* Header */}
      <div className="bg-[hsl(210,70%,20%)] text-white p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <img src={logoUpg} alt="Logo UPG" className="h-9 w-9 rounded-full object-cover" />
          <h1 className="text-xl font-bold tracking-wide">
            <span className="text-orange-400">UPG</span> Administration
          </h1>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 shadow-md"
        >
          <LogOut className="w-4 h-4 mr-2" /> Déconnexion
        </Button>
      </div>

      <div className="mx-auto px-4 py-6 max-w-full">
        {/* Sidebar-style tabs */}
        <div className="flex flex-col lg:flex-row gap-6">
          <nav className="lg:w-56 shrink-0">
            <div className="bg-[hsl(210,40%,18%)] rounded-xl p-3 flex flex-row lg:flex-col flex-wrap gap-1.5 shadow-md">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-[hsl(210,70%,35%)] text-white shadow-md"
                      : "text-gray-300 hover:bg-[hsl(210,40%,25%)] hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Content */}
          <div className="flex-1 min-w-0 bg-card border border-border rounded-xl p-6 shadow-md min-h-[60vh]">
            {activeTab === "personnel" && <AdminPersonnel />}
            {activeTab === "blog" && <AdminBlog />}
            {activeTab === "college" && <AdminCollege />}
            {activeTab === "galerie" && <AdminGallery />}
            {activeTab === "calendrier" && <AdminCalendar />}
            {activeTab === "frais" && <AdminFees />}
            {activeTab === "facultes" && <AdminFaculties />}
            {activeTab === "services" && <AdminServices />}
            {activeTab === "bibliotheque" && <AdminLibrary />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
