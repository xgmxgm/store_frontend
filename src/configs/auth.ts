import type { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import axios from "@/axios"

export const authConfig: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        Credentials({
            credentials: {
                email: { label: 'email', type: 'email', required: true },
                password: { label: 'password', type: 'password', required: true }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password){
                    throw new Error("Требуется адрес электронной почты и пароль.")
                }

                const requestData = {
                    email: credentials.email,
                    password: credentials.password
                }

                const res = await axios.post('/auth', requestData)
                const user = res.data.userData;

                if (user) {
                    return user
                } else {
                    throw new Error(res.data.message)
                }
            }
        })
    ],
    pages: {
        signIn: '/signin'
    }
}