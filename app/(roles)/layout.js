import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import {
   SidebarInset,
   SidebarProvider,
   SidebarTrigger,
} from "@/components/ui/sidebar"
export default function DashboardLayout({ children }) {
   return (
      <SidebarProvider>
         <DashboardSidebar />
         <SidebarInset>
            <header className="m-2">
               <SidebarTrigger />
            </header>
            <main className="p-2">
               {children}
            </main>
         </SidebarInset>
      </SidebarProvider>

   )
}
