
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SkinForm from "@/components/SkinForm";

const SkinAnalysis = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-secondary/20">
      <Navbar />

      <main className="container px-4 pt-24 pb-12 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 animate-slide-up">
            <h1 className="text-3xl font-bold mb-4">Personalized Skin Analysis</h1>
            <p className="text-gray-600">
              Tell us about your skin and concerns to receive AI-powered recommendations
              tailored specifically for you.
            </p>
          </div>

          <div className="bg-white/80 glassmorphism rounded-xl p-6 md:p-8 shadow-lg">
            <SkinForm />
          </div>

          <div className="mt-10 text-center text-sm text-gray-500 animate-slide-up delay-300">
            <p>
              Your information is used only to generate personalized recommendations and is
              never shared with third parties.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SkinAnalysis;
