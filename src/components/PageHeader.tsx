import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  actions,
  className,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8", className)}>
      <div>
        <h1 className="font-display text-display-sm font-semibold text-foreground">
          {title}
        </h1>
        {description && (
          <p className="text-body-md text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
