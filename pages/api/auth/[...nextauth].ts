import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { addUser } from "../../../lib/firebase"

const userApi = "https://random-data-api.com/api/v2/users"

const getRandomUser = async (): Promise<string> => {
  const res = await fetch(userApi)
  const data = await res.json()
  return data.first_name
}

export const nextAuthOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(_): Promise<any> {

        const username = await getRandomUser()
        const res = await addUser(username)
        const id = res.id

        return { name: username, email: id }
      },
    })
  ],
  pages: {
    signIn: "/login"
  },
}

export default NextAuth(nextAuthOptions)
