import {
  Users,
  Calendar,
  MessageSquare,
  FileText,
  CreditCard,
  UserCog,
  LogOut,
} from "lucide-react";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { logOut } from "@/lib/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";

const menuItems = [
  {
    title: "Patients",
    icon: Users,
    url: "/dashboard/patients",
  },
  {
    title: "Appointments",
    icon: Calendar,
    url: "/dashboard/appointments",
  },
  {
    title: "Communication",
    icon: MessageSquare,
    url: "/dashboard/communication",
  },
  {
    title: "Survey",
    icon: FileText,
    url: "/dashboard/survey",
  },
  {
    title: "Payment",
    icon: CreditCard,
    url: "/dashboard/payment",
  },
  {
    title: "Manage Users",
    icon: UserCog,
    url: "/dashboard/manage-users",
  },
];

export function DashboardSideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  return (
    <>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <Link to={item.url}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              tooltip="Sign out"
            >
              <LogOut />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}

