import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Remplace jsonwebtoken

const secretKey = new TextEncoder().encode("3bp9Q8S3aTriQ4"); // Remplace par ta clé

export async function middleware(req: NextRequest) {
    console.log("✅ Middleware exécuté !");
    
    const token = req.nextUrl.searchParams.get("token");
    if (!token) {
        console.log("❌ Aucun token fourni !");
        return NextResponse.redirect("https://www.eurequat-algerie.com/mon-compte/");
    }

    try {
        const { payload } = await jwtVerify(token, secretKey);
        console.log("✅ Token validé :", payload);
        return NextResponse.next();
    } catch (error:any) {
        console.log("❌ Token invalide :", error.message);
        return NextResponse.redirect("https://www.eurequat-algerie.com/mon-compte/");
    }
}

export const config = {
    matcher: "/",
};
