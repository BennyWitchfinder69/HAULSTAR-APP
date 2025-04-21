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
import TruckerPathIntegration from "./components/TruckerPathIntegration";
import MobileNav from "./components/MobileNav";
import CalendarLocation from "./components/CalendarLocation";

function HomePage() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen text-center bg-logo">
      <header className="border-b-2 border-turquoise bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto text-center py-4">
          <div className="flex justify-center items-center mb-4">
            <Link href="/">
              <a className="flex flex-col items-center gap-1">
                <div className="logo-container">
                  <img 
                    src="/src/assets/haulstar-logo-main.webp" 
                    alt="HaulStar Logo" 
                    className="w-full h-auto"
                  />
                </div>
              </a>
            </Link>
          </div>
          
          <nav className="flex justify-center items-center gap-6 mb-4">
            <Button 
              onClick={() => setLocation("/dashboard")} 
              variant="outline" 
              className="border-2 border-turquoise text-turquoise hover:bg-turquoise/10 font-bold"
            >
              Demo
            </Button>
            <Button 
              onClick={() => setLocation("/login")} 
              className="bg-gradient-to-r from-turquoise to-orange text-white border-none font-bold"
            >
              Get Started
            </Button>
          </nav>
          
          {/* Calendar and location bar */}
          <div className="container py-2">
            <CalendarLocation />
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-8 bg-gradient-to-r from-turquoise via-gold to-orange bg-clip-text text-transparent">
                Financial Management for Professional Truckers
              </h1>
              
              <div className="flex justify-center gap-4 mb-8">
                <span className="bg-gold text-black text-lg font-bold px-5 py-1.5 rounded-full">
                  100% FREE
                </span>
                <span className="bg-turquoise text-white text-lg font-bold px-5 py-1.5 rounded-full">
                  Created By Truckers
                </span>
              </div>
              
              <p className="text-xl font-medium mx-auto mb-10 max-w-2xl">
                Track your miles, expenses, and income. Plan your finances and reach your goals while on the road. 
                <span className="block mt-3 text-orange font-bold">Designed by expert truckers who understand your professional needs.</span>
              </p>
              
              <div className="flex justify-center mb-12">
                <Button 
                  onClick={() => setLocation("/dashboard")} 
                  size="lg" 
                  className="bg-gradient-to-r from-turquoise to-gold text-black border-none font-bold text-lg h-14 px-10"
                >
                  Try Demo <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <div className="w-full max-w-lg mx-auto">
                <AdvertisementSpace 
                  placement="dashboard_top"
                  className="mx-auto shadow-lg border-2 border-gold rounded-lg overflow-hidden"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-16 lg:py-20 bg-muted">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="text-center mb-12">
              <div className="inline-block rounded-full bg-gold px-6 py-2 text-base text-black font-bold mb-6">
                Key Features
              </div>
              
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 bg-gradient-to-r from-turquoise to-orange bg-clip-text text-transparent">
                Built for Truckers
              </h2>
              
              <p className="text-xl font-medium max-w-2xl mx-auto">
                All the tools you need to take control of your finances on the road
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto">
              <div className="flex-1 flex flex-col items-center space-y-4 rounded-xl border-2 border-turquoise bg-background p-6">
                <div className="rounded-full bg-turquoise/10 p-3">
                  <Truck className="h-8 w-8 text-turquoise" />
                </div>
                <h3 className="text-2xl font-bold">Role-Specific</h3>
                <p className="text-base font-medium text-center">
                  Customized tools for company drivers and owner-operators
                </p>
              </div>
              
              <div className="flex-1 flex flex-col items-center space-y-4 rounded-xl border-2 border-gold bg-background p-6">
                <div className="rounded-full bg-gold/10 p-3">
                  <DollarSign className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-2xl font-bold">Income Tracking</h3>
                <p className="text-base font-medium text-center">
                  Record miles, loads, and earnings with detailed reports
                </p>
              </div>
              
              <div className="flex-1 flex flex-col items-center space-y-4 rounded-xl border-2 border-orange bg-background p-6">
                <div className="rounded-full bg-orange/10 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Analytics</h3>
                <p className="text-base font-medium text-center">
                  Visualize your financial data with clear, interactive charts
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t-2 border-turquoise py-8 text-center">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <p className="text-base font-bold">
              © 2025 HaulStar. All rights reserved.
            </p>
            <p className="text-lg font-bold mt-2">
              <span className="text-gold">Created by professional truckers</span>
              <span className="mx-2">for</span>
              <span className="text-turquoise">professional drivers</span>
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center gap-4 mb-4">
              <span className="bg-gold text-black px-4 py-1 rounded-full text-base font-bold">
                100% FREE
              </span>
              <span className="bg-orange text-white px-4 py-1 rounded-full text-base font-bold">
                No Ads for Pro Users
              </span>
            </div>
            
            <div className="flex justify-center gap-8">
              <Link href="/terms">
                <a className="text-base font-medium text-turquoise hover:underline">
                  Terms
                </a>
              </Link>
              <Link href="/privacy">
                <a className="text-base font-medium text-orange hover:underline">
                  Privacy
                </a>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function DashboardPage() {
  const { state } = useContext(AppContext);
  
  return (
    <div className="flex flex-col min-h-screen text-center bg-logo">
      <header className="border-b-2 border-turquoise bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto text-center py-4">
          <div className="flex justify-center items-center mb-4">
            <Link href="/">
              <a className="flex flex-col items-center gap-1">
                <div className="logo-container">
                  <img 
                    src="/src/assets/haulstar-logo-main.webp" 
                    alt="HaulStar Logo" 
                    className="w-full h-auto"
                  />
                </div>
              </a>
            </Link>
          </div>
          
          <nav className="hidden md:flex justify-center items-center gap-10 mb-4">
            <Link href="/dashboard">
              <a className="text-lg font-bold text-turquoise hover:underline">Dashboard</a>
            </Link>
            <Link href="/expenses">
              <a className="text-lg font-bold text-orange hover:underline">Expenses</a>
            </Link>
            <Link href="/income">
              <a className="text-lg font-bold text-gold hover:underline">Income</a>
            </Link>
            <Link href="/goals">
              <a className="text-lg font-bold text-turquoise hover:underline">Goals</a>
            </Link>
          </nav>
          
          {/* Calendar and location bar */}
          <div className="container py-2">
            <CalendarLocation />
          </div>
        </div>
      </header>
      
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto text-center">
          {/* Centered header with dashboard title */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-turquoise via-gold to-orange bg-clip-text text-transparent inline-block">Dashboard</h1>
            <div className="w-40 h-2 mx-auto mt-4 bg-gradient-to-r from-turquoise to-orange rounded-full"></div>
            <p className="font-bold text-xl mt-4">Welcome to HaulStar</p>
          </div>
          
          {/* Top ad - full width and centered */}
          <div className="mb-12 flex justify-center">
            <AdvertisementSpace 
              placement="dashboard_top"
              className="w-full max-w-[800px] rounded-lg overflow-hidden shadow-lg border-2 border-gold"
            />
          </div>
          
          {/* Three feature boxes in a row on desktop */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
            <div className="flex-1 flex flex-col items-center space-y-4 rounded-xl border-2 border-turquoise bg-background p-6">
              <div className="rounded-full bg-turquoise/10 p-3">
                <Truck className="h-8 w-8 text-turquoise" />
              </div>
              <h3 className="text-2xl font-bold">Trucker Path</h3>
              <p className="text-base font-medium text-center">
                Find truck stops, fuel, parking, and weigh stations
              </p>
            </div>
            
            <div className="flex-1 flex flex-col items-center space-y-4 rounded-xl border-2 border-gold bg-background p-6">
              <div className="rounded-full bg-gold/10 p-3">
                <DollarSign className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-2xl font-bold">Income Tracking</h3>
              <p className="text-base font-medium text-center">
                Record miles, loads, and earnings with detailed reports
              </p>
            </div>
            
            <div className="flex-1 flex flex-col items-center space-y-4 rounded-xl border-2 border-orange bg-background p-6">
              <div className="rounded-full bg-orange/10 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Analytics</h3>
              <p className="text-base font-medium text-center">
                Visualize your financial data with clear, interactive charts
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Main content area */}
            <div className="md:col-span-8 flex flex-col items-center gap-8">
              <div className="bg-muted rounded-xl border-2 border-gold p-6 flex justify-center items-center w-full">
                <img
                  src="/src/assets/haulstar-logo-main.webp"
                  alt="HaulStar Logo"
                  className="w-full max-w-[500px] h-auto rounded-lg shadow-lg"
                />
              </div>
              
              {/* Double ad space in the main content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <AdvertisementSpace 
                  placement="dashboard_sidebar"
                  className="h-full min-h-[200px] rounded-lg overflow-hidden shadow-lg border-2 border-orange"
                />
                <AdvertisementSpace 
                  placement="income_page"
                  className="h-full min-h-[200px] rounded-lg overflow-hidden shadow-lg border-2 border-turquoise"
                />
              </div>
              
              {/* Bottom full width ad */}
              <AdvertisementSpace 
                placement="dashboard_bottom"
                className="w-full rounded-lg overflow-hidden shadow-lg border-2 border-gold"
              />
            </div>
            
            {/* Sidebar */}
            <div className="md:col-span-4 flex flex-col items-center gap-8">
              {/* Import and use the TruckerPathIntegration component */}
              <TruckerPathIntegration className="w-full" />
              
              {/* Side advertisement */}
              <AdvertisementSpace 
                placement="expenses_page"
                className="w-full min-h-[250px] rounded-lg overflow-hidden shadow-lg border-2 border-orange"
              />
              
              {/* Quick tips section */}
              <div className="bg-muted rounded-xl border-2 border-turquoise p-6 w-full">
                <h3 className="font-bold text-2xl mb-6 text-center bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">Quick Tips</h3>
                <ul className="text-base space-y-4 text-center">
                  <li className="flex items-center">
                    <span className="inline-block bg-turquoise/20 text-turquoise rounded-full p-1.5 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="font-bold">Log your miles daily for more accurate reports</span>
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block bg-gold/20 text-gold rounded-full p-1.5 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="font-bold">Keep receipts for all business expenses</span>
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block bg-orange/20 text-orange rounded-full p-1.5 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="font-bold">Plan ahead for quarterly tax payments</span>
                  </li>
                </ul>
              </div>
              
              {/* Additional ad space */}
              <AdvertisementSpace 
                placement="goals_page"
                className="w-full min-h-[180px] rounded-lg overflow-hidden shadow-lg border-2 border-gold"
              />
            </div>
          </div>
        </div>
      </main>
      
      {/* Add Mobile Navigation */}
      <MobileNav />
      
      {/* Extra padding at the bottom for mobile to account for the navigation */}
      <div className="h-16 md:hidden"></div>
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