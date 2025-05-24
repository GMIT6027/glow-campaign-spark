
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/Layout";
import { Mail, Calendar, Users, Plus } from "lucide-react";

const CampaignsList = () => {
  const navigate = useNavigate();
  const [campaigns] = useState(() => {
    return JSON.parse(localStorage.getItem("campaigns") || "[]");
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Campaigns</h2>
            <p className="text-muted-foreground">Manage your email campaigns</p>
          </div>
          <Button onClick={() => navigate("/create-campaign")}>
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </div>

        {campaigns.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No campaigns yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first email campaign to get started
              </p>
              <Button onClick={() => navigate("/create-campaign")}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Campaign
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {campaigns.map((campaign: any) => (
              <Card 
                key={campaign.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/campaign/${campaign.id}`)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        {campaign.campaignName}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {campaign.template?.subject || "No subject"}
                      </CardDescription>
                    </div>
                    <Badge variant="default">
                      {campaign.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {campaign.recipientList ? 
                          campaign.recipientList.split(/[,\n]/).filter((email: string) => email.trim()).length : 0
                        } recipients
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{new Date(campaign.sentAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{campaign.template?.mailName || "No template"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CampaignsList;
