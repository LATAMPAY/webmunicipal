import { redirect } from "next/navigation"
import { AdminNav } from "@/components/admin/nav"
import { checkAdminAuth } from "@/lib/auth"
import { Breadcrumbs } from "@/components/breadcrumbs"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = await checkAdminAuth()

  if (!isAuthenticated) {
    redirect("/auth/login?callbackUrl=/admin")
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <AdminNav />
      
      <div className="container grid flex-1 gap-12">
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
} 