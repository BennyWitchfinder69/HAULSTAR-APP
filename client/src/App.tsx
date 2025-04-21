import { useContext } from "react";
import { Switch, Route, useLocation, Link } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppContext } from "./context/AppContext";
import { Button } from "@/components/ui/button";
import { Truck, DollarSign, ChevronRight } from "lucide-react";
import AdvertisementSpace from "./components/AdvertisementSpace";

function HomePage() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <a className="flex items-center space-x-2">
                <div className="w-10 h-10 overflow-hidden">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <span className="text-xl font-bold tracking-tight">HAULSTAR</span>
              </a>
            </Link>
          </div>
          
          <nav className="flex items-center gap-4">
            <Button onClick={() => setLocation("/dashboard")} variant="ghost">
              Demo
            </Button>
            <Button onClick={() => setLocation("/login")}>
              Get Started
            </Button>
          </nav>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-background">
          <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Financial Management for Professional Truckers
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Track your miles, expenses, and income. Plan your finances and reach your goals while on the road.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button onClick={() => setLocation("/dashboard")} size="lg">
                  Try Demo <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-sm">
                <AdvertisementSpace 
                  placement="dashboard_top"
                  className="mx-auto shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Built for Truckers
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  All the tools you need to take control of your finances on the road
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Role-Specific Features</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Customized tools for company drivers and owner-operators
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Income Tracking</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Record miles, loads, and earnings with detailed reports
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Dashboard Analytics</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Visualize your financial data with clear, interactive charts
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground md:text-base">
            © 2025 HaulStar. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms">
              <a className="text-sm text-muted-foreground hover:underline md:text-base">
                Terms
              </a>
            </Link>
            <Link href="/privacy">
              <a className="text-sm text-muted-foreground hover:underline md:text-base">
                Privacy
              </a>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function DashboardPage() {
  const { state } = useContext(AppContext);
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <a className="flex items-center space-x-2">
                <div className="w-10 h-10 overflow-hidden">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <span className="text-xl font-bold tracking-tight">HAULSTAR</span>
              </a>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard">
              <a className="text-sm font-medium hover:text-primary">Dashboard</a>
            </Link>
            <Link href="/expenses">
              <a className="text-sm font-medium hover:text-primary">Expenses</a>
            </Link>
            <Link href="/income">
              <a className="text-sm font-medium hover:text-primary">Income</a>
            </Link>
            <Link href="/goals">
              <a className="text-sm font-medium hover:text-primary">Goals</a>
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 p-6">
        <div className="container mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to HaulStar</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <img
                src={"/assets/DALL·E 2025-04-20 19.01.44 - Logo for 'HaulStar' featuring a cab-over semi-truck inspired by the classic Kenworth K100 truck design. The truck should have a flat-nose, squared fro.webp"}
                alt="Dashboard Preview"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <AdvertisementSpace 
                placement="dashboard_sidebar"
                className="h-full"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <AdvertisementSpace 
              placement="dashboard_bottom"
              className="w-full"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/:rest*">
              <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
                <p className="mb-8">The page you're looking for doesn't exist.</p>
                <Link href="/">
                  <Button>Go Back Home</Button>
                </Link>
              </div>
            </Route>
          </Switch>
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;