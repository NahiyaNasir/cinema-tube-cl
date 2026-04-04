"use client";

import { Mail, Calendar, Star, Film,  Edit2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";


const mockUser = {
  name: "Nahia",
  email: "nahia@example.com",
  role: "MERN Stack Developer",
  joined: "March 2024",
  stats: {
    ratedMovies: 45,
    reviews: 12,
    watchlist: 8
  }
};

const ProfilePage = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: User Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-t-4 border-t-primary shadow-lg">
            <CardContent className="pt-8 text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24 border-2 border-primary/20 p-1">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="text-2xl bg-primary/10">
                    {mockUser.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h2 className="text-2xl font-bold">{mockUser.name}</h2>
              <p className="text-muted-foreground text-sm mb-4">{mockUser.role}</p>
              
              <div className="flex justify-center gap-2 mb-6">
                <Badge variant="secondary">Pro Critic</Badge>
                <Badge variant="outline">Top Reviewer</Badge>
              </div>

              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>{mockUser.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Joined {mockUser.joined}</span>
                </div>
              </div>

              <Button className="w-full mt-6 gap-2" variant="outline">
                <Edit2 className="h-4 w-4" /> Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-accent rounded-lg">
                <p className="text-xl font-bold">{mockUser.stats.ratedMovies}</p>
                <p className="text-[10px] uppercase text-muted-foreground">Rated</p>
              </div>
              <div className="p-2 bg-accent rounded-lg">
                <p className="text-xl font-bold">{mockUser.stats.reviews}</p>
                <p className="text-[10px] uppercase text-muted-foreground">Reviews</p>
              </div>
              <div className="p-2 bg-accent rounded-lg">
                <p className="text-xl font-bold">{mockUser.stats.watchlist}</p>
                <p className="text-[10px] uppercase text-muted-foreground">Watch list</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Content Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="watchlist">My Watch list</TabsTrigger>
              <TabsTrigger value="settings">Account Settings</TabsTrigger>
            </TabsList>

            {/* Recent Activity Tab */}
            <TabsContent value="activity" className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Latest Reviews</h3>
              {/* Example Activity Item */}
              {[1, 2].map((i) => (
                <Card key={i} className="hover:bg-accent/50 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex gap-4">
                    <div className="h-20 w-14 bg-muted rounded-md shrink-0 flex items-center justify-center">
                      <Film className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">The Dark Knight</h4>
                        <div className="flex items-center text-yellow-500 gap-1">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm font-bold">9.0</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        &quot;One of the best cinematic experiences. Heath Ledger was legendary!&quot;
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-2 uppercase">2 days ago</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Watchlist Tab */}
            <TabsContent value="watchlist">
              <Card>
                <CardHeader>
                  <CardTitle>My Watch list</CardTitle>
                  <CardDescription>Movies and series you want to watch later.</CardDescription>
                </CardHeader>
                <CardContent className="text-center py-10">
                   <Film className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-20" />
                   <p className="text-muted-foreground">Your watch list is empty.</p>
                   <Button variant="link" className="text-primary mt-2">Explore Movies</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Change Password</p>
                      <p className="text-xs text-muted-foreground">Update your account password</p>
                    </div>
                    <Link href="/change-password"  className="text-primary text-sm font-medium">
                      Update
                    </Link>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium text-destructive">Deactivate Account</p>
                      <p className="text-xs text-muted-foreground">Permanently delete your profile</p>
                    </div>
                    <Button size="sm" variant="destructive">Close</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;