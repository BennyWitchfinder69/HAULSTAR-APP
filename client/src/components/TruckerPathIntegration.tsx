import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin, Fuel, ParkingCircle, Scale, Truck } from "lucide-react";

interface TruckerPathIntegrationProps {
  className?: string;
}

export default function TruckerPathIntegration({ className = "" }: TruckerPathIntegrationProps) {
  // Function to handle direct feature access
  const handleFeatureClick = (feature: string) => {
    // In a real app, these would directly access the features through an API
    // instead of directing to the sign-up page
    switch(feature) {
      case 'truck_stops':
        window.open('https://truckerpath.com/trucker-tools-app/truck-stops/', '_blank');
        break;
      case 'fuel':
        window.open('https://truckerpath.com/trucker-tools-app/fuel-prices/', '_blank');
        break;
      case 'parking':
        window.open('https://truckerpath.com/trucker-tools-app/truck-parking/', '_blank');
        break;
      case 'weigh_stations':
        window.open('https://truckerpath.com/trucker-tools-app/weigh-stations/', '_blank');
        break;
      default:
        window.open('https://truckerpath.com/trucker-tools-app/', '_blank');
    }
  };

  // List of Trucker Path links with specific brand colors
  const truckerPathLinks = [
    {
      title: "Truck Stops",
      description: "Find nearby truck stops with amenities and reviews",
      feature: "truck_stops",
      icon: <MapPin className="h-6 w-6" />,
      color: "turquoise"
    },
    {
      title: "Fuel Prices",
      description: "Compare the cheapest diesel prices on your route",
      feature: "fuel",
      icon: <Fuel className="h-6 w-6" />,
      color: "gold"
    },
    {
      title: "Parking",
      description: "Locate available truck parking spots near you",
      feature: "parking",
      icon: <ParkingCircle className="h-6 w-6" />,
      color: "orange"
    },
    {
      title: "Weigh Stations",
      description: "Get real-time weigh station status updates",
      feature: "weigh_stations",
      icon: <Scale className="h-6 w-6" />,
      color: "turquoise"
    }
  ];

  return (
    <Card className={`border-2 border-turquoise ${className}`}>
      <CardHeader className="pb-3 text-center">
        <CardTitle className="text-2xl font-bold text-center">
          <div className="w-full flex justify-center items-center gap-2 mb-1">
            <Truck className="h-6 w-6 text-orange" />
            <span className="bg-gradient-to-r from-turquoise to-gold bg-clip-text text-transparent">Trucker Path</span>
          </div>
        </CardTitle>
        <CardDescription className="text-center font-semibold">
          Access essential road tools from Trucker Path
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {truckerPathLinks.map((link, index) => (
            <div key={index} className="w-full">
              <Button 
                variant="outline" 
                className={`w-full h-auto py-3 px-4 flex items-center gap-3 border-2 border-${link.color} hover:bg-${link.color}/5 group`}
                onClick={() => handleFeatureClick(link.feature)}
              >
                <div className={`p-2 rounded-full bg-${link.color}/10 text-${link.color}`}>
                  {link.icon}
                </div>
                <div className="text-center flex-1">
                  <div className="font-bold flex items-center justify-center text-base">
                    {link.title}
                    <ExternalLink className="ml-1.5 h-4 w-4 opacity-70" />
                  </div>
                  <div className="text-sm font-medium mt-1">
                    {link.description}
                  </div>
                </div>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}