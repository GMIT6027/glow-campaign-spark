
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Mail, Send, TestTube, Users } from "lucide-react";

export const CampaignManagement = () => {
  const [campaignData, setCampaignData] = useState({
    campaignName: "",
    recipientList: "",
    testEmails: ""
  });

  const [savedTemplates] = useState(() => {
    return JSON.parse(localStorage.getItem("emailTemplates") || "[]");
  });

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleInputChange = (field: string, value: string) => {
    setCampaignData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendTest = () => {
    if (!selectedTemplate) {
      toast({
        title: "No template selected",
        description: "Please select an email template first",
        variant: "destructive"
      });
      return;
    }

    if (!campaignData.testEmails) {
      toast({
        title: "No test emails",
        description: "Please enter test email addresses",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Test emails sent!",
      description: `Test emails sent to: ${campaignData.testEmails}`,
    });
  };

  const handleSendCampaign = () => {
    if (!selectedTemplate) {
      toast({
        title: "No template selected",
        description: "Please select an email template first",
        variant: "destructive"
      });
      return;
    }

    if (!campaignData.campaignName || !campaignData.recipientList) {
      toast({
        title: "Missing information",
        description: "Please fill in campaign name and recipient list",
        variant: "destructive"
      });
      return;
    }

    // Save campaign to localStorage for demo
    const savedCampaigns = JSON.parse(localStorage.getItem("campaigns") || "[]");
    const newCampaign = {
      id: Date.now(),
      ...campaignData,
      template: selectedTemplate,
      status: "Sent",
      sentAt: new Date().toISOString()
    };
    savedCampaigns.push(newCampaign);
    localStorage.setItem("campaigns", JSON.stringify(savedCampaigns));

    toast({
      title: "Campaign sent successfully!",
      description: `Campaign "${campaignData.campaignName}" has been sent to recipients`,
    });

    // Reset form
    setCampaignData({
      campaignName: "",
      recipientList: "",
      testEmails: ""
    });
    setSelectedTemplate(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Campaign Management</h2>
        <p className="text-muted-foreground">Create and manage your email campaigns</p>
      </div>

      {/* Email Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Select Email Template
          </CardTitle>
          <CardDescription>Choose from your saved email templates</CardDescription>
        </CardHeader>
        <CardContent>
          {savedTemplates.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No email templates found</p>
              <p className="text-sm">Create a template in the Email Configuration tab first</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {savedTemplates.map((template: any) => (
                <Card 
                  key={template.id} 
                  className={`cursor-pointer transition-colors ${
                    selectedTemplate?.id === template.id 
                      ? "border-blue-500 bg-blue-50" 
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{template.mailName}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{template.subject}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {template.body.substring(0, 80)}...
                        </p>
                      </div>
                      {selectedTemplate?.id === template.id && (
                        <Badge variant="default">Selected</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Campaign Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Campaign Configuration
          </CardTitle>
          <CardDescription>Set up your campaign details and recipient list</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="campaignName">Campaign Name</Label>
            <Input
              id="campaignName"
              placeholder="e.g., March Newsletter Campaign"
              value={campaignData.campaignName}
              onChange={(e) => handleInputChange("campaignName", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipientList">Recipient List</Label>
            <Textarea
              id="recipientList"
              placeholder="Enter email addresses separated by commas or new lines"
              className="min-h-[120px]"
              value={campaignData.recipientList}
              onChange={(e) => handleInputChange("recipientList", e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Example: user1@example.com, user2@example.com
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Testing Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="w-5 h-5" />
            Test Before Sending
          </CardTitle>
          <CardDescription>Send test emails before launching your campaign</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="testEmails">Test Email Addresses</Label>
            <Input
              id="testEmails"
              placeholder="test1@example.com, test2@example.com"
              value={campaignData.testEmails}
              onChange={(e) => handleInputChange("testEmails", e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Send test emails to these addresses to preview your campaign
            </p>
          </div>

          <Button 
            onClick={handleSendTest}
            variant="outline"
            className="w-full"
          >
            <TestTube className="w-4 h-4 mr-2" />
            Send Test Emails
          </Button>
        </CardContent>
      </Card>

      {/* Campaign Summary & Send */}
      {selectedTemplate && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              Campaign Summary
            </CardTitle>
            <CardDescription>Review your campaign before sending</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">Campaign Details</h4>
                <div className="space-y-1 text-sm">
                  <div><span className="font-medium">Name:</span> {campaignData.campaignName || "Not set"}</div>
                  <div><span className="font-medium">Recipients:</span> {
                    campaignData.recipientList ? 
                    campaignData.recipientList.split(/[,\n]/).filter(email => email.trim()).length + " emails" : 
                    "0 emails"
                  }</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Email Template</h4>
                <div className="space-y-1 text-sm">
                  <div><span className="font-medium">Template:</span> {selectedTemplate.mailName}</div>
                  <div><span className="font-medium">Subject:</span> {selectedTemplate.subject}</div>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <Button 
              onClick={handleSendCampaign}
              className="w-full"
              size="lg"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Campaign
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
