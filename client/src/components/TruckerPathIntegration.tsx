import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin, Fuel, ParkingCircle, Scale } from "lucide-react";

interface TruckerPathIntegrationProps {
  className?: string;
}

export default function TruckerPathIntegration({ className = "" }: TruckerPathIntegrationProps) {
  // List of Trucker Path links
  const truckerPathLinks = [
    {
      title: "Truck Stops",
      description: "Find nearby truck stops with amenities and reviews",
      url: "https://truckerpath.com/truck-stops/",
      icon: <MapPin className="h-5 w-5" />
    },
    {
      title: "Fuel Prices",
      description: "Compare the cheapest diesel prices on your route",
      url: "https://truckerpath.com/fuel/",
      icon: <Fuel className="h-5 w-5" />
    },
    {
      title: "Parking",
      description: "Locate available truck parking spots near you",
      url: "https://truckerpath.com/parking/",
      icon: <ParkingCircle className="h-5 w-5" />
    },
    {
      title: "Weigh Stations",
      description: "Get real-time weigh station status updates",
      url: "https://truckerpath.com/weigh-stations/",
      icon: <Scale className="h-5 w-5" />
    }
  ];

  return (
    <Card className={`border border-muted-foreground/20 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span>Trucker Path Tools</span>
          <img 
            src="/assets/truckerpath-logo.png" 
            alt="Trucker Path Logo"
            className="h-6 w-auto opacity-70"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </CardTitle>
        <CardDescription>
          Access essential road tools from Trucker Path
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {truckerPathLinks.map((link, index) => (
            <a 
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <Button 
                variant="outline" 
                className="w-full h-auto py-3 px-4 justify-start gap-3 group hover:border-primary"
              >
                <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20">
                  {link.icon}
                </div>
                <div className="text-left">
                  <div className="font-medium flex items-center">
                    {link.title}
                    <ExternalLink className="ml-1.5 h-3.5 w-3.5 opacity-70" />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {link.description}
                  </div>
                </div>
              </Button>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}