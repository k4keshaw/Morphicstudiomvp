import { User, CreditCard, Bell, Palette, Database, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export function Settings() {
  return (
    <div className="h-full overflow-auto">
      <div className="p-8 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-1">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="bg-white/5 border border-white/5">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-6">
            <div className="bg-white/5 rounded-lg p-6 border border-white/5 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                <User className="w-5 h-5 text-gray-400" />
                <h2 className="font-bold">Profile Information</h2>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label className="text-xs">Full Name</Label>
                  <Input id="name" defaultValue="Alex Morgan" className="bg-white/5 border-white/5" />
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="alex.morgan@example.com"
                    className="bg-white/5 border-white/5"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs">Username</Label>
                  <Input id="username" defaultValue="@alexmorgan" className="bg-white/5 border-white/5" />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="bg-white text-black hover:bg-gray-200">
                  Save Changes
                </Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </TabsContent>

          {/* Billing Settings */}
          <TabsContent value="billing" className="space-y-6">
            <div className="bg-white/5 rounded-lg p-6 border border-white/5 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <h2 className="font-bold">Subscription & Credits</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">Pro Plan</h3>
                      <p className="text-sm text-muted-foreground">Unlimited AI generations</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">$49</p>
                      <p className="text-xs text-muted-foreground">per month</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Manage Subscription
                  </Button>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">AI Credits</h3>
                    <span className="text-2xl font-bold text-white">2,450</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-3">
                    <div className="h-full w-3/4 bg-white/30 rounded-full" />
                  </div>
                  <Button size="sm" className="w-full bg-white text-black hover:bg-gray-200">Purchase More Credits</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="bg-white/5 rounded-lg p-6 border border-white/5 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                <Bell className="w-5 h-5 text-gray-400" />
                <h2 className="font-bold">Notification Preferences</h2>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: "Generation Complete",
                    description: "Notify when AI generation finishes",
                    defaultChecked: true,
                  },
                  {
                    title: "Export Ready",
                    description: "Notify when video export is complete",
                    defaultChecked: true,
                  },
                  {
                    title: "Project Updates",
                    description: "Receive updates about your projects",
                    defaultChecked: false,
                  },
                  {
                    title: "Marketing Emails",
                    description: "Receive tips and product updates",
                    defaultChecked: false,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-0.5">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch defaultChecked={item.defaultChecked} />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Preferences Settings */}
          <TabsContent value="preferences" className="space-y-6">
            <div className="bg-white/5 rounded-lg p-6 border border-white/5 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                <Palette className="w-5 h-5 text-gray-400" />
                <h2 className="font-bold">Application Preferences</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex-1">
                    <p className="font-medium text-sm mb-0.5">Auto-save Projects</p>
                    <p className="text-xs text-muted-foreground">
                      Automatically save changes every 30 seconds
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex-1">
                    <p className="font-medium text-sm mb-0.5">High Quality Previews</p>
                    <p className="text-xs text-muted-foreground">
                      Use full resolution for video previews
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex-1">
                    <p className="font-medium text-sm mb-0.5">Keyboard Shortcuts</p>
                    <p className="text-xs text-muted-foreground">
                      Enable keyboard shortcuts for faster editing
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-6 border border-white/5 space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                <Database className="w-5 h-5 text-gray-400" />
                <h2 className="font-bold">Data & Storage</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Storage Used</span>
                  <span className="font-semibold">2.4 GB / 10 GB</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-1/4 bg-white/30 rounded-full" />
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Manage Storage
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}