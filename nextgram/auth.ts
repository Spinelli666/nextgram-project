import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";

import google from "next-auth/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const config = {
    adapter: PrismaAdapter(prisma),
    session: {strategy: 'jwt'},
    providers: [google],
    callbacks: {
        session({ session, token }) {
            if(token.sub) session.user.userId = token.sub;
            return session;
        },
    },
    pages: {
        signIn: "/signIn",
    },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

// Providers para utilizar na minha página, dá para fazer o mapeamento
interface ProviderWithId {
    id: string;
    name: string;
}

// Mapear os providers
// Com isso, agora podemos acessar os providers na pag. de login
export const providerMap = config.providers.map((provider) => {
    const typedProvider = provider as unknown as ProviderWithId
    return {id: typedProvider.id, name: typedProvider.name}
})
