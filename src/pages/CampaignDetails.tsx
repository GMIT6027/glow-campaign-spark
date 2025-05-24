
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { ArrowLeft, Calendar, Mail, Check, ArrowRight } from "lucide-react";

const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [campaign] = useState(() => {
    const campaigns = JSON.parse(localStorage.getItem("campaigns") || "[]");
    return campaigns.find((c: any) => c.id.toString() === id);
  });

  if (!campaign) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Campaign not found</h2>
          <Button onClick={() => navigate("/campaigns")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Campaigns
          </Button>
        </div>
      </Layout>
    );
  }

  const recipients = campaign.recipientList ? 
    campaign.recipientList.split(/[,\n]/).filter((email: string) => email.trim()) : [];
  
  // Mock data for demonstration
  const delivered = recipients.length;
  const opened = Math.floor(recipients.length * 0.7);
  const clicked = Math.floor(recipients.length * 0.3);
  const bounced = 0;
  const complaints = 0;

  const deliveryRate = recipients.length > 0 ? ((delivered / recipients.length) * 100).toFixed(1) : "0";
  const openRate = recipients.length > 0 ? ((opened / recipients.length) * 100).toFixed(1) : "0";
  const clickRate = recipients.length > 0 ? ((clicked / recipients.length) * 100).toFixed(1) : "0";

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/campaigns")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{campaign.campaignName}</h2>
            <p className="text-muted-foreground">Campaign details and performance metrics</p>
          </div>
        </div>

        {/* Campaign Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Campaign Information
              <Badge variant="default">{campaign.status}</Badge>
            </CardTitle>
            <CardDescription>Basic campaign details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">Campaign Details</h4>
                <div className="space-y-1 text-sm">
                  <div><span className="font-medium">Name:</span> {campaign.campaignName}</div>
                  <div><span className="font-medium">Template:</span> {campaign.template?.mailName || "No template"}</div>
                  <div><span className="font-medium">Subject:</span> {campaign.template?.subject || "No subject"}</div>
                  <div><span className="font-medium">Sent:</span> {new Date(campaign.sentAt).toLocaleString()}</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Recipients</h4>
                <div className="space-y-1 text-sm">
                  <div><span className="font-medium">Total:</span> {recipients.length}</div>
                  <div><span className="font-medium">Delivered:</span> {delivered}</div>
                  <div><span className="font-medium">Bounced:</span> {bounced}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Recipients</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{recipients.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
              <Check className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{deliveryRate}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{openRate}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{clickRate}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Detailed breakdown of campaign metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{delivered}</div>
                <div className="text-sm text-muted-foreground">Delivered</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{opened}</div>
                <div className="text-sm text-muted-foreground">Opened</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{clicked}</div>
                <div className="text-sm text-muted-foreground">Clicked</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">0</div>
                <div className="text-sm text-muted-foreground">Viewed</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{bounced}</div>
                <div className="text-sm text-muted-foreground">Bounced</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-600">{complaints}</div>
                <div className="text-sm text-muted-foreground">Complaints</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email Template Preview */}
        {campaign.template && (
          <Card>
            <CardHeader>
              <CardTitle>Email Template</CardTitle>
              <CardDescription>Preview of the email template used in this campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Subject:</h4>
                  <p className="text-sm text-muted-foreground">{campaign.template.subject}</p>
                </div>
                <div>
                  <h4 className="font-medium">Body:</h4>
                  <div className="p-4 bg-gray-50 rounded-lg text-sm">
                    {campaign.template.body}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default CampaignDetails;
