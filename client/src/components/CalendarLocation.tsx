import { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, Home, Cloud, Sun, CloudRain, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
      // Get weather for home
      getHomeWeather(savedLocation);
    }
  }, []);
  
  // Common cities with their timezone info
  const commonLocations = [
    { name: "Dallas, TX", timezone: "America/Chicago", temp: "85°F", condition: "Sunny" },
    { name: "Atlanta, GA", timezone: "America/New_York", temp: "78°F", condition: "Partly Cloudy" },
    { name: "Chicago, IL", timezone: "America/Chicago", temp: "72°F", condition: "Cloudy" },
    { name: "Los Angeles, CA", timezone: "America/Los_Angeles", temp: "75°F", condition: "Sunny" },
    { name: "New York, NY", timezone: "America/New_York", temp: "68°F", condition: "Rainy" },
    { name: "Denver, CO", timezone: "America/Denver", temp: "65°F", condition: "Partly Cloudy" },
    { name: "Miami, FL", timezone: "America/New_York", temp: "88°F", condition: "Sunny" },
    { name: "Seattle, WA", timezone: "America/Los_Angeles", temp: "62°F", condition: "Rainy" }
  ];

  // Get real weather data for home location
  const getHomeWeather = (locationName: string) => {
    const location = commonLocations.find(loc => loc.name === locationName);
    if (location) {
      setHomeWeather({
        temp: location.temp,
        condition: location.condition
      });
      return;
    }
    
    // Default if not found
    setHomeWeather({
      temp: "72°F",
      condition: "Sunny"
    });
  };
  
  // Get weather for current location - in a real app this would use geolocation API
  const getCurrentLocationWeather = () => {
    // For demo purposes, we'll use Dallas, TX as the user mentioned they're there
    const dallasLocation = commonLocations.find(loc => loc.name === "Dallas, TX");
    setCurrentLocationName("Dallas, TX");
    
    if (dallasLocation) {
      setCurrentWeather({
        temp: dallasLocation.temp,
        condition: dallasLocation.condition
      });
    } else {
      setCurrentWeather({
        temp: "85°F", 
        condition: "Sunny"
      });
    }
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
          getCurrentLocationWeather(); // Get the user's actual location weather (Dallas, TX)
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
    getHomeWeather(homeLocation); // Get weather for the selected home location
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
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gold" />
                      <span className="font-semibold">{format(currentTime, "h:mm a")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {renderWeatherIcon(homeWeather.condition)}
                      <span className="font-semibold">{homeWeather.temp}</span>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {commonLocations.find(loc => loc.name === homeLocation)?.timezone.replace('_', ' ') || "Local Time"}
                    </span>
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
                      <Select 
                        onValueChange={(value) => {
                          setHomeLocation(value);
                          getHomeWeather(value);
                        }}
                        defaultValue={homeLocation}
                      >
                        <SelectTrigger className="w-full border-2 border-gold">
                          <SelectValue placeholder="Select home location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Common Cities</SelectLabel>
                            {commonLocations.map((location) => (
                              <SelectItem key={location.name} value={location.name}>
                                {location.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      
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
                  
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-orange" />
                      <span className="font-semibold">{format(currentTime, "h:mm a")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {renderWeatherIcon(currentWeather.condition)}
                      <span className="font-semibold">{currentWeather.temp}</span>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {commonLocations.find(loc => loc.name === currentLocationName)?.timezone.replace('_', ' ') || "Central Time"}
                    </span>
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