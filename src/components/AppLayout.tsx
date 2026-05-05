import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b bg-card/80 backdrop-blur sticky top-0 z-10 flex items-center px-4 gap-4">
            <SidebarTrigger />
            <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar clientes, veículos, logs…"
                  className="pl-9 bg-background"
                />
              </div>
            </div>
            <div className="flex-1" />
            <button className="relative h-9 w-9 rounded-xl border flex items-center justify-center hover:bg-muted transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l">
              <div className="h-9 w-9 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-semibold">
                ZO
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-sm font-medium">Equipe ZOI</span>
                <span className="text-xs text-muted-foreground">admin</span>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 lg:p-8 max-w-container w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
