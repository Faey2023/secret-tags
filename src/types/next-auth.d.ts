import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { RoleType } from "@prisma/client"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            role: RoleType
        } & DefaultSession["user"]
    }

    interface User extends DefaultUser {
        id: string
        role: RoleType
    }
}
