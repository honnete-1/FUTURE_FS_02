"use client";

import { useAuth } from "@/store/useAuth";
import { useAdminStore } from "@/store/useAdminStore";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

function StatusBadge({ status }: { status: string }) {
    const colors: Record<string, string> = {
        pending: "bg-yellow-100 text-yellow-800",
        processing: "bg-blue-100 text-blue-800",
        shipped: "bg-purple-100 text-purple-800",
        delivered: "bg-green-100 text-green-800",
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[status] || "bg-gray-100 text-gray-800"}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}

export default function BuyerOrdersPage() {
    const { user } = useAuth();
    const { orders } = useAdminStore();
    const myOrders = orders.filter(o => o.userId === user?.id);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>

            {myOrders.length > 0 ? (
                <div className="grid gap-6">
                    {myOrders.map((order) => (
                        <Card key={order.id}>
                            <CardHeader className="flex flex-row items-center justify-between bg-gray-50/50">
                                <div>
                                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                        Placed on {new Date(order.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <StatusBadge status={order.status} />
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4">
                                            <div className="h-16 w-16 overflow-hidden rounded bg-gray-100">
                                                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium line-clamp-1">{item.title}</h4>
                                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="font-medium">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between border-t bg-gray-50/50 px-6 py-4">
                                <span className="font-semibold">Total Amount</span>
                                <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-dashed">
                    <p className="text-muted-foreground mb-4">No orders found</p>
                </div>
            )}
        </div>
    );
}
