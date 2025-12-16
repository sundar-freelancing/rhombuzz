import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSideBar } from "./DashboardSideBar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <Sidebar>
        <DashboardSideBar />
      </Sidebar>
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
