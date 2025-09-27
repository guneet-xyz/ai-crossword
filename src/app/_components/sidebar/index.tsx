import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { ThemeSection } from "./theme"
import { UserOrLogin } from "./user-or-login"

import { PiPlusCircle } from "react-icons/pi"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-center font-bold text-xl">easy crossword</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mx-auto">
            YOUR CROSSWORDS
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="outline">
                    <PiPlusCircle />
                    New Crossword
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserOrLogin />
        <ThemeSection />
      </SidebarFooter>
    </Sidebar>
  )
}
