import { AppSidebar } from '@/components/admin/AdminSidebar'
import { Button } from '@/components/ui/button'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { auth } from '@/config/auth'
import { RoleType } from '@prisma/client'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    const userRole = session?.user?.role

    if (!session || userRole !== RoleType.ADMIN) {
        redirect('/')
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full overflow-hidden">
                <AppSidebar />
                <SidebarInset className="overflow-auto">
                    <header className="bg-card border-b border-border">
                        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <SidebarTrigger className="-ml-1" />
                                <Link href="/" className="text-2xl font-bold text-primary">
                                    LifeStyle Mart
                                </Link>
                                <span className="text-muted-foreground">/ Admin Panel</span>
                            </div>
                            <Button variant="outline" asChild>
                                <Link href="/">Back to Store</Link>
                            </Button>
                        </div>
                    </header>

                    <div className="container mx-auto px-4 py-8">
                        {children}
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}
