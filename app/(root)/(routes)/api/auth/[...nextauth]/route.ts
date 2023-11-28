import { XsollaAuthOptions } from "@/lib/auth"
import NextAuth from "next-auth"

const handler = NextAuth(XsollaAuthOptions)

export { handler as GET, handler as POST }