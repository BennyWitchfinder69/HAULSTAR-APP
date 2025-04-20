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

type PayFormData = {
  payType: "hourly" | "per_mile" | "per_load" | "bonus" | "other";
  rate: number;
  description: string;
};

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
      case "bonus": return "Bonus Amount ($)";
      default: return "Rate ($)";
    }
  };
  
  const getPlaceholder = () => {
    switch (selectedPayType) {
      case "hourly": return "e.g., 25.50";
      case "per_mile": return "e.g., 0.55";
      case "per_load": return "e.g., 250.00";
      case "bonus": return "e.g., 500.00";
      default: return "Enter rate";
    }
  };
  
  const getDescriptionPlaceholder = () => {
    switch (selectedPayType) {
      case "hourly": return "e.g., Regular driving hours";
      case "per_mile": return "e.g., Standard mileage pay";
      case "per_load": return "e.g., Standard load rate";
      case "bonus": return "e.g., Monthly safety bonus";
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
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="per_mile">Per Mile</SelectItem>
                <SelectItem value="per_load">Per Load</SelectItem>
                <SelectItem value="bonus">Bonus</SelectItem>
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