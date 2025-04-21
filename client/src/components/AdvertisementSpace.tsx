import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

// Types for our advertisement component
interface Advertisement {
  id: string;
  name: string;
  company: string;
  imageUrl: string;
  targetUrl: string;
  placement: string;
}

interface AdvertisementSpaceProps {
  placement: 'dashboard_top' | 'dashboard_sidebar' | 'dashboard_bottom' | 
             'income_page' | 'expenses_page' | 'goals_page' | 'settings_page';
  className?: string;
}

// Mock advertisement data until we integrate with the backend
const mockAds: Advertisement[] = [
  {
    id: "1",
    name: "Truck Repair Services",
    company: "TruckFix Pro",
    imageUrl: "https://placehold.co/600x200/4a90e2/ffffff?text=TruckFix+Pro+Repair+Services",
    targetUrl: "https://example.com/truckfix",
    placement: "dashboard_top"
  },
  {
    id: "2",
    name: "Fuel Savings Card",
    company: "TruckFuel Plus",
    imageUrl: "https://placehold.co/300x600/27ae60/ffffff?text=Save+20%+on+Fuel",
    targetUrl: "https://example.com/fuelsavings",
    placement: "dashboard_sidebar"
  },
  {
    id: "3",
    name: "Truck Insurance",
    company: "TruckSafe Insurance",
    imageUrl: "https://placehold.co/600x200/e74c3c/ffffff?text=TruckSafe+Insurance+-+Lowest+Rates",
    targetUrl: "https://example.com/insurance",
    placement: "dashboard_bottom"
  },
  {
    id: "4",
    name: "Truck Parts Online",
    company: "PartsMaster",
    imageUrl: "https://placehold.co/600x200/f39c12/ffffff?text=Quality+Truck+Parts+Delivered",
    targetUrl: "https://example.com/parts",
    placement: "income_page"
  },
  {
    id: "5",
    name: "Trucker Tax Services",
    company: "TruckerTax",
    imageUrl: "https://placehold.co/600x200/8e44ad/ffffff?text=Specialized+Tax+Services+for+Truckers",
    targetUrl: "https://example.com/taxes",
    placement: "expenses_page"
  }
];

export default function AdvertisementSpace({ placement, className = "" }: AdvertisementSpaceProps) {
  const [ad, setAd] = useState<Advertisement | null>(null);
  const [impressionLogged, setImpressionLogged] = useState(false);

  // Simulating fetching an ad for the specific placement
  useEffect(() => {
    // Find ads for this placement
    const availableAds = mockAds.filter(ad => ad.placement === placement);
    
    if (availableAds.length > 0) {
      // Pick a random ad from available ones
      const randomAd = availableAds[Math.floor(Math.random() * availableAds.length)];
      setAd(randomAd);
    }
  }, [placement]);

  // Track impression when ad is displayed
  useEffect(() => {
    if (ad && !impressionLogged) {
      // In a real implementation, this would call an API to log the impression
      console.log(`Ad impression logged for: ${ad.name}`);
      setImpressionLogged(true);
    }
  }, [ad, impressionLogged]);

  // Handle ad click
  const handleAdClick = () => {
    if (ad) {
      // In a real implementation, this would call an API to log the click
      console.log(`Ad click logged for: ${ad.name}`);
      
      // Open the target URL in a new tab
      window.open(ad.targetUrl, '_blank');
    }
  };

  // No ad available for this placement
  if (!ad) return null;

  // Determine if this is a sidebar (vertical) ad
  const isSidebar = placement.includes('sidebar');
  
  return (
    <Card 
      className={`ad-container overflow-hidden border border-muted ${
        isSidebar ? 'h-[600px] w-full' : 'w-full h-auto'
      } ${className}`}
      onClick={handleAdClick}
    >
      <div className="relative w-full h-full cursor-pointer">
        <img 
          src={ad.imageUrl} 
          alt={`Advertisement for ${ad.company}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 bg-primary/80 text-white text-xs px-2 py-1 rounded-bl-sm">
          Ad
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1">
          {ad.name} by {ad.company}
        </div>
      </div>
    </Card>
  );
}