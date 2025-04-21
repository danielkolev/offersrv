
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import LandingHeader from "../components/landing/LandingHeader";
import GoogleAuthButton from "../components/landing/GoogleAuthButton";

const seoTitle = {
  en: "Offersrv - Create Professional Business Offers Effortlessly",
  bg: "Offersrv - Създавайте професионални бизнес оферти лесно",
};

const seoDescription = {
  en: "Create professional, personalized and convertible business offers in minutes. Manage clients and products, boost your revenue, impress your customers!",
  bg: "Създайте професионални, персонализирани и убедителни бизнес оферти за минути. Управлявайте клиенти и продукти, увеличете приходите си и впечатлете клиентите си!",
};

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title = seoTitle[language] || "Offersrv";
    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) metaDesc.setAttribute("content", seoDescription[language]);
    // Redirect if authenticated
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate, language]);

  const features = [
    {
      en: "Professional offer templates & custom branding",
      bg: "Професионални шаблони за оферти и собствен бранд",
    },
    {
      en: "Effective client and product management",
      bg: "Ефикасно управление на клиенти и продукти",
    },
    {
      en: "One-click offer generation, PDF export and tracking",
      bg: "Създаване на оферти, PDF и проследяване с един клик",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen flex flex-col">
      <LandingHeader />

      <main className="flex-1 container w-full mx-auto px-4 pt-12 pb-10 flex flex-col items-center justify-start md:justify-center">
        <section className="w-full flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Hero Section */}
          <div className="flex-1 text-center md:text-left space-y-6 md:space-y-8 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
              {language === "en"
                ? "Impress clients & win deals with modern business offers"
                : "Впечатлете клиентите и спечелете повече сделки с модерни оферти"}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-medium">
              {seoDescription[language]}
            </p>
            <ul className="text-base md:text-lg text-gray-700 font-medium space-y-2 pt-3">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-600 font-bold text-xl leading-none">•</span>
                  <span>{f[language]}</span>
                </li>
              ))}
            </ul>
            <div className="pt-6">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-base px-6 py-3 h-12 rounded-lg shadow-md gap-2 text-white font-semibold"
                size="default"
                onClick={() => {
                  // Focus login section
                  const section = document.getElementById("auth-section");
                  if (section) section.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t.auth.getStarted}
                <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Auth Form Card */}
          <div
            className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-8"
            id="auth-section"
          >
            <Tabs defaultValue="register" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="register">{t.auth.signUp}</TabsTrigger>
                <TabsTrigger value="login">{t.auth.signIn}</TabsTrigger>
              </TabsList>

              <TabsContent value="register">
                <GoogleAuthButton text={language === "bg" ? "Регистрация с Google" : "Sign up with Google"} />
                <div className="relative my-4 flex items-center">
                  <span className="flex-grow border-t" />
                  <span className="mx-3 text-muted-foreground text-xs uppercase">
                    {language === "bg" ? "или" : "or"}
                  </span>
                  <span className="flex-grow border-t" />
                </div>
                <AuthForm mode="register" />
              </TabsContent>

              <TabsContent value="login">
                <GoogleAuthButton text={language === "bg" ? "Вход с Google" : "Sign in with Google"} />
                <div className="relative my-4 flex items-center">
                  <span className="flex-grow border-t" />
                  <span className="mx-3 text-muted-foreground text-xs uppercase">
                    {language === "bg" ? "или" : "or"}
                  </span>
                  <span className="flex-grow border-t" />
                </div>
                <AuthForm mode="login" />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
