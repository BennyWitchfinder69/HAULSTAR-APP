import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { TaxSettings, UserRole } from "../types";

// State tax rates (approximate - users can adjust as needed)
export const STATE_TAX_RATES: Record<string, {name: string, rate: number}> = {
  "AL": { name: "Alabama", rate: 5.0 },
  "AK": { name: "Alaska", rate: 0.0 },
  "AZ": { name: "Arizona", rate: 4.5 },
  "AR": { name: "Arkansas", rate: 5.9 },
  "CA": { name: "California", rate: 13.3 },
  "CO": { name: "Colorado", rate: 4.55 },
  "CT": { name: "Connecticut", rate: 6.99 },
  "DE": { name: "Delaware", rate: 6.6 },
  "FL": { name: "Florida", rate: 0.0 },
  "GA": { name: "Georgia", rate: 5.75 },
  "HI": { name: "Hawaii", rate: 11.0 },
  "ID": { name: "Idaho", rate: 6.925 },
  "IL": { name: "Illinois", rate: 4.95 },
  "IN": { name: "Indiana", rate: 3.23 },
  "IA": { name: "Iowa", rate: 8.53 },
  "KS": { name: "Kansas", rate: 5.7 },
  "KY": { name: "Kentucky", rate: 5.0 },
  "LA": { name: "Louisiana", rate: 4.25 },
  "ME": { name: "Maine", rate: 7.15 },
  "MD": { name: "Maryland", rate: 5.75 },
  "MA": { name: "Massachusetts", rate: 5.0 },
  "MI": { name: "Michigan", rate: 4.25 },
  "MN": { name: "Minnesota", rate: 9.85 },
  "MS": { name: "Mississippi", rate: 5.0 },
  "MO": { name: "Missouri", rate: 5.4 },
  "MT": { name: "Montana", rate: 6.75 },
  "NE": { name: "Nebraska", rate: 6.84 },
  "NV": { name: "Nevada", rate: 0.0 },
  "NH": { name: "New Hampshire", rate: 5.0 },
  "NJ": { name: "New Jersey", rate: 10.75 },
  "NM": { name: "New Mexico", rate: 5.9 },
  "NY": { name: "New York", rate: 10.9 },
  "NC": { name: "North Carolina", rate: 5.25 },
  "ND": { name: "North Dakota", rate: 2.9 },
  "OH": { name: "Ohio", rate: 4.797 },
  "OK": { name: "Oklahoma", rate: 5.0 },
  "OR": { name: "Oregon", rate: 9.9 },
  "PA": { name: "Pennsylvania", rate: 3.07 },
  "RI": { name: "Rhode Island", rate: 5.99 },
  "SC": { name: "South Carolina", rate: 7.0 },
  "SD": { name: "South Dakota", rate: 0.0 },
  "TN": { name: "Tennessee", rate: 0.0 },
  "TX": { name: "Texas", rate: 0.0 },
  "UT": { name: "Utah", rate: 4.95 },
  "VT": { name: "Vermont", rate: 8.75 },
  "VA": { name: "Virginia", rate: 5.75 },
  "WA": { name: "Washington", rate: 0.0 },
  "WV": { name: "West Virginia", rate: 6.5 },
  "WI": { name: "Wisconsin", rate: 7.65 },
  "WY": { name: "Wyoming", rate: 0.0 },
  "DC": { name: "Washington DC", rate: 10.75 }
};

// Form schema definition
const taxSettingsSchema = z.object({
  federalTaxRate: z.coerce.number().min(0).max(100),
  socialSecurityRate: z.coerce.number().min(0).max(100),
  medicareRate: z.coerce.number().min(0).max(100),
  stateTaxRate: z.coerce.number().min(0).max(100),
  stateName: z.string().optional(),
  selfEmploymentTax: z.coerce.number().min(0).max(100).optional(),
  useStandardDeduction: z.boolean().default(true)
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
  // Initialize form with default values or current settings
  const form = useForm<TaxSettingsFormData>({
    resolver: zodResolver(taxSettingsSchema),
    defaultValues: {
      federalTaxRate: currentSettings?.federalTaxRate ?? 15, // Reasonable default
      socialSecurityRate: currentSettings?.socialSecurityRate ?? 6.2, // Current SS rate
      medicareRate: currentSettings?.medicareRate ?? 1.45, // Current Medicare rate
      stateTaxRate: currentSettings?.stateTaxRate ?? 5, // Default state tax rate
      stateName: currentSettings?.stateName ?? "",
      selfEmploymentTax: userRole === 'owner' ? (currentSettings?.selfEmploymentTax ?? 15.3) : undefined, // Self-employment tax for owner-operators
      useStandardDeduction: currentSettings?.useStandardDeduction ?? true
    }
  });

  const handleSubmit = (data: TaxSettingsFormData) => {
    // Create a tax settings object from form data
    const taxSettings: TaxSettings = {
      federalTaxRate: data.federalTaxRate,
      socialSecurityRate: data.socialSecurityRate,
      medicareRate: data.medicareRate,
      stateTaxRate: data.stateTaxRate,
      stateName: data.stateName,
      useStandardDeduction: data.useStandardDeduction
    };

    // Add self-employment tax for owner-operators
    if (userRole === 'owner' && data.selfEmploymentTax !== undefined) {
      taxSettings.selfEmploymentTax = data.selfEmploymentTax;
    }

    // Call the parent component's onSubmit function
    onSubmit(taxSettings);
  };

  // Select a state and automatically set the tax rate
  const handleStateSelection = (stateCode: string) => {
    const selectedState = STATE_TAX_RATES[stateCode];
    if (selectedState) {
      form.setValue('stateName', stateCode);
      form.setValue('stateTaxRate', selectedState.rate);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="federalTaxRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Federal Tax Rate (%)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min="0" max="100" {...field} />
                </FormControl>
                <FormDescription>
                  Your federal income tax rate
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stateName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <Select 
                  onValueChange={handleStateSelection} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(STATE_TAX_RATES).map(([code, { name }]) => (
                      <SelectItem key={code} value={code}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Your state of residence
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stateTaxRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State Tax Rate (%)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min="0" max="100" {...field} />
                </FormControl>
                <FormDescription>
                  Your state income tax rate
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socialSecurityRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Social Security Rate (%)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min="0" max="100" {...field} />
                </FormControl>
                <FormDescription>
                  Standard rate is 6.2%
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="medicareRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medicare Rate (%)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min="0" max="100" {...field} />
                </FormControl>
                <FormDescription>
                  Standard rate is 1.45%
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {userRole === 'owner' && (
            <FormField
              control={form.control}
              name="selfEmploymentTax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Self-Employment Tax (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" min="0" max="100" {...field} />
                  </FormControl>
                  <FormDescription>
                    Standard rate is 15.3% for self-employed
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="useStandardDeduction"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Standard Deduction</FormLabel>
                  <FormDescription>
                    Use standard deduction instead of itemizing
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="w-full">
          {isOnboarding ? "Continue" : "Save Tax Settings"}
        </Button>
      </form>
    </Form>
  );
}