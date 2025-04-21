import { useContext } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, DollarSign, TrendingUp, Shield } from "lucide-react";
import { AppContext } from "../context/AppContext";

export default function HomePage() {
  const { state } = useContext(AppContext);
  const [, setLocation] = useLocation();
  
  const handleGetStarted = () => {
    if (state.signedIn) {
      setLocation("/dashboard");
    } else {
      setLocation("/login");
    }
  };
  
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Financial Freedom for Truckers
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Track income, manage expenses, and reach your financial goals on the road. 
                  Take control of your finances with the app built for professional drivers.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button onClick={handleGetStarted} size="lg" className="gap-1.5">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px]">
                <img
                  src="/assets/haulstar-logo.svg"
                  alt="HaulStar App"
                  className="mx-auto w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Features Built for Truckers</h2>
            <p className="max-w-[85%] text-muted-foreground sm:text-lg">
              Everything you need to manage your finances on the road
            </p>
          </div>
          <div className="mx-auto grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 mt-12">
            {/* Feature 1 */}
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 shadow-sm">
              <div className="p-2 rounded-full bg-primary/10">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold">Specialized for Truckers</h3>
              <p className="text-sm text-muted-foreground text-center">
                Tailored features for company drivers and owner-operators
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 shadow-sm">
              <div className="p-2 rounded-full bg-primary/10">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold">Income Tracking</h3>
              <p className="text-sm text-muted-foreground text-center">
                Log miles, loads, and earnings with detailed reports
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 shadow-sm">
              <div className="p-2 rounded-full bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold">Goal Setting</h3>
              <p className="text-sm text-muted-foreground text-center">
                Visualize progress towards your financial objectives
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 shadow-sm">
              <div className="p-2 rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold">Tax Calculations</h3>
              <p className="text-sm text-muted-foreground text-center">
                Stay prepared with built-in tax estimations
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to Take Control?</h2>
            <p className="max-w-[85%] text-muted-foreground sm:text-lg">
              Join thousands of professional drivers managing their finances with HaulStar
            </p>
            <Button onClick={handleGetStarted} size="lg" className="mt-6">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}