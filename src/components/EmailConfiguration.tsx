
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Check, Mail } from "lucide-react";

export const EmailConfiguration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [emailConfig, setEmailConfig] = useState({
    mailName: "",
    subject: "",
    body: ""
  });

  const steps = [
    { id: 1, title: "Mail Name", description: "Enter a name for your email template" },
    { id: 2, title: "Subject", description: "Add a subject line for your email" },
    { id: 3, title: "Body", description: "Create your email content" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setEmailConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    const currentStepConfig = steps[currentStep - 1];
    
    if (currentStep === 1 && !emailConfig.mailName) {
      toast({
        title: "Required field",
        description: "Please enter a mail name to continue",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep === 2 && !emailConfig.subject) {
      toast({
        title: "Required field", 
        description: "Please enter a subject line to continue",
        variant: "destructive"
      });
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    if (!emailConfig.body) {
      toast({
        title: "Required field",
        description: "Please enter email body content",
        variant: "destructive"
      });
      return;
    }

    // Save to localStorage for demo purposes
    const savedEmails = JSON.parse(localStorage.getItem("emailTemplates") || "[]");
    const newTemplate = {
      id: Date.now(),
      ...emailConfig,
      createdAt: new Date().toISOString()
    };
    savedEmails.push(newTemplate);
    localStorage.setItem("emailTemplates", JSON.stringify(savedEmails));

    toast({
      title: "Email template saved!",
      description: "Your email configuration has been successfully saved.",
    });

    // Reset form
    setEmailConfig({ mailName: "", subject: "", body: "" });
    setCurrentStep(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Email Configuration</h2>
        <p className="text-muted-foreground">Configure your email template step by step</p>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration Steps</CardTitle>
          <CardDescription>Follow these steps to configure your email</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep === step.id 
                    ? "border-blue-500 bg-blue-500 text-white" 
                    : currentStep > step.id
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-gray-300 text-gray-400"
                }`}>
                  {currentStep > step.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="ml-2">
                  <div className={`text-sm font-medium ${
                    currentStep === step.id ? "text-blue-600" : 
                    currentStep > step.id ? "text-green-600" : "text-gray-400"
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step.id ? "bg-green-500" : "bg-gray-300"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configuration Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Step {currentStep}: {steps[currentStep - 1].title}
          </CardTitle>
          <CardDescription>{steps[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentStep === 1 && (
            <div className="space-y-2">
              <Label htmlFor="mailName">Mail Name</Label>
              <Input
                id="mailName"
                placeholder="e.g., Weekly Newsletter, Product Update"
                value={emailConfig.mailName}
                onChange={(e) => handleInputChange("mailName", e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                This name will help you identify this email template
              </p>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-2">
              <Label htmlFor="subject">Subject Line</Label>
              <Input
                id="subject"
                placeholder="e.g., Your Weekly Newsletter is Here!"
                value={emailConfig.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Keep it engaging and under 50 characters for best results
              </p>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-2">
              <Label htmlFor="body">Email Body</Label>
              <Textarea
                id="body"
                placeholder="Write your email content here..."
                className="min-h-[200px]"
                value={emailConfig.body}
                onChange={(e) => handleInputChange("body", e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                You can use HTML formatting in your email body
              </p>
            </div>
          )}

          {/* Configuration Summary */}
          {currentStep > 1 && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Configuration Summary:</h4>
              <div className="space-y-1 text-sm">
                {emailConfig.mailName && (
                  <div><span className="font-medium">Mail Name:</span> {emailConfig.mailName}</div>
                )}
                {emailConfig.subject && (
                  <div><span className="font-medium">Subject:</span> {emailConfig.subject}</div>
                )}
                {currentStep === 3 && emailConfig.body && (
                  <div><span className="font-medium">Body:</span> {emailConfig.body.substring(0, 100)}...</div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            
            {currentStep < 3 ? (
              <Button onClick={handleNext}>
                Next Step
              </Button>
            ) : (
              <Button onClick={handleSave}>
                Save Email Template
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
