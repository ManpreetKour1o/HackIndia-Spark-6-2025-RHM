
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/LoginForm";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex flex-col items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-secondary/40 via-background to-primary/30 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container relative z-10 px-4 py-12 mx-auto flex flex-col items-center">
        {/* Brand Header */}
        <div className="text-center mb-10 animate-slide-up">
          <div className="flex items-center justify-center mb-2">
            <span className="text-5xl mr-2 animate-float">✨</span>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              GlowGenius
            </h1>
          </div>
          <p className="mt-4 text-lg text-gray-600 max-w-md">
            Your personal AI skincare assistant. Get customized recommendations for your unique skin needs.
          </p>
        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {[
            {
              title: "AI-Powered Analysis",
              description: "Get personalized skincare recommendations based on your skin type and concerns.",
              delay: "delay-100",
            },
            {
              title: "Indian Products",
              description: "Discover skincare products available in India that match your skin's needs.",
              delay: "delay-200",
            },
            {
              title: "Expert Tips",
              description: "Learn professional skincare routines tailored to your unique skin concerns.",
              delay: "delay-300",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`bg-white/80 glassmorphism p-6 rounded-xl animate-slide-up ${feature.delay}`}
            >
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full relative z-10 mt-auto py-6 text-center text-sm text-gray-500">
        <p>© 2025 GlowGenius. Your skincare companion.</p>
      </footer>
    </div>
  );
};

export default Index;
