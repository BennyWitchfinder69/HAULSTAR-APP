import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

interface PayStructureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

import { PayStructureFormData, PayType } from "../types";

type PayFormData = PayStructureFormData;

export default function PayStructureModal({ isOpen, onClose }: PayStructureModalProps) {
  const { addPayRate } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<PayFormData>({
    defaultValues: {
      payType: "hourly",
      rate: 0,
      description: ""
    }
  });
  
  const selectedPayType = watch("payType");
  
  const onSubmit = async (data: PayFormData) => {
    setLoading(true);
    try {
      await addPayRate(data.payType, data.rate, data.description);
      reset();
      onClose();
    } catch (error) {
      console.error("Failed to add pay structure:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleClose = () => {
    reset();
    onClose();
  };
  
  // Labels and placeholders change based on pay type
  const getRateLabel = () => {
    switch (selectedPayType) {
      case "hourly": return "Hourly Rate ($)";
      case "per_mile": return "Per Mile Rate ($)";
      case "per_load": return "Per Load Rate ($)";
      case "percentage": return "Percentage of Load (%)";
      case "daily_rate": return "Daily Rate ($)";
      case "salary": return "Salary Amount ($)";
      case "hazmat": return "Hazmat Bonus ($)";
      case "detention": return "Detention Rate ($/hr)";
      case "layover": return "Layover Pay ($)";
      case "stop_pay": return "Pay Per Stop ($)";
      case "accessorial": return "Accessorial Pay ($)";
      case "performance": return "Performance Bonus ($)";
      case "safety": return "Safety Bonus ($)";
      case "fuel_bonus": return "Fuel Bonus ($)";
      case "referral": return "Referral Bonus ($)";
      default: return "Rate ($)";
    }
  };
  
  const getPlaceholder = () => {
    switch (selectedPayType) {
      case "hourly": return "e.g., 25.50";
      case "per_mile": return "e.g., 0.55";
      case "per_load": return "e.g., 250.00";
      case "percentage": return "e.g., 75";
      case "daily_rate": return "e.g., 200.00";
      case "salary": return "e.g., 1200.00";
      case "hazmat": return "e.g., 125.00";
      case "detention": return "e.g., 20.00";
      case "layover": return "e.g., 150.00";
      case "stop_pay": return "e.g., 50.00";
      case "accessorial": return "e.g., 75.00";
      case "performance": return "e.g., 300.00";
      case "safety": return "e.g., 250.00";
      case "fuel_bonus": return "e.g., 100.00";
      case "referral": return "e.g., 500.00";
      default: return "Enter rate";
    }
  };
  
  const getDescriptionPlaceholder = () => {
    switch (selectedPayType) {
      case "hourly": return "e.g., Regular driving hours";
      case "per_mile": return "e.g., Standard mileage pay";
      case "per_load": return "e.g., Standard load rate";
      case "percentage": return "e.g., Percentage of gross load";
      case "daily_rate": return "e.g., Fixed daily pay";
      case "salary": return "e.g., Weekly salary";
      case "hazmat": return "e.g., Hazardous materials bonus";
      case "detention": return "e.g., Per hour waiting at shipper/receiver";
      case "layover": return "e.g., Overnight stay payment";
      case "stop_pay": return "e.g., Additional stop payment";
      case "accessorial": return "e.g., Lumper fee reimbursement";
      case "performance": return "e.g., On-time delivery bonus";
      case "safety": return "e.g., Monthly safe driving bonus";
      case "fuel_bonus": return "e.g., Fuel efficiency incentive";
      case "referral": return "e.g., Driver referral program";
      default: return "Describe this payment type";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Pay Structure</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="payType">Payment Type</Label>
            <Select 
              defaultValue="hourly" 
              onValueChange={(value) => setValue("payType", value as any)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select payment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly Pay</SelectItem>
                <SelectItem value="per_mile">Per Mile Pay</SelectItem>
                <SelectItem value="per_load">Per Load Pay</SelectItem>
                <SelectItem value="percentage">Percentage of Load</SelectItem>
                <SelectItem value="daily_rate">Daily Rate</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="hazmat">Hazmat Bonus</SelectItem>
                <SelectItem value="detention">Detention Pay</SelectItem>
                <SelectItem value="layover">Layover Pay</SelectItem>
                <SelectItem value="stop_pay">Stop Pay</SelectItem>
                <SelectItem value="accessorial">Accessorial Pay</SelectItem>
                <SelectItem value="performance">Performance Bonus</SelectItem>
                <SelectItem value="safety">Safety Bonus</SelectItem>
                <SelectItem value="fuel_bonus">Fuel Bonus</SelectItem>
                <SelectItem value="referral">Referral Bonus</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.payType && <p className="text-red-500 text-sm mt-1">{errors.payType.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rate">{getRateLabel()}</Label>
            <Input
              id="rate"
              type="number"
              step="0.01"
              min="0"
              placeholder={getPlaceholder()}
              {...register("rate", { 
                required: "Rate is required",
                min: { value: 0, message: "Rate must be a positive number" },
                valueAsNumber: true
              })}
            />
            {errors.rate && <p className="text-red-500 text-sm mt-1">{errors.rate.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder={getDescriptionPlaceholder()}
              className="resize-none"
              {...register("description")}
            />
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="mt-2 sm:mt-0"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Pay Structure"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}