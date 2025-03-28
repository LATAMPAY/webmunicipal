import { redirect } from "next/navigation"
import { UserNav } from "@/components/user/nav"
import { checkUserAuth } from "@/lib/auth"
import { Breadcrumbs } from "@/components/breadcrumbs"

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = await checkUserAuth()

  if (!isAuthenticated) {
    redirect("/auth/login?callbackUrl=/usuario")
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <UserNav />
      
      <div className="container grid flex-1 gap-12">
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
} 