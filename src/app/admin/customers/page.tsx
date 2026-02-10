"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, Phone } from "lucide-react";

const AdminCustomers = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [customers] = useState([
        { id: 1, name: "John Doe", email: "john@example.com", phone: "+1 234 567 8901", orders: 5, spent: 1234.56, status: "active" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+1 234 567 8902", orders: 3, spent: 567.89, status: "active" },
        { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "+1 234 567 8903", orders: 1, spent: 89.99, status: "inactive" },
        { id: 4, name: "Sarah Wilson", email: "sarah@example.com", phone: "+1 234 567 8904", orders: 8, spent: 2156.78, status: "vip" },
    ]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "vip": return "bg-purple-100 text-purple-800";
            case "active": return "bg-green-100 text-green-800";
            case "inactive": return "bg-gray-100 text-gray-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-card-foreground">Customers</h1>
                <p className="text-muted-foreground">Manage customer relationships and data</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,234</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Active</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">1,089</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">VIP</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600">45</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">New This Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">67</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center space-x-2">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search customers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4">Customer</th>
                                    <th className="text-left py-3 px-4">Contact</th>
                                    <th className="text-left py-3 px-4">Orders</th>
                                    <th className="text-left py-3 px-4">Total Spent</th>
                                    <th className="text-left py-3 px-4">Status</th>
                                    <th className="text-left py-3 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomers.map((customer) => (
                                    <tr key={customer.id} className="border-b">
                                        <td className="py-3 px-4">
                                            <div>
                                                <div className="font-medium">{customer.name}</div>
                                                <div className="text-sm text-muted-foreground">ID: {customer.id}</div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center text-sm">
                                                    <Mail className="h-3 w-3 mr-1" />
                                                    {customer.email}
                                                </div>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <Phone className="h-3 w-3 mr-1" />
                                                    {customer.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">{customer.orders}</td>
                                        <td className="py-3 px-4 font-medium">${customer.spent.toFixed(2)}</td>
                                        <td className="py-3 px-4">
                                            <Badge className={getStatusColor(customer.status)}>
                                                {customer.status.toUpperCase()}
                                            </Badge>
                                        </td>
                                        <td className="py-3 px-4">
                                            <Button variant="outline" size="sm">
                                                View Profile
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminCustomers;