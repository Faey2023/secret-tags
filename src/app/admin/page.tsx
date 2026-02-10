import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, BarChart3, Settings } from "lucide-react";
import Link from "next/link";
const Admin = () => {
    const navigationItems = [
        { path: '/admin/products', icon: Package, label: 'Products', description: 'Manage product catalog' },
        { path: '/admin/orders', icon: ShoppingCart, label: 'Orders', description: 'View and manage orders' },
        { path: '/admin/customers', icon: Users, label: 'Customers', description: 'Customer management' },
        { path: '/admin/analytics', icon: BarChart3, label: 'Analytics', description: 'Sales reports and insights' },
        { path: '/admin/settings', icon: Settings, label: 'Settings', description: 'Store configuration' },
    ];

    return (
        <div  >
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-card-foreground mb-2">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage your LifeStyle Mart store</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Card key={item.path} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                                <Icon className="h-6 w-6 text-primary mr-3" />
                                <CardTitle className="text-lg">{item.label}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">{item.description}</p>
                                <Button asChild className="w-full">
                                    <Link href={item.path}>Manage {item.label}</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div >
    );
};

export default Admin;