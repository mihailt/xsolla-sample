import { prisma } from "@/lib/prisma";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import XsollaApi from "./xsolla";

const authenticate = async (token: string) => {
  try {
    const data = await XsollaApi.fetchUser(token)
    const { email, picture } = data

    if (email) {
      const user = await prisma.user.upsert({
        where: { email: email },
        update: { token, image: picture },
        create: { email, token, image: picture},
      })
      return {user}
    } else {
      return undefined
    }
  } catch {
    return undefined
  }
}

export const XsollaAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'xsolla-login',
      name: 'xsolla-login',
      credentials: {
        token: { label: "Token", type: "text" }
      },

      async authorize(credentials, req) {
        if (typeof credentials !== "undefined") {
          const res = await authenticate(credentials.token)
          if (typeof res !== "undefined") {
            return { ...res.user }
          } else {
            return null
          }
        } else {
          return null
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',

  callbacks: {
    async redirect({ baseUrl }: { baseUrl: string}) {
      return baseUrl
    },
    session: async ({ session }) => {
      const user = await prisma.user.findFirst({
        where: { 
          email: session.user.email
        }
      })
      if(user) {
        session.user.id = user.id
        session.user.email = user.email
        session.user.image = user.image
        session.user.token = user.token
      }

      return session
    },
  }
}