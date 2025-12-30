"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAdminStore } from "@/store/useAdminStore";

export default function CustomersPage() {
    const { orders } = useAdminStore();

    // Extract unique users from orders (mock logic since we don't have a separate users store properly linked)
    // In a real app we'd fetch from a Users table.
    const uniqueCustomers = Array.from(new Set(orders.map(o => o.userId)))
        .map(userId => {
            const order = orders.find(o => o.userId === userId);
            const orderCount = orders.filter(o => o.userId === userId).length;
            const totalSpent = orders.filter(o => o.userId === userId).reduce((acc, curr) => acc + curr.total, 0);
            return {
                id: userId,
                name: userId === "guest" ? "Guest User" : "Registered User", // We aren't storing names in orders for this simplified store
                email: "user@example.com", // Mock
                orders: orderCount,
                spent: totalSpent
            };
        });

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Customers</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Customer List</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer ID</TableHead>
                                <TableHead>Orders</TableHead>
                                <TableHead>Total Spent</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {uniqueCustomers.map(customer => (
                                <TableRow key={customer.id}>
                                    <TableCell className="font-mono">{customer.id}</TableCell>
                                    <TableCell>{customer.orders}</TableCell>
                                    <TableCell>${customer.spent.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                            {uniqueCustomers.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-4">No customers found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
