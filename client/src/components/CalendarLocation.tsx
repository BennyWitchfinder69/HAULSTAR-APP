import { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
    }
  }, []);
  
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
    setIsHomeDialogOpen(false);
  };
  
  return (
    <Card className={`border-2 border-turquoise overflow-hidden text-center ${className}`}>
      <CardContent className="p-4">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex items-center gap-3 w-full justify-center">
            <Calendar className="h-6 w-6 text-turquoise" />
            <span className="font-bold text-lg">{format(currentTime, "EEEE, MMMM d, yyyy")}</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-orange" />
              <span className="font-bold text-lg">{format(currentTime, "h:mm a")}</span>
            </div>
            
            <div className="flex items-center gap-3 justify-center">
              {homeLocation ? (
                <div className="flex items-center gap-2">
                  <Home className="h-6 w-6 text-gold" />
                  <span className="font-semibold">{homeLocation}</span>
                  <Dialog open={isHomeDialogOpen} onOpenChange={setIsHomeDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-turquoise/10 hover:bg-turquoise/20">
                        <MapPin className="h-4 w-4 text-turquoise" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="border-2 border-turquoise">
                      <DialogHeader className="center-all">
                        <DialogTitle className="text-2xl font-bold text-turquoise">Set Home Location</DialogTitle>
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
              ) : (
                <Dialog open={isHomeDialogOpen} onOpenChange={setIsHomeDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-sm h-9 border-2 border-gold text-gold font-bold"
                    >
                      <Home className="h-4 w-4 mr-2" /> Set Home
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="border-2 border-turquoise">
                    <DialogHeader className="center-all">
                      <DialogTitle className="text-2xl font-bold text-turquoise">Set Home Location</DialogTitle>
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
              )}
              
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
              
              {locationStatus === "success" && location && (
                <span className="font-semibold text-orange flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-orange" /> 
                  Location Active
                </span>
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}