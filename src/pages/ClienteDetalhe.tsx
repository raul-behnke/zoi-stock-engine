import { Link, useParams } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { clientes, formatDate } from "@/lib/mockData";
import { ArrowLeft, Plus, Settings } from "lucide-react";

export default function ClienteDetalhe() {
  const { id } = useParams();
  const cliente = clientes.find((c) => c.id === id) ?? clientes[0];

  return (
    <div>
      <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
        <Link to="/clientes"><ArrowLeft className="h-4 w-4 mr-1" /> Voltar</Link>
      </Button>

      <PageHeader
        title={cliente.nome}
        description={`${cliente.veiculos} veículos sincronizados`}
        actions={
          <>
            <Button variant="outline"><Settings className="h-4 w-4 mr-2" /> Editar</Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" /> Nova integração
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card-zoi p-5">
          <p className="text-xs text-muted-foreground font-medium">Cliente ID</p>
          <p className="font-mono text-sm mt-1">{cliente.id}</p>
        </div>
        <div className="card-zoi p-5">
          <p className="text-xs text-muted-foreground font-medium">Location ID</p>
          <p className="font-mono text-sm mt-1">{cliente.locationId}</p>
        </div>
        <div className="card-zoi p-5">
          <p className="text-xs text-muted-foreground font-medium">Status</p>
          <div className="mt-1">
            <StatusBadge status={cliente.status === "ativo" ? "success" : "muted"}>{cliente.status}</StatusBadge>
          </div>
        </div>
      </div>

      <div className="card-zoi p-6">
        <h2 className="font-display text-xl font-semibold mb-4">Integrações</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cliente.integracoes.map((i) => (
            <div key={i.tipo} className="rounded-2xl border border-border p-5 hover:border-primary/40 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display text-lg font-semibold">{i.tipo}</p>
                  {i.unitId && <p className="text-xs text-muted-foreground font-mono mt-1">Unit: {i.unitId}</p>}
                </div>
                <StatusBadge
                  status={i.status === "ativa" ? "success" : i.status === "erro" ? "error" : "muted"}
                >
                  {i.status === "nao_configurada" ? "não configurada" : i.status}
                </StatusBadge>
              </div>
              {i.ultimaSync && (
                <p className="text-xs text-muted-foreground mt-3">Última sync: {formatDate(i.ultimaSync)}</p>
              )}
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" className="flex-1">Configurar</Button>
                {i.status !== "nao_configurada" && (
                  <Button size="sm" variant="ghost">Testar</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
