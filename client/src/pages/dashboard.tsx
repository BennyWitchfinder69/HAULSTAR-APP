import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { 
  Plus, DollarSign, TrendingUp, BellRing, Settings, Truck, Calendar, 
  Banknote, PiggyBank, PieChart as PieChartIcon, ArrowUp, ArrowDown, Loader2 
} from "lucide-react";
import DayLoggerModal from "../components/DayLoggerModal";
import AddExpenseModal from "../components/AddExpenseModal";
import AddGoalModal from "../components/AddGoalModal";

// Sample data matching the dashboard layout
const dailyStatsSample = [
  { name: "Mon", income: 380 },
  { name: "Tue", income: 420 },
  { name: "Wed", income: 450 },
  { name: "Thu", income: 520 },
  { name: "Fri", income: 490 },
  { name: "Sat", income: 400 },
  { name: "Sun", income: 350 }
];

const monthlyStatsSample = [
  { name: "Jan", income: 9000 },
  { name: "Feb", income: 8700 },
  { name: "Mar", income: 9300 },
  { name: "Apr", income: 10100 },
  { name: "May", income: 9800 },
  { name: "Jun", income: 10200 }
];

const expenseBreakdownSample = [
  { name: "Fuel", value: 35 },
  { name: "Maintenance", value: 15 },
  { name: "Insurance", value: 20 },
  { name: "Food", value: 10 },
  { name: "Other", value: 20 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function DashboardPage() {
  const { state } = useContext(AppContext);
  const [isLogDayOpen, setIsLogDayOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Get today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Format numbers with commas and dollar sign
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  // Calculate totals
  const weeklyIncome = dailyStatsSample.reduce((sum, day) => sum + day.income, 0);
  const monthlyIncome = 9800; // Sample value
  const totalExpenses = 5823; // Sample value
  const netIncome = monthlyIncome - totalExpenses;
  
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">{formattedDate}</p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-2">
            <Button onClick={() => setIsLogDayOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Log Day
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Daily Overview Card */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/10 pb-4">
                <CardTitle className="flex items-center justify-between">
                  <span>Daily Overview</span>
                  <Truck className="h-5 w-5" />
                </CardTitle>
                <CardDescription>
                  Today's performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold">Miles Today</h3>
                      <DollarSign className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold">327</span>
                      <span className="text-sm text-muted-foreground">miles</span>
                    </div>
                    <div className="flex items-center mt-2 text-sm text-green-500">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      <span>12% from yesterday</span>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold">Today's Income</h3>
                      <DollarSign className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold">{formatCurrency(480)}</span>
                    </div>
                    <div className="flex items-center mt-2 text-sm text-green-500">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      <span>8% from yesterday</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-6"
                  onClick={() => setIsLogDayOpen(true)}
                >
                  Log Your Day
                </Button>
              </CardContent>
            </Card>
            
            {/* Current Week Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Weekly Stats</span>
                  <Calendar className="h-5 w-5" />
                </CardTitle>
                <CardDescription>
                  Performance for the current week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">Weekly Income</h3>
                      <span className="font-semibold">{formatCurrency(weeklyIncome)}</span>
                    </div>
                    <div className="h-[150px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dailyStatsSample}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip
                            formatter={(value) => formatCurrency(Number(value))}
                            labelFormatter={(label) => `${label}`}
                          />
                          <Bar dataKey="income" fill="#dc2626" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Middle Column */}
          <div className="space-y-6">
            {/* Income Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Income</span>
                  <Banknote className="h-5 w-5" />
                </CardTitle>
                <CardDescription>
                  Monthly income overview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly</p>
                      <p className="text-2xl font-bold">{formatCurrency(monthlyIncome)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">YTD</p>
                      <p className="text-2xl font-bold">{formatCurrency(48200)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Last 6 Months</h3>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyStatsSample}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip 
                            formatter={(value) => formatCurrency(Number(value))}
                            labelFormatter={(label) => `${label}`}
                          />
                          <Line
                            type="monotone"
                            dataKey="income"
                            stroke="#dc2626"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Expense Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Expense Breakdown</span>
                  <PieChartIcon className="h-5 w-5" />
                </CardTitle>
                <CardDescription>
                  How your money is spent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex">
                  <div className="w-1/2">
                    <div className="h-[180px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={expenseBreakdownSample}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={70}
                            fill="#8884d8"
                            dataKey="value"
                            labelLine={false}
                          >
                            {expenseBreakdownSample.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => `${value}%`}
                            labelFormatter={(label) => `${label}`}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col justify-center space-y-2">
                    {expenseBreakdownSample.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="text-sm">{item.name}: {item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setIsAddExpenseOpen(true)}
                >
                  Manage Expenses
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Financial Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Financial Summary</span>
                  <TrendingUp className="h-5 w-5" />
                </CardTitle>
                <CardDescription>
                  Monthly performance snapshot
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">Income</p>
                      <p className="text-lg font-bold">{formatCurrency(monthlyIncome)}</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">Expenses</p>
                      <p className="text-lg font-bold">{formatCurrency(totalExpenses)}</p>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Net Income</p>
                    <p className="text-lg font-bold">{formatCurrency(netIncome)}</p>
                    <div className={`flex items-center mt-1 text-xs ${netIncome >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {netIncome >= 0 ? (
                        <>
                          <ArrowUp className="h-3 w-3 mr-1" />
                          <span>+{((netIncome / monthlyIncome) * 100).toFixed(1)}% margin</span>
                        </>
                      ) : (
                        <>
                          <ArrowDown className="h-3 w-3 mr-1" />
                          <span>{((netIncome / monthlyIncome) * 100).toFixed(1)}% margin</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="text-sm font-medium">Goal Progress</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 text-xs"
                        onClick={() => setIsAddGoalOpen(true)}
                      >
                        <Plus className="h-3 w-3 mr-1" /> Add Goal
                      </Button>
                    </div>
                    
                    {state.goals.length > 0 ? (
                      <div className="space-y-3">
                        {state.goals.map((goal, index) => (
                          <div key={index}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{goal.name}</span>
                              <span>{formatCurrency(goal.saved)} / {formatCurrency(goal.amount)}</span>
                            </div>
                            <Progress value={goal.progress} className="h-2" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-muted p-6 rounded-lg text-center">
                        <p className="text-muted-foreground text-sm">No goals yet</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => setIsAddGoalOpen(true)}
                        >
                          Create your first goal
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Tax Estimates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Tax Estimates</span>
                  <Settings className="h-5 w-5" />
                </CardTitle>
                <CardDescription>
                  Based on your current earnings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">Federal</p>
                      <p className="text-lg font-bold">{formatCurrency(1470)}</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">State</p>
                      <p className="text-lg font-bold">{formatCurrency(490)}</p>
                    </div>
                    
                    {/* Additional fields for Owner-Operators */}
                    {state.role === "owner" && (
                      <>
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-sm text-muted-foreground">Self-Employment</p>
                          <p className="text-lg font-bold">{formatCurrency(735)}</p>
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-sm text-muted-foreground">Quarterly Est.</p>
                          <p className="text-lg font-bold">{formatCurrency(920)}</p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Estimated Tax</p>
                    <p className="text-lg font-bold">{formatCurrency(state.role === "owner" ? 3615 : 1960)}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Based on {state.taxSettings?.stateName || "default"} rates
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <DayLoggerModal isOpen={isLogDayOpen} onClose={() => setIsLogDayOpen(false)} />
      <AddExpenseModal isOpen={isAddExpenseOpen} onClose={() => setIsAddExpenseOpen(false)} />
      <AddGoalModal isOpen={isAddGoalOpen} onClose={() => setIsAddGoalOpen(false)} />
    </div>
  );
}