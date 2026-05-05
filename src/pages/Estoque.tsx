import { useState, useMemo } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { veiculos, formatBRL } from "@/lib/mockData";
import { Search } from "lucide-react";

export default function Estoque() {
  const [q, setQ] = useState("");
  const [marca, setMarca] = useState("todas");
  const [categoria, setCategoria] = useState("todas");
  const [cambio, setCambio] = useState("todos");
  const [faixa, setFaixa] = useState("todas");

  const marcas = useMemo(() => ["todas", ...Array.from(new Set(veiculos.map((v) => v.marca)))], []);
  const categorias = useMemo(() => ["todas", ...Array.from(new Set(veiculos.map((v) => v.categoria)))], []);

  const list = veiculos.filter((v) => {
    if (q && !`${v.marca} ${v.modelo}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (marca !== "todas" && v.marca !== marca) return false;
    if (categoria !== "todas" && v.categoria !== categoria) return false;
    if (cambio !== "todos" && v.cambio !== cambio) return false;
    if (faixa === "ate100" && v.preco > 100000) return false;
    if (faixa === "100a200" && (v.preco <= 100000 || v.preco > 200000)) return false;
    if (faixa === "acima200" && v.preco <= 200000) return false;
    return true;
  });

  return (
    <div>
      <PageHeader title="Estoque" description={`${list.length} veículos disponíveis`} />

      <div className="card-zoi p-4 mb-4 grid grid-cols-1 md:grid-cols-5 gap-3">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar marca ou modelo…" className="pl-9" />
        </div>
        <Select value={marca} onValueChange={setMarca}>
          <SelectTrigger><SelectValue placeholder="Marca" /></SelectTrigger>
          <SelectContent>{marcas.map((m) => <SelectItem key={m} value={m}>{m === "todas" ? "Todas as marcas" : m}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={categoria} onValueChange={setCategoria}>
          <SelectTrigger><SelectValue placeholder="Categoria" /></SelectTrigger>
          <SelectContent>{categorias.map((c) => <SelectItem key={c} value={c}>{c === "todas" ? "Todas categorias" : c}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={faixa} onValueChange={setFaixa}>
          <SelectTrigger><SelectValue placeholder="Faixa de preço" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Qualquer preço</SelectItem>
            <SelectItem value="ate100">Até R$ 100k</SelectItem>
            <SelectItem value="100a200">R$ 100k – 200k</SelectItem>
            <SelectItem value="acima200">Acima de R$ 200k</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((v) => (
          <div key={v.id} className="card-zoi card-zoi-hover p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-display text-lg font-semibold leading-tight">{v.marca} {v.modelo}</p>
                <p className="text-xs text-muted-foreground">{v.categoria} · {v.cambio}</p>
              </div>
              <StatusBadge status="muted">{v.origem}</StatusBadge>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="font-display text-2xl font-semibold text-secondary">{formatBRL(v.preco)}</p>
                <p className="text-xs text-muted-foreground mt-1">{v.ano} · {v.km.toLocaleString("pt-BR")} km</p>
              </div>
              <p className="text-xs text-muted-foreground text-right max-w-[8rem] truncate">{v.cliente}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
