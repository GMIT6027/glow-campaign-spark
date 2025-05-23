
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailDashboard } from "@/components/EmailDashboard";
import { EmailConfiguration } from "@/components/EmailConfiguration";
import { CampaignManagement } from "@/components/CampaignManagement";
import { AuthScreen } from "@/components/AuthScreen";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock authentication check
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
    toast({
      title: "Welcome!",
      description: "Successfully signed in to your email marketing platform.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="flex h-16 items-center px-4 justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Email Marketing Platform</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="email-config">Email Configuration</TabsTrigger>
            <TabsTrigger value="campaigns">Campaign Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-4">
            <EmailDashboard />
          </TabsContent>
          
          <TabsContent value="email-config" className="space-y-4">
            <EmailConfiguration />
          </TabsContent>
          
          <TabsContent value="campaigns" className="space-y-4">
            <CampaignManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
