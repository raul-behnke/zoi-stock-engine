import { PageHeader } from "@/components/PageHeader";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Users, Car, RefreshCw, AlertTriangle, CheckCircle2 } from "lucide-react";
import { clientes, logs, formatRelative } from "@/lib/mockData";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const ativos = clientes.filter((c) => c.status === "ativo").length;
  const totalVeiculos = clientes.reduce((acc, c) => acc + c.veiculos, 0);
  const ultimosLogs = logs.slice(0, 6);
  const falhas = logs.filter((l) => l.status === "erro").length;

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Visão geral do hub de estoque ZOI"
        actions={
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <RefreshCw className="h-4 w-4 mr-2" /> Sincronizar agora
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard label="Clientes ativos" value={ativos} icon={Users} trend={12} trendLabel="vs. mês anterior" />
        <MetricCard label="Veículos sincronizados" value={totalVeiculos.toLocaleString("pt-BR")} icon={Car} trend={8} trendLabel="últimas 24h" accent="secondary" />
        <MetricCard label="Sincronizações hoje" value={48} icon={RefreshCw} trend={4} trendLabel="vs. ontem" />
        <MetricCard label="Falhas recentes" value={falhas} icon={AlertTriangle} trend={-22} trendLabel="vs. semana" accent="accent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card-zoi p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-xl font-semibold">Últimas execuções</h2>
              <p className="text-sm text-muted-foreground">Logs resumidos das sincronizações</p>
            </div>
            <Button variant="ghost" size="sm">Ver todos</Button>
          </div>
          <div className="divide-y divide-border">
            {ultimosLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`h-2 w-2 rounded-full ${log.status === "sucesso" ? "bg-success" : "bg-destructive"}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{log.cliente}</p>
                    <p className="text-xs text-muted-foreground">{log.fonte} · {log.registros ?? 0} registros</p>
                  </div>
                </div>
                <div className="text-right">
                  <StatusBadge status={log.status === "sucesso" ? "success" : "error"}>
                    {log.status}
                  </StatusBadge>
                  <p className="text-xs text-muted-foreground mt-1">{formatRelative(log.dataHora)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-zoi p-6">
          <h2 className="font-display text-xl font-semibold mb-4">Status do sistema</h2>
          <div className="rounded-2xl bg-success/10 border border-success/20 p-5 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-success text-success-foreground flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-success">Saudável</p>
              <p className="text-xs text-muted-foreground">Todos os serviços operando normalmente</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {["AutoCerto", "SóCarrão", "AutoConf", "Altimus"].map((svc, i) => (
              <div key={svc} className="flex items-center justify-between text-sm">
                <span className="font-medium">{svc}</span>
                <StatusBadge status={i === 1 ? "warning" : "success"}>
                  {i === 1 ? "instável" : "operacional"}
                </StatusBadge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
