
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AnimatedButton from "@/components/AnimatedButton";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(username, password);
        navigate("/dashboard");
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
      } else {
        await register(username, password);
        toast({
          title: "Account created!",
          description: "Your account has been created successfully.",
        });
        setIsLogin(true);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white/80 glassmorphism rounded-2xl animate-scale-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {isLogin
            ? "Sign in to access your personalized skin care routine"
            : "Sign up to start your skin care journey"}
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div>
          <AnimatedButton
            type="submit"
            className="w-full bg-gradient-pink hover:shadow-[0_0_15px_rgba(255,154,158,0.5)] animate-pulse-glow"
            isLoading={isLoading}
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </AnimatedButton>
        </div>
      </form>

      <div className="text-center pt-4">
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm font-medium text-primary-foreground hover:text-primary hover:underline transition-colors"
        >
          {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
