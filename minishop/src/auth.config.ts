import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
            const isOnSellerDashboard = nextUrl.pathname.startsWith("/dashboard/seller")
            const isOnBuyerDashboard = nextUrl.pathname.startsWith("/dashboard/buyer")
            // @ts-ignore
            const userRole = auth?.user?.role?.toUpperCase()

            if (isOnDashboard) {
                if (isLoggedIn) {
                    if (isOnSellerDashboard && userRole !== "SELLER" && userRole !== "ADMIN") {
                        return Response.redirect(new URL("/dashboard/buyer", nextUrl))
                    }
                    if (isOnBuyerDashboard && userRole !== "BUYER" && userRole !== "ADMIN") {
                        return Response.redirect(new URL("/dashboard/seller", nextUrl))
                    }
                    return true
                }
                return false // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                // Redirect to respective dashboard if already logged in and on login/signup page
                if (nextUrl.pathname === "/login" || nextUrl.pathname === "/signup") {
                    if (userRole === "SELLER") {
                        return Response.redirect(new URL("/dashboard/seller", nextUrl))
                    } else {
                        return Response.redirect(new URL("/dashboard/buyer", nextUrl))
                    }
                }
            }
            return true
        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string
            }
            return session
        }
    },
    providers: [],
} satisfies NextAuthConfig
