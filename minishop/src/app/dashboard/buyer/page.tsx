"use client";

import { useAuth } from "@/store/useAuth";
import { useAdminStore } from "@/store/useAdminStore"; // We'll access orders from here for now
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BuyerDashboardPage() {
    const { user } = useAuth();
    const { orders } = useAdminStore();

    // Filter orders for this user (mocking by just checking if there are any orders, 
    // real app would filter by userId, but for demo we can just show 'recent global orders' if we don't strict link)
    // Actually, let's filter properly if we can, but since our mock auth generates random IDs on login, 
    // it's hard to persist data across re-logins unless we use the same email.
    // Let's assume the user can see *their* orders. 
    // For this mock, I'll filter by 'userId' which we store in the order.

    const myOrders = orders.filter(o => o.userId === user?.id) || [];
    const recentOrder = myOrders[0];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}!</h1>
                <p className="text-muted-foreground">Here's what's happening with your account.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{myOrders.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Account Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded inline-block">Active</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    {recentOrder ? (
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Order #{recentOrder.id}</p>
                                <p className="text-sm text-muted-foreground">{new Date(recentOrder.date).toLocaleDateString()}</p>
                            </div>
                            <Button variant="outline" asChild>
                                <Link href="/dashboard/buyer/orders">View Details</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
                            <Button asChild>
                                <Link href="/">Start Shopping</Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
