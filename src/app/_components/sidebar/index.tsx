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
import { db } from "@/lib/db"
import { crosswords } from "@/lib/db/schema"
import { authUser } from "@/lib/server/auth"

import { ThemeSection } from "./theme"
import { UserOrLogin } from "./user-or-login"

import { desc, eq } from "drizzle-orm"
import Link from "next/link"
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
                  <Button variant="outline" asChild>
                    <Link href="/new">
                      <PiPlusCircle />
                      New Crossword
                    </Link>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <Crosswords />
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

async function Crosswords() {
  const user = await authUser()
  if (!user) return null

  const userCrosswords = await db
    .select()
    .from(crosswords)
    .where(eq(crosswords.generatedByUserId, user.id))
    .orderBy(desc(crosswords.createdAt))

  return (
    <>
      {userCrosswords.map((cw) => (
        <Button
          key={cw.id}
          variant="outline"
          className="border-neutral-300 bg-neutral-50 dark:bg-neutral-950 dark:border-neutral-700"
          asChild
        >
          <Link href={`/crossword/${cw.id}`}>{cw.theme}</Link>
        </Button>
      ))}
    </>
  )
}
