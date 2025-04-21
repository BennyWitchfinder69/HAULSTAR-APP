import { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, Home, Cloud, Sun, CloudRain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

interface CalendarLocationProps {
  className?: string;
}

export default function CalendarLocation({ className = "" }: CalendarLocationProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [homeLocation, setHomeLocation] = useState<string>("");
  const [location, setLocation] = useState<{lat: number; lon: number} | null>(null);
  const [locationStatus, setLocationStatus] = useState("idle");
  const [isHomeDialogOpen, setIsHomeDialogOpen] = useState(false);
  const [currentLocationName, setCurrentLocationName] = useState("");
  const [homeWeather, setHomeWeather] = useState<{temp: string, condition: string}>({temp: "72°F", condition: "Sunny"});
  const [currentWeather, setCurrentWeather] = useState<{temp: string, condition: string}>({temp: "68°F", condition: "Cloudy"});
  
  // Update the time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Load saved home location from localStorage
  useEffect(() => {
    const savedLocation = localStorage.getItem("homeLocation");
    if (savedLocation) {
      setHomeLocation(savedLocation);
      // Simulate weather for home
      simulateHomeWeather();
    }
  }, []);
  
  // Simulate weather data for demo purposes
  const simulateHomeWeather = () => {
    const conditions = ["Sunny", "Partly Cloudy", "Cloudy", "Rainy"];
    const temps = ["65°F", "68°F", "72°F", "75°F", "78°F"];
    
    setHomeWeather({
      temp: temps[Math.floor(Math.random() * temps.length)],
      condition: conditions[Math.floor(Math.random() * conditions.length)]
    });
  };
  
  // Simulate weather for current location
  const simulateCurrentWeather = () => {
    const conditions = ["Sunny", "Partly Cloudy", "Cloudy", "Rainy"];
    const temps = ["62°F", "65°F", "70°F", "73°F", "76°F"];
    
    setCurrentWeather({
      temp: temps[Math.floor(Math.random() * temps.length)],
      condition: conditions[Math.floor(Math.random() * conditions.length)]
    });
    
    // Set a random city name for demo
    const cities = ["Atlanta, GA", "Nashville, TN", "Chicago, IL", "Dallas, TX", "Phoenix, AZ"];
    setCurrentLocationName(cities[Math.floor(Math.random() * cities.length)]);
  };
  
  // Function to request the user's location
  const getLocation = () => {
    setLocationStatus("loading");
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
          setLocationStatus("success");
          simulateCurrentWeather(); // Simulate weather for the current location
        },
        (error) => {
          console.error("Error getting location", error);
          setLocationStatus("error");
        }
      );
    } else {
      setLocationStatus("error");
    }
  };
  
  // Save home location to localStorage
  const saveHomeLocation = () => {
    localStorage.setItem("homeLocation", homeLocation);
    simulateHomeWeather(); // Simulate weather for the new home location
    setIsHomeDialogOpen(false);
  };
  
  // Helper function to render weather icon based on condition
  const renderWeatherIcon = (condition: string) => {
    switch(condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="h-5 w-5 text-gold" />;
      case 'cloudy':
      case 'partly cloudy':
        return <Cloud className="h-5 w-5 text-turquoise" />;
      case 'rainy':
        return <CloudRain className="h-5 w-5 text-orange" />;
      default:
        return <Sun className="h-5 w-5 text-gold" />;
    }
  };
  
  return (
    <Card className={`border-2 border-turquoise overflow-hidden text-center ${className}`}>
      <CardContent className="p-4">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex items-center gap-3 w-full justify-center">
            <Calendar className="h-6 w-6 text-turquoise" />
            <span className="font-bold text-lg">{format(currentTime, "EEEE, MMMM d, yyyy")}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Home location side */}
            <div className="border-2 border-gold rounded-lg p-3 text-center">
              <div className="font-bold text-lg mb-2 text-gold">HOME BASE</div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                  <Home className="h-6 w-6 text-gold" />
                  {homeLocation ? (
                    <span className="font-semibold">{homeLocation}</span>
                  ) : (
                    <span className="text-muted-foreground italic">No home set</span>
                  )}
                </div>

                {homeLocation && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gold" />
                    <span className="font-semibold">{format(currentTime, "h:mm a")}</span>
                    {renderWeatherIcon(homeWeather.condition)}
                    <span className="font-semibold">{homeWeather.temp}</span>
                  </div>
                )}
                
                <Dialog open={isHomeDialogOpen} onOpenChange={setIsHomeDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-sm h-8 mt-2 border-2 border-gold text-gold font-bold"
                    >
                      {homeLocation ? "Update Home" : "Set Home"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="border-2 border-turquoise">
                    <DialogHeader className="center-all">
                      <DialogTitle className="text-2xl font-bold text-turquoise">Set Home Location</DialogTitle>
                      <DialogDescription className="text-center">
                        Enter your home location for weather updates
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <Input 
                        placeholder="Enter home location (e.g., City, State)" 
                        value={homeLocation}
                        onChange={(e) => setHomeLocation(e.target.value)}
                        className="border-2 border-gold font-medium"
                      />
                      <Button 
                        className="w-full bg-gradient-to-r from-turquoise to-gold text-black font-bold text-base"
                        onClick={saveHomeLocation}
                      >
                        Save Location
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            {/* Current location side */}
            <div className="border-2 border-orange rounded-lg p-3 text-center">
              <div className="font-bold text-lg mb-2 text-orange">CURRENT LOCATION</div>
              
              {locationStatus === "success" && location ? (
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-6 w-6 text-orange" />
                    <span className="font-semibold">{currentLocationName}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange" />
                    <span className="font-semibold">{format(currentTime, "h:mm a")}</span>
                    {renderWeatherIcon(currentWeather.condition)}
                    <span className="font-semibold">{currentWeather.temp}</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  {locationStatus === "idle" && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-sm h-9 border-2 border-orange text-orange font-bold"
                      onClick={getLocation}
                    >
                      <MapPin className="h-4 w-4 mr-2" /> Enable GPS
                    </Button>
                  )}
                  
                  {locationStatus === "loading" && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-sm h-9 border-2 border-orange text-orange font-bold"
                      disabled
                    >
                      <span className="animate-spin h-4 w-4 mr-2 border-2 border-orange border-r-transparent rounded-full"></span>
                      Loading...
                    </Button>
                  )}
                  
                  {locationStatus === "error" && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-sm h-9 border-2 border-orange text-orange font-bold"
                      onClick={getLocation}
                    >
                      <MapPin className="h-4 w-4 mr-2" /> Retry GPS
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}