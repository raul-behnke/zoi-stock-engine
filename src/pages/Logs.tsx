import { useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { logs, clientes, formatDate } from "@/lib/mockData";
import { Eye, Search } from "lucide-react";

export default function Logs() {
  const [q, setQ] = useState("");
  const [cliente, setCliente] = useState("todos");
  const [status, setStatus] = useState("todos");
  const [fonte, setFonte] = useState("todas");

  const filtered = logs.filter((l) => {
    if (q && !l.id.includes(q) && !l.cliente.toLowerCase().includes(q.toLowerCase())) return false;
    if (cliente !== "todos" && l.cliente !== cliente) return false;
    if (status !== "todos" && l.status !== status) return false;
    if (fonte !== "todas" && l.fonte !== fonte) return false;
    return true;
  });

  return (
    <div>
      <PageHeader title="Logs de sincronização" description="Histórico completo das execuções" />

      <div className="card-zoi p-4 mb-4 grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar…" className="pl-9" />
        </div>
        <Select value={cliente} onValueChange={setCliente}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos clientes</SelectItem>
            {clientes.map((c) => <SelectItem key={c.id} value={c.nome}>{c.nome}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={fonte} onValueChange={setFonte}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas as fontes</SelectItem>
            <SelectItem value="AutoCerto">AutoCerto</SelectItem>
            <SelectItem value="SóCarrão">SóCarrão</SelectItem>
            <SelectItem value="AutoConf">AutoConf</SelectItem>
            <SelectItem value="Altimus">Altimus</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos status</SelectItem>
            <SelectItem value="sucesso">Sucesso</SelectItem>
            <SelectItem value="erro">Erro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="card-zoi overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr className="text-left">
              <th className="px-5 py-3 font-medium">Cliente</th>
              <th className="px-5 py-3 font-medium">Fonte</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Tempo</th>
              <th className="px-5 py-3 font-medium">Data/hora</th>
              <th className="px-5 py-3 font-medium text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((l) => (
              <tr key={l.id} className="hover:bg-muted/30">
                <td className="px-5 py-4 font-medium">{l.cliente}</td>
                <td className="px-5 py-4 text-muted-foreground">{l.fonte}</td>
                <td className="px-5 py-4">
                  <StatusBadge status={l.status === "sucesso" ? "success" : "error"}>{l.status}</StatusBadge>
                </td>
                <td className="px-5 py-4 font-mono text-xs">{(l.duracaoMs / 1000).toFixed(2)}s</td>
                <td className="px-5 py-4 text-muted-foreground">{formatDate(l.dataHora)}</td>
                <td className="px-5 py-4 text-right">
                  <Button asChild size="icon" variant="ghost">
                    <Link to={`/logs/${l.id}`}><Eye className="h-4 w-4" /></Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
