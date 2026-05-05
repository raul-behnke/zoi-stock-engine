import { cn } from "@/lib/utils";

type Status = "success" | "error" | "warning" | "muted" | "accent";

const styles: Record<Status, string> = {
  success: "bg-success/10 text-success border-success/20",
  error: "bg-destructive/10 text-destructive border-destructive/20",
  warning: "bg-warning/15 text-warning-foreground border-warning/30",
  muted: "bg-muted text-muted-foreground border-border",
  accent: "bg-accent/10 text-accent border-accent/20",
};

export function StatusBadge({
  status,
  children,
  className,
}: {
  status: Status;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles[status],
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", {
        "bg-success": status === "success",
        "bg-destructive": status === "error",
        "bg-warning": status === "warning",
        "bg-muted-foreground": status === "muted",
        "bg-accent": status === "accent",
      })} />
      {children}
    </span>
  );
}
