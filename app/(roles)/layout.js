import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
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
