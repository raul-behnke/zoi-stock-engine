import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import ClienteDetalhe from "./pages/ClienteDetalhe";
import Integracoes from "./pages/Integracoes";
import Estoque from "./pages/Estoque";
import Logs from "./pages/Logs";
import LogDetalhe from "./pages/LogDetalhe";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/clientes/:id" element={<ClienteDetalhe />} />
            <Route path="/integracoes" element={<Integracoes />} />
            <Route path="/estoque" element={<Estoque />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/logs/:id" element={<LogDetalhe />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
