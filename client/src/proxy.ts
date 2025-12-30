import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


export function proxy(req: NextRequest) {
    const cookie = req.cookies.get("session");
    const authRoutes = ["/auth/login", "/auth/register", "/auth/verify"];
    const privateRoutes = ["/user"];
    
    if (cookie?.value && authRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/", req.url));
    }
    
    if (!cookie && privateRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    
    return NextResponse.next();
}
export const config = {
    matcher: [
        "/",
        "/user/:user*",
        "/auth/:path*"
    ],
}