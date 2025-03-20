"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Save, Upload, Bell, Mail, Lock, CreditCard, Users, Phone, Globe, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>

          <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:w-[600px]">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Restaurant Information</CardTitle>
                  <CardDescription>Update your restaurant details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="/placeholder.svg" alt="Restaurant logo"/>
                        <AvatarFallback>VP</AvatarFallback>
                      </Avatar>
                      <div className="mt-2 sm:mt-0 sm:ml-4">
                        <Button variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4"/>
                          Change Logo
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          Recommended size: 512x512px. Max file size: 2MB.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="restaurant-name">Restaurant Name</Label>
                        <Input id="restaurant-name" defaultValue="Võ Đang Pizza"/>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="restaurant-email">Email Address</Label>
                        <Input id="restaurant-email" defaultValue="contact@vodangpizza.com"/>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="restaurant-phone">Phone Number</Label>
                        <Input id="restaurant-phone" defaultValue="+86 123 456 7890"/>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="restaurant-website">Website</Label>
                        <Input id="restaurant-website" defaultValue="https://vodangpizza.com"/>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="restaurant-address">Address</Label>
                      <Textarea id="restaurant-address" defaultValue="Wudang Mountain, Hubei, China"/>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="restaurant-city">City</Label>
                        <Input id="restaurant-city" defaultValue="Shiyan"/>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="restaurant-state">State/Province</Label>
                        <Input id="restaurant-state" defaultValue="Hubei"/>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="restaurant-zip">Postal Code</Label>
                        <Input id="restaurant-zip" defaultValue="442700"/>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="restaurant-country">Country</Label>
                      <Select defaultValue="china">
                        <SelectTrigger id="restaurant-country">
                          <SelectValue placeholder="Select country"/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="china">China</SelectItem>
                          <SelectItem value="usa">United States</SelectItem>
                          <SelectItem value="canada">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="australia">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="bg-primary hover:bg-primary/90">
                    <Save className="mr-2 h-4 w-4"/>
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                  <CardDescription>Set your restaurant's operating hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <div key={day} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Switch id={`${day.toLowerCase()}-open`} defaultChecked={day !== "Sunday"}/>
                            <Label htmlFor={`${day.toLowerCase()}-open`}>{day}</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Select defaultValue={day === "Sunday" ? "" : "10:00"}>
                              <SelectTrigger className="w-[110px]">
                                <SelectValue placeholder="Opening"/>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="08:00">8:00 AM</SelectItem>
                                <SelectItem value="09:00">9:00 AM</SelectItem>
                                <SelectItem value="10:00">10:00 AM</SelectItem>
                                <SelectItem value="11:00">11:00 AM</SelectItem>
                              </SelectContent>
                            </Select>
                            <span>to</span>
                            <Select defaultValue={day === "Sunday" ? "" : "22:00"}>
                              <SelectTrigger className="w-[110px]">
                                <SelectValue placeholder="Closing"/>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="20:00">8:00 PM</SelectItem>
                                <SelectItem value="21:00">9:00 PM</SelectItem>
                                <SelectItem value="22:00">10:00 PM</SelectItem>
                                <SelectItem value="23:00">11:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="bg-primary hover:bg-primary/90">
                    <Save className="mr-2 h-4 w-4"/>
                    Save Hours
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to be notified</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4 text-muted-foreground"/>
                        <Label htmlFor="new-order">New Order Notifications</Label>
                      </div>
                      <Switch id="new-order" defaultChecked/>
                    </div>
                    <Separator/>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground"/>
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                      </div>
                      <Switch id="email-notifications" defaultChecked/>
                    </div>
                    <Separator/>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground"/>
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      </div>
                      <Switch id="sms-notifications"/>
                    </div>
                    <Separator/>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-muted-foreground"/>
                        <Label htmlFor="browser-notifications">Browser Notifications</Label>
                      </div>
                      <Switch id="browser-notifications" defaultChecked/>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="bg-primary hover:bg-primary/90">
                    <Save className="mr-2 h-4 w-4"/>
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Change your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password"/>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password"/>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password"/>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="bg-primary hover:bg-primary/90">
                    <Lock className="mr-2 h-4 w-4"/>
                    Update Password
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>Manage your billing details and payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="rounded-full bg-muted p-2">
                            <CreditCard className="h-4 w-4"/>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Visa ending in 4242</p>
                            <p className="text-xs text-muted-foreground">Expires 04/2025</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <CreditCard className="mr-2 h-4 w-4"/>
                      Add Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Manage your team and their access permissions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {[
                      {name: "Master Wong", email: "wong@vodangpizza.com", role: "Owner"},
                      {name: "Sifu Chen", email: "chen@vodangpizza.com", role: "Manager"},
                      {name: "Apprentice Wu", email: "wu@vodangpizza.com", role: "Staff"},
                    ].map((member, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src="/placeholder-user.jpg" alt={member.name}/>
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{member.name}</p>
                              <p className="text-xs text-muted-foreground">{member.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{member.role}</Badge>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4"/>
                            </Button>
                          </div>
                        </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      <Users className="mr-2 h-4 w-4"/>
                      Invite Team Member
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>

  )
}

