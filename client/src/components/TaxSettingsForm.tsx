import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TaxSettings, UserRole } from "../types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// State income tax rates as of 2025 (for example purposes)
export const STATE_TAX_RATES: Record<string, {name: string, rate: number}> = {
  "AL": { name: "Alabama", rate: 5.0 },
  "AK": { name: "Alaska", rate: 0.0 },
  "AZ": { name: "Arizona", rate: 2.5 },
  "AR": { name: "Arkansas", rate: 4.9 },
  "CA": { name: "California", rate: 9.3 },
  "CO": { name: "Colorado", rate: 4.55 },
  "CT": { name: "Connecticut", rate: 6.99 },
  "DE": { name: "Delaware", rate: 6.6 },
  "FL": { name: "Florida", rate: 0.0 },
  "GA": { name: "Georgia", rate: 5.75 },
  "HI": { name: "Hawaii", rate: 7.25 },
  "ID": { name: "Idaho", rate: 6.5 },
  "IL": { name: "Illinois", rate: 4.95 },
  "IN": { name: "Indiana", rate: 3.23 },
  "IA": { name: "Iowa", rate: 4.4 },
  "KS": { name: "Kansas", rate: 5.7 },
  "KY": { name: "Kentucky", rate: 4.0 },
  "LA": { name: "Louisiana", rate: 4.25 },
  "ME": { name: "Maine", rate: 7.15 },
  "MD": { name: "Maryland", rate: 5.75 },
  "MA": { name: "Massachusetts", rate: 5.0 },
  "MI": { name: "Michigan", rate: 4.25 },
  "MN": { name: "Minnesota", rate: 7.05 },
  "MS": { name: "Mississippi", rate: 5.0 },
  "MO": { name: "Missouri", rate: 5.4 },
  "MT": { name: "Montana", rate: 6.75 },
  "NE": { name: "Nebraska", rate: 6.84 },
  "NV": { name: "Nevada", rate: 0.0 },
  "NH": { name: "New Hampshire", rate: 5.0 },
  "NJ": { name: "New Jersey", rate: 5.525 },
  "NM": { name: "New Mexico", rate: 4.9 },
  "NY": { name: "New York", rate: 6.33 },
  "NC": { name: "North Carolina", rate: 4.75 },
  "ND": { name: "North Dakota", rate: 2.9 },
  "OH": { name: "Ohio", rate: 3.99 },
  "OK": { name: "Oklahoma", rate: 4.75 },
  "OR": { name: "Oregon", rate: 9.9 },
  "PA": { name: "Pennsylvania", rate: 3.07 },
  "RI": { name: "Rhode Island", rate: 5.99 },
  "SC": { name: "South Carolina", rate: 7.0 },
  "SD": { name: "South Dakota", rate: 0.0 },
  "TN": { name: "Tennessee", rate: 0.0 },
  "TX": { name: "Texas", rate: 0.0 },
  "UT": { name: "Utah", rate: 4.95 },
  "VT": { name: "Vermont", rate: 6.0 },
  "VA": { name: "Virginia", rate: 5.75 },
  "WA": { name: "Washington", rate: 0.0 },
  "WV": { name: "West Virginia", rate: 6.5 },
  "WI": { name: "Wisconsin", rate: 5.3 },
  "WY": { name: "Wyoming", rate: 0.0 },
  "DC": { name: "District of Columbia", rate: 8.5 }
};

const taxSettingsSchema = z.object({
  federalTaxRate: z.coerce.number().min(0).max(100),
  socialSecurityRate: z.coerce.number().min(0).max(100),
  medicareRate: z.coerce.number().min(0).max(100),
  stateCode: z.string(),
  selfEmploymentTax: z.coerce.number().min(0).max(100).optional(),
  useStandardDeduction: z.boolean().default(true),
});

type TaxSettingsFormData = z.infer<typeof taxSettingsSchema>;

interface TaxSettingsFormProps {
  currentSettings?: TaxSettings;
  onSubmit: (taxSettings: TaxSettings) => void;
  userRole: UserRole;
  isOnboarding?: boolean;
}

export default function TaxSettingsForm({ 
  currentSettings, 
  onSubmit, 
  userRole,
  isOnboarding = false 
}: TaxSettingsFormProps) {
  const [isOwnerOperator, setIsOwnerOperator] = useState(userRole === 'owner');
  
  const form = useForm<TaxSettingsFormData>({
    resolver: zodResolver(taxSettingsSchema),
    defaultValues: {
      federalTaxRate: currentSettings?.federalTaxRate || 15.0,
      socialSecurityRate: currentSettings?.socialSecurityRate || 6.2,
      medicareRate: currentSettings?.medicareRate || 1.45,
      stateCode: currentSettings?.stateName ? 
        Object.entries(STATE_TAX_RATES).find(([_, info]) => 
          info.name === currentSettings.stateName)?.[0] || "" : "",
      selfEmploymentTax: currentSettings?.selfEmploymentTax || 15.3,
      useStandardDeduction: currentSettings?.useStandardDeduction ?? true,
    }
  });

  // Update form values when user role changes
  useEffect(() => {
    setIsOwnerOperator(userRole === 'owner');
  }, [userRole]);

  const handleSubmit = (data: TaxSettingsFormData) => {
    const stateInfo = data.stateCode ? STATE_TAX_RATES[data.stateCode] : { name: "", rate: 0 };
    
    const taxSettings: TaxSettings = {
      federalTaxRate: data.federalTaxRate,
      socialSecurityRate: data.socialSecurityRate,
      medicareRate: data.medicareRate,
      stateTaxRate: stateInfo.rate,
      stateName: stateInfo.name,
      useStandardDeduction: data.useStandardDeduction,
      selfEmploymentTax: isOwnerOperator ? (data.selfEmploymentTax || 15.3) : undefined
    };
    
    onSubmit(taxSettings);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{isOnboarding ? "Set Up Tax Information" : "Tax Settings"}</CardTitle>
        <CardDescription>
          {isOnboarding 
            ? "This information helps us provide accurate financial projections." 
            : "Update your tax settings to get the most accurate financial calculations."}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="stateCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State of Residence</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(STATE_TAX_RATES).map(([code, info]) => (
                        <SelectItem key={code} value={code}>
                          {info.name} ({info.rate > 0 ? `${info.rate}%` : 'No state income tax'})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="federalTaxRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Federal Tax Rate (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isOwnerOperator && (
                <FormField
                  control={form.control}
                  name="selfEmploymentTax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Self-Employment Tax (%)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <Separator />
            
            <div className="text-sm font-medium">FICA Taxes</div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="socialSecurityRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Security (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="medicareRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medicare (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="useStandardDeduction"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Use Standard Deduction</FormLabel>
                    <p className="text-xs text-muted-foreground">
                      Uncheck if you plan to itemize deductions on your tax return
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {isOnboarding ? "Continue" : "Save Changes"}
            </Button>
          </form>
        </Form>
      </CardContent>
      
      {!isOnboarding && (
        <CardFooter className="flex justify-between border-t pt-4">
          <p className="text-xs text-muted-foreground">
            Disclaimer: These tax estimates are for planning purposes only. Consult a tax professional for personalized advice.
          </p>
        </CardFooter>
      )}
    </Card>
  );
}