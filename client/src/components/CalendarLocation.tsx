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
    <Card className={`border border-turquoise/30 overflow-hidden ${className}`}>
      <CardContent className="p-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-turquoise" />
            <span className="font-medium">{format(currentTime, "EEEE, MMMM d, yyyy")}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-coral" />
              <span className="font-medium">{format(currentTime, "h:mm a")}</span>
            </div>
            
            <div className="flex items-center gap-2">
              {homeLocation ? (
                <div className="flex items-center gap-1">
                  <Home className="h-5 w-5 text-primary" />
                  <span className="text-sm">{homeLocation}</span>
                  <Dialog open={isHomeDialogOpen} onOpenChange={setIsHomeDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                        <MapPin className="h-3.5 w-3.5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Set Home Location</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-2">
                        <Input 
                          placeholder="Enter home location (e.g., City, State)" 
                          value={homeLocation}
                          onChange={(e) => setHomeLocation(e.target.value)}
                        />
                        <Button 
                          className="w-full bg-gradient-to-r from-turquoise to-primary text-black"
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
                      className="text-xs h-8 border-dashed border-turquoise/50 text-turquoise"
                    >
                      <Home className="h-3.5 w-3.5 mr-1" /> Set Home
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Set Home Location</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <Input 
                        placeholder="Enter home location (e.g., City, State)" 
                        value={homeLocation}
                        onChange={(e) => setHomeLocation(e.target.value)}
                      />
                      <Button 
                        className="w-full bg-gradient-to-r from-turquoise to-primary text-black"
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
                  className="text-xs h-8 border-coral/50 text-coral"
                  onClick={getLocation}
                >
                  <MapPin className="h-3.5 w-3.5 mr-1" /> Enable GPS
                </Button>
              )}
              
              {locationStatus === "loading" && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs h-8 border-coral/50 text-coral"
                  disabled
                >
                  <span className="animate-spin h-3.5 w-3.5 mr-1 border-2 border-coral border-r-transparent rounded-full"></span>
                  Loading...
                </Button>
              )}
              
              {locationStatus === "success" && location && (
                <span className="text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 inline-block text-coral" /> 
                  Location found
                </span>
              )}
              
              {locationStatus === "error" && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs h-8 border-red-500/50 text-red-500"
                  onClick={getLocation}
                >
                  <MapPin className="h-3.5 w-3.5 mr-1" /> Retry GPS
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}