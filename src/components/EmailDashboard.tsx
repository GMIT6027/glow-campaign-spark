
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, Check, ArrowRight } from "lucide-react";

const mockCampaigns = [
  {
    id: 1,
    name: "Newsletter Tracking V2",
    totalRecipients: 3,
    delivered: 0,
    opened: 2,
    clicked: 0,
    viewed: 0,
    bounced: 0,
    complaints: 0,
    lastUpdated: "5/19/2025, 6:17:03 PM",
    status: "Sent"
  }
];

const mockEmailDetails = [
  {
    email: "samip@asturisk.com",
    status: "Delivered",
    lastUpdated: "5/19/2025, 5:09:19 PM",
    details: ""
  },
  {
    email: "samipshah86@gmail.com", 
    status: "Opened",
    lastUpdated: "5/19/2025, 6:17:03 PM",
    details: "Opened: 5/19/2025, 6:17:03 PM"
  },
  {
    email: "ssam1771@gmail.com",
    status: "Opened", 
    lastUpdated: "5/19/2025, 6:16:53 PM",
    details: "Opened: 5/19/2025, 6:16:53 PM"
  }
];

export const EmailDashboard = () => {
  const campaign = mockCampaigns[0];
  const deliveryRate = campaign.totalRecipients > 0 ? (campaign.delivered / campaign.totalRecipients * 100).toFixed(1) : "0";
  const openRate = campaign.totalRecipients > 0 ? (campaign.opened / campaign.totalRecipients * 100).toFixed(1) : "66.7";
  const clickRate = campaign.totalRecipients > 0 ? (campaign.clicked / campaign.totalRecipients * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your email campaigns and performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recipients</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{campaign.totalRecipients}</div>
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

      {/* Campaign Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Campaign: {campaign.name}</CardTitle>
          <CardDescription>
            Sent: {campaign.totalRecipients} | Delivered: {campaign.delivered} | 
            Bounced: {campaign.bounced} | Complaints: {campaign.complaints}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{campaign.delivered}</div>
              <div className="text-sm text-muted-foreground">Delivered</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{campaign.opened}</div>
              <div className="text-sm text-muted-foreground">Opened</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{campaign.clicked}</div>
              <div className="text-sm text-muted-foreground">Clicked</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{campaign.viewed}</div>
              <div className="text-sm text-muted-foreground">Viewed</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{campaign.bounced}</div>
              <div className="text-sm text-muted-foreground">Bounced</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">{campaign.complaints}</div>
              <div className="text-sm text-muted-foreground">Complaints</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Email Tracking Details</CardTitle>
          <CardDescription>Individual email status and engagement tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b bg-muted/50">
              <div>Email</div>
              <div>Status</div>
              <div>Last Updated</div>
              <div>Details</div>
            </div>
            {mockEmailDetails.map((email, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 p-4 border-b last:border-b-0">
                <div className="font-mono text-sm">{email.email}</div>
                <div>
                  <Badge 
                    variant={email.status === "Opened" ? "default" : "secondary"}
                    className={email.status === "Opened" ? "bg-orange-100 text-orange-800" : ""}
                  >
                    {email.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">{email.lastUpdated}</div>
                <div className="text-sm">
                  {email.details && (
                    <span className="text-green-600">
                      {email.details}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
