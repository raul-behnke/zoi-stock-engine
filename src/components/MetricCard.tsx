import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  icon: Icon,
  trend,
  trendLabel,
  accent,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  accent?: "primary" | "secondary" | "accent";
}) {
  const positive = (trend ?? 0) >= 0;
  return (
    <div className="card-zoi card-zoi-hover p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-body-sm text-muted-foreground font-medium">{label}</p>
          <p className="font-display text-display-sm font-semibold mt-2">{value}</p>
        </div>
        <div
          className={cn(
            "h-11 w-11 rounded-xl flex items-center justify-center",
            accent === "secondary" && "bg-secondary text-secondary-foreground",
            accent === "accent" && "bg-accent/10 text-accent",
            (!accent || accent === "primary") && "bg-primary text-primary-foreground"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {trend !== undefined && (
        <div className="mt-4 flex items-center gap-1.5 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-1 font-semibold",
              positive ? "text-success" : "text-destructive"
            )}
          >
            {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {positive ? "+" : ""}
            {trend}%
          </span>
          {trendLabel && (
            <span className="text-muted-foreground">{trendLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
