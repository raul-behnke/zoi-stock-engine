import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import { clientes, formatRelative } from "@/lib/mockData";
import { Eye, Pencil, Plug, Plus, Search } from "lucide-react";
import { useState } from "react";

export default function Clientes() {
  const [q, setQ] = useState("");
  const filtered = clientes.filter((c) =>
    c.nome.toLowerCase().includes(q.toLowerCase()) || c.id.includes(q)
  );

  return (
    <div>
      <PageHeader
        title="Clientes"
        description="Gerencie os clientes conectados ao hub"
        actions={
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" /> Novo cliente
          </Button>
        }
      />

      <div className="card-zoi p-2 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nome ou ID…" className="pl-9 border-0 focus-visible:ring-0" />
        </div>
      </div>

      <div className="card-zoi overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr className="text-left">
              <th className="px-5 py-3 font-medium">Cliente</th>
              <th className="px-5 py-3 font-medium">ID</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Veículos</th>
              <th className="px-5 py-3 font-medium">Última sync</th>
              <th className="px-5 py-3 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-4 font-medium">{c.nome}</td>
                <td className="px-5 py-4 text-muted-foreground font-mono text-xs">{c.id}</td>
                <td className="px-5 py-4">
                  <StatusBadge status={c.status === "ativo" ? "success" : "muted"}>
                    {c.status}
                  </StatusBadge>
                </td>
                <td className="px-5 py-4">{c.veiculos.toLocaleString("pt-BR")}</td>
                <td className="px-5 py-4 text-muted-foreground">{formatRelative(c.ultimaSync)}</td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-1">
                    <Button asChild size="icon" variant="ghost">
                      <Link to={`/clientes/${c.id}`}><Eye className="h-4 w-4" /></Link>
                    </Button>
                    <Button size="icon" variant="ghost"><Pencil className="h-4 w-4" /></Button>
                    <Button asChild size="icon" variant="ghost">
                      <Link to={`/integracoes?cliente=${c.id}`}><Plug className="h-4 w-4" /></Link>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
