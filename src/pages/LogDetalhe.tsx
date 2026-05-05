import { Link, useParams } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { logs, formatDate } from "@/lib/mockData";
import { AlertOctagon, ArrowLeft } from "lucide-react";

export default function LogDetalhe() {
  const { id } = useParams();
  const log = logs.find((l) => l.id === id) ?? logs[0];

  const payload = {
    cliente_id: "cli_8421",
    location_id: "loc_premium_sp",
    source: log.fonte,
    items_count: log.registros ?? 0,
    timestamp: log.dataHora,
  };

  const normalized = {
    schema_version: "1.0.0",
    vehicles: log.registros ?? 0,
    normalized_at: log.dataHora,
    fields_mapped: ["marca", "modelo", "ano", "preco", "km", "cambio", "categoria"],
  };

  return (
    <div>
      <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
        <Link to="/logs"><ArrowLeft className="h-4 w-4 mr-1" /> Voltar</Link>
      </Button>

      <PageHeader title={`Execução ${log.id}`} description={`${log.cliente} · ${log.fonte}`} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card-zoi p-5">
          <p className="text-xs text-muted-foreground">Status</p>
          <div className="mt-2"><StatusBadge status={log.status === "sucesso" ? "success" : "error"}>{log.status}</StatusBadge></div>
        </div>
        <div className="card-zoi p-5">
          <p className="text-xs text-muted-foreground">Tempo total</p>
          <p className="font-display text-2xl font-semibold mt-1">{(log.duracaoMs / 1000).toFixed(2)}s</p>
        </div>
        <div className="card-zoi p-5">
          <p className="text-xs text-muted-foreground">Registros</p>
          <p className="font-display text-2xl font-semibold mt-1">{log.registros ?? 0}</p>
        </div>
        <div className="card-zoi p-5">
          <p className="text-xs text-muted-foreground">Data/hora</p>
          <p className="text-sm mt-2">{formatDate(log.dataHora)}</p>
        </div>
      </div>

      {log.erro && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 mb-6 flex items-start gap-3">
          <AlertOctagon className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-destructive">Erro durante a execução</p>
            <p className="text-sm text-muted-foreground mt-1 font-mono">{log.erro}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-zoi p-6">
          <h3 className="font-display text-lg font-semibold mb-3">Payload recebido</h3>
          <pre className="bg-muted/50 rounded-xl p-4 text-xs font-mono overflow-auto">
{JSON.stringify(payload, null, 2)}
          </pre>
        </div>
        <div className="card-zoi p-6">
          <h3 className="font-display text-lg font-semibold mb-3">Dados normalizados</h3>
          <pre className="bg-muted/50 rounded-xl p-4 text-xs font-mono overflow-auto">
{JSON.stringify(normalized, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
