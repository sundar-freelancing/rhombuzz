import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { Calendar, Loader2, Plus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis } from "recharts";

const chartConfig = {
  totalVisits: {
    label: "Total Visits",
    color: "hsl(var(--chart-1))",
  },
  uniquePatients: {
    label: "Unique Patients",
    color: "hsl(var(--chart-2))",
  },
};

export default function Patients() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingStats, setLoadingStats] = useState(false);
  const [activeChart, setActiveChart] = useState("totalVisits");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [month, setMonth] = useState("");
  const [totalVisitsInput, setTotalVisitsInput] = useState("");
  const [uniquePatientsInput, setUniquePatientsInput] = useState("");

  // Get the actual color value from CSS variable
  const getChartColor = (chartType) => {
    if (typeof window === "undefined") return "#888";
    const root = document.documentElement;
    const chartNum = chartType === "totalVisits" ? "1" : "2";
    // CSS variable is already defined as oklch(...), so we get the computed value
    const cssVar = getComputedStyle(root)
      .getPropertyValue(`--chart-${chartNum}`)
      .trim();
    // The CSS variable value is already in oklch format, so return it directly
    return cssVar || `oklch(var(--chart-${chartNum}))`;
  };

  useEffect(() => {
    const fetchVisitStats = async () => {
      try {
        setLoading(true);
        const visitStatsRef = collection(db, "visitStats");
        const q = query(visitStatsRef, orderBy("month", "asc"));
        const querySnapshot = await getDocs(q);

        const data = [];

        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          const monthData = {
            month: docData.month,
            date: new Date(docData.month + "-01").getTime(),
            totalVisits: docData.totalVisits || 0,
            uniquePatients: docData.uniquePatients || 0,
          };
          data.push(monthData);
        });

        setChartData(data);
      } catch (error) {
        console.error("Error fetching visit stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitStats();
  }, []);

  const handleAddStats = async (e) => {
    e.preventDefault();
    setLoadingStats(true);
    try {
      await addDoc(collection(db, "visitStats"), {
        month: month,
        totalVisits: parseInt(totalVisitsInput) || 0,
        uniquePatients: parseInt(uniquePatientsInput) || 0,
      });

      // Refresh data
      const visitStatsRef = collection(db, "visitStats");
      const q = query(visitStatsRef, orderBy("month", "asc"));
      const querySnapshot = await getDocs(q);

      const data = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        const monthData = {
          month: docData.month,
          date: new Date(docData.month + "-01").getTime(),
          totalVisits: docData.totalVisits || 0,
          uniquePatients: docData.uniquePatients || 0,
        };
        data.push(monthData);
      });

      setChartData(data);
      setDialogOpen(false);
      setMonth("");
      setTotalVisitsInput("");
      setUniquePatientsInput("");
    } catch (error) {
      console.error("Error adding visit stats:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  const totalVisits = chartData.reduce(
    (sum, item) => sum + item.totalVisits,
    0
  );
  const totalUniquePatients = chartData.reduce(
    (sum, item) => sum + item.uniquePatients,
    0
  );

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
      {loadingStats && (
        <div className="fixed top-0 left-0 h-full w-full z-100 bg-background/50 flex items-center justify-center inset-0">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Patients</h1>
          <p className="text-muted-foreground">
            Manage your patients and their information
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Stats
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : totalVisits.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              All time visit count
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Unique Patients
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : totalUniquePatients.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Unique patient count
            </p>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <p className="text-muted-foreground">Loading chart data...</p>
        </div>
      ) : (
        <Card className="py-0">
          <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
              <CardTitle>Patient Visits - Interactive</CardTitle>
              <CardDescription>
                Showing visit statistics for the last {chartData.length} months
              </CardDescription>
            </div>
            <div className="flex">
              {["totalVisits", "uniquePatients"].map((key) => {
                const chart = key;
                const isActive = activeChart === chart;
                return (
                  <button
                    key={chart}
                    data-active={isActive}
                    className={cn(
                      "relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6",
                      isActive && `text-chart-1`
                    )}
                    onClick={() => setActiveChart(chart)}
                  >
                    <span
                      className={cn(
                        "text-xs text-center transition-colors",
                        isActive && "font-medium"
                      )}
                      style={
                        isActive
                          ? {
                              color: getChartColor(chart),
                            }
                          : {}
                      }
                    >
                      {chartConfig[chart].label}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:p-6">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    // Format YYYY-MM to "MMM YYYY"
                    const [year, month] = value.split("-");
                    const date = new Date(parseInt(year), parseInt(month) - 1);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    });
                  }}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;

                    const [year, month] = label.split("-");
                    const date = new Date(parseInt(year), parseInt(month) - 1);
                    const formattedDate = date.toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    });

                    const data = payload[0];
                    const value = data?.value || 0;
                    const labelText = chartConfig[activeChart].label;

                    return (
                      <div className="rounded-lg border bg-background px-3 py-2 shadow-md">
                        <p className="font-medium text-sm mb-1">
                          {formattedDate}
                        </p>
                        <div className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded-sm"
                            style={{
                              backgroundColor: getChartColor(activeChart),
                            }}
                          />
                          <div>
                            <p className="text-xs text-muted-foreground">
                              {labelText}
                            </p>
                            <p className="text-sm font-semibold">
                              {value.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                />
                <Bar dataKey={activeChart} fill={getChartColor(activeChart)} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <form onSubmit={handleAddStats}>
            <DialogHeader>
              <DialogTitle>Add Visit Statistics</DialogTitle>
              <DialogDescription>
                Add monthly visit statistics for patients
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="month">Month (YYYY-MM)</Label>
                <Input
                  id="month"
                  type="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="totalVisits">Total Visits</Label>
                <Input
                  id="totalVisits"
                  type="number"
                  value={totalVisitsInput}
                  onChange={(e) => setTotalVisitsInput(e.target.value)}
                  required
                  min="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="uniquePatients">Unique Patients</Label>
                <Input
                  id="uniquePatients"
                  type="number"
                  value={uniquePatientsInput}
                  onChange={(e) => setUniquePatientsInput(e.target.value)}
                  required
                  min="0"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
