
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthScreen } from "@/components/AuthScreen";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
    toast({
      title: "Welcome!",
      description: "Successfully signed in to your email marketing platform.",
    });
    navigate("/dashboard");
  };

  return <AuthScreen onLogin={handleLogin} />;
};

export default Index;
