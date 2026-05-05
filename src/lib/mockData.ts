export type Cliente = {
  id: string;
  nome: string;
  locationId: string;
  status: "ativo" | "inativo";
  ultimaSync: string;
  veiculos: number;
  integracoes: Integracao[];
};

export type Integracao = {
  tipo: "AutoCerto" | "SóCarrão" | "AutoConf" | "Altimus";
  status: "ativa" | "erro" | "nao_configurada";
  unitId?: string;
  ultimaSync?: string;
};

export type Veiculo = {
  id: string;
  marca: string;
  modelo: string;
  ano: number;
  preco: number;
  km: number;
  cambio: "Manual" | "Automático";
  categoria: string;
  origem: Integracao["tipo"];
  cliente: string;
};

export type LogSync = {
  id: string;
  cliente: string;
  fonte: Integracao["tipo"];
  status: "sucesso" | "erro";
  duracaoMs: number;
  dataHora: string;
  registros?: number;
  erro?: string;
};

export const clientes: Cliente[] = [
  {
    id: "cli_8421",
    nome: "Auto Premium SP",
    locationId: "loc_premium_sp",
    status: "ativo",
    ultimaSync: "2026-05-05T10:32:00Z",
    veiculos: 287,
    integracoes: [
      { tipo: "AutoCerto", status: "ativa", unitId: "AC-1234", ultimaSync: "2026-05-05T10:32:00Z" },
      { tipo: "SóCarrão", status: "ativa", ultimaSync: "2026-05-05T10:30:00Z" },
      { tipo: "AutoConf", status: "nao_configurada" },
      { tipo: "Altimus", status: "nao_configurada" },
    ],
  },
  {
    id: "cli_3198",
    nome: "Garage Motors RJ",
    locationId: "loc_garage_rj",
    status: "ativo",
    ultimaSync: "2026-05-05T09:48:00Z",
    veiculos: 142,
    integracoes: [
      { tipo: "AutoCerto", status: "ativa", unitId: "AC-9912", ultimaSync: "2026-05-05T09:48:00Z" },
      { tipo: "Altimus", status: "erro", ultimaSync: "2026-05-05T08:10:00Z" },
      { tipo: "SóCarrão", status: "nao_configurada" },
      { tipo: "AutoConf", status: "nao_configurada" },
    ],
  },
  {
    id: "cli_5673",
    nome: "Veículos do Sul",
    locationId: "loc_vsul",
    status: "ativo",
    ultimaSync: "2026-05-05T10:01:00Z",
    veiculos: 412,
    integracoes: [
      { tipo: "SóCarrão", status: "ativa", ultimaSync: "2026-05-05T10:01:00Z" },
      { tipo: "AutoConf", status: "ativa", unitId: "ACF-771", ultimaSync: "2026-05-05T09:55:00Z" },
      { tipo: "AutoCerto", status: "nao_configurada" },
      { tipo: "Altimus", status: "nao_configurada" },
    ],
  },
  {
    id: "cli_7740",
    nome: "MultiMarcas BH",
    locationId: "loc_mmbh",
    status: "inativo",
    ultimaSync: "2026-05-03T18:12:00Z",
    veiculos: 0,
    integracoes: [
      { tipo: "AutoCerto", status: "nao_configurada" },
      { tipo: "SóCarrão", status: "nao_configurada" },
      { tipo: "AutoConf", status: "nao_configurada" },
      { tipo: "Altimus", status: "nao_configurada" },
    ],
  },
  {
    id: "cli_1029",
    nome: "Concessionária Norte",
    locationId: "loc_norte",
    status: "ativo",
    ultimaSync: "2026-05-05T07:22:00Z",
    veiculos: 198,
    integracoes: [
      { tipo: "Altimus", status: "ativa", ultimaSync: "2026-05-05T07:22:00Z" },
      { tipo: "AutoCerto", status: "ativa", unitId: "AC-2210", ultimaSync: "2026-05-05T07:18:00Z" },
      { tipo: "SóCarrão", status: "nao_configurada" },
      { tipo: "AutoConf", status: "nao_configurada" },
    ],
  },
];

const marcas = ["Volkswagen", "Toyota", "Honda", "Chevrolet", "Hyundai", "Jeep", "Fiat", "Ford"];
const modelos: Record<string, string[]> = {
  Volkswagen: ["Nivus", "T-Cross", "Polo", "Virtus"],
  Toyota: ["Corolla", "Hilux", "Yaris", "SW4"],
  Honda: ["Civic", "HR-V", "Fit", "City"],
  Chevrolet: ["Onix", "Tracker", "S10", "Cruze"],
  Hyundai: ["HB20", "Creta", "Tucson"],
  Jeep: ["Compass", "Renegade", "Commander"],
  Fiat: ["Pulse", "Toro", "Strada", "Argo"],
  Ford: ["Ranger", "Bronco", "Territory"],
};
const fontes: Integracao["tipo"][] = ["AutoCerto", "SóCarrão", "AutoConf", "Altimus"];
const categorias = ["SUV", "Sedan", "Hatch", "Picape"];

export const veiculos: Veiculo[] = Array.from({ length: 32 }, (_, i) => {
  const marca = marcas[i % marcas.length];
  const modeloList = modelos[marca];
  const modelo = modeloList[i % modeloList.length];
  return {
    id: `vei_${1000 + i}`,
    marca,
    modelo,
    ano: 2019 + (i % 6),
    preco: 65000 + (i * 4300) % 220000,
    km: (i * 7700) % 95000,
    cambio: i % 3 === 0 ? "Manual" : "Automático",
    categoria: categorias[i % categorias.length],
    origem: fontes[i % fontes.length],
    cliente: clientes[i % clientes.length].nome,
  };
});

export const logs: LogSync[] = Array.from({ length: 24 }, (_, i) => {
  const cliente = clientes[i % clientes.length];
  const fonte = fontes[i % fontes.length];
  const erro = i % 5 === 0;
  return {
    id: `log_${5000 + i}`,
    cliente: cliente.nome,
    fonte,
    status: erro ? "erro" : "sucesso",
    duracaoMs: 800 + (i * 137) % 4200,
    dataHora: new Date(Date.now() - i * 1000 * 60 * 23).toISOString(),
    registros: erro ? 0 : 80 + (i * 13) % 320,
    erro: erro ? "Timeout ao conectar com a API externa (504)" : undefined,
  };
});

export function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatRelative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "agora";
  if (min < 60) return `há ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `há ${h}h`;
  const d = Math.floor(h / 24);
  return `há ${d}d`;
}
