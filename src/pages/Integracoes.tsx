import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { CheckCircle2, Loader2, Plug, Save } from "lucide-react";
import { toast } from "sonner";

export default function Integracoes() {
  const [tipo, setTipo] = useState("AutoCerto");
  const [token, setToken] = useState("");
  const [unitId, setUnitId] = useState("");
  const [testing, setTesting] = useState(false);
  const [tested, setTested] = useState<null | "ok" | "fail">(null);

  const requiresUnit = tipo === "AutoCerto" || tipo === "AutoConf";

  const test = () => {
    setTesting(true);
    setTested(null);
    setTimeout(() => {
      setTesting(false);
      setTested("ok");
      toast.success("Conexão estabelecida com sucesso");
    }, 1200);
  };

  return (
    <div>
      <PageHeader
        title="Configurar integração"
        description="Conecte uma nova plataforma de estoque ao hub"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-zoi p-6">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b">
            <div className="h-11 w-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
              <Plug className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold">Nova integração</h2>
              <p className="text-sm text-muted-foreground">Preencha os dados de acesso</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <Label>Tipo de integração</Label>
              <Select value={tipo} onValueChange={setTipo}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="AutoCerto">AutoCerto</SelectItem>
                  <SelectItem value="SóCarrão">SóCarrão</SelectItem>
                  <SelectItem value="AutoConf">AutoConf</SelectItem>
                  <SelectItem value="Altimus">Altimus</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Token / API Key</Label>
              <Input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="••••••••••••••••"
              />
            </div>

            {requiresUnit && (
              <div className="space-y-2">
                <Label>Unit ID</Label>
                <Input value={unitId} onChange={(e) => setUnitId(e.target.value)} placeholder="Ex: AC-1234" />
              </div>
            )}

            <div className="flex items-center gap-3 pt-4 border-t">
              <Button onClick={test} variant="outline" disabled={testing}>
                {testing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <CheckCircle2 className="h-4 w-4 mr-2" />}
                Testar conexão
              </Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Save className="h-4 w-4 mr-2" /> Salvar integração
              </Button>
              {tested === "ok" && <StatusBadge status="success">conectado</StatusBadge>}
              {tested === "fail" && <StatusBadge status="error">falhou</StatusBadge>}
            </div>
          </div>
        </div>

        <div className="card-zoi p-6">
          <h3 className="font-display text-base font-semibold mb-3">Sobre {tipo}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Integração nativa com {tipo}. Os veículos serão sincronizados automaticamente a cada 15 minutos
            e normalizados para o schema unificado ZOI antes de serem distribuídos para o CRM e agentes de IA.
          </p>
          <div className="mt-5 rounded-xl bg-muted/50 p-4 text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Permissões necessárias</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Leitura do estoque</li>
              <li>Acesso a fotos e descrições</li>
              <li>Webhook de atualização</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
