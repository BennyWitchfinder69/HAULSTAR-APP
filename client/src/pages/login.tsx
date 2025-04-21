import { useState, useContext } from "react";
import { useLocation } from "wouter";
import { AppContext } from "../context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRole } from "../types";
import { Truck, TruckIcon, Loader2 } from "lucide-react";

export default function LoginPage() {
  const { setSignedIn, setRole } = useContext(AppContext);
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("signin");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"auth" | "role">("auth");
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  // Handle sign in or sign up
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      setSignedIn(true);
      setStep("role");
    }, 1000);
  };

  // Handle role selection
  const handleRoleSubmit = () => {
    if (!selectedRole) return;
    
    setIsLoading(true);
    
    // Simulate processing
    setTimeout(() => {
      setRole(selectedRole);
      setIsLoading(false);
      setLocation("/dashboard");
    }, 800);
  };

  // Skip auth for demo purposes
  const handleSkip = () => {
    setSignedIn(true);
    setStep("role");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-b from-background to-muted">
      <div className="w-full max-w-md">
        {step === "auth" ? (
          <>
            <div className="mb-8 text-center">
              <div className="w-20 h-20 mx-auto mb-4">
                <img 
                  src="/assets/haulstar-logo.svg"
                  alt="HaulStar"
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">HAULSTAR</h1>
              <p className="text-muted-foreground mt-2">
                Financial management for professional drivers
              </p>
            </div>

            <Tabs defaultValue="signin" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <Card>
                  <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>
                      Access your HaulStar account
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleAuth}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="email@example.com" type="email" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" placeholder="••••••••" type="password" required />
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full"
                        onClick={handleSkip}
                      >
                        Continue without account
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              <TabsContent value="signup">
                <Card>
                  <CardHeader>
                    <CardTitle>Create Account</CardTitle>
                    <CardDescription>
                      Join HaulStar today
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleAuth}>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="John" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Doe" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="email@example.com" type="email" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" placeholder="••••••••" type="password" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" placeholder="••••••••" type="password" required />
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full"
                        onClick={handleSkip}
                      >
                        Continue without account
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Select Your Role</CardTitle>
              <CardDescription>
                Choose the option that best describes your current position
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedRole === "company"
                      ? "border-primary bg-primary/10"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedRole("company")}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/20 rounded-full">
                      <Truck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Company Driver</h3>
                      <p className="text-sm text-muted-foreground">
                        I work for a trucking company
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedRole === "owner"
                      ? "border-primary bg-primary/10"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedRole("owner")}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/20 rounded-full">
                      <TruckIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Owner Operator</h3>
                      <p className="text-sm text-muted-foreground">
                        I own my truck and operate independently
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={!selectedRole || isLoading}
                onClick={handleRoleSubmit}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}