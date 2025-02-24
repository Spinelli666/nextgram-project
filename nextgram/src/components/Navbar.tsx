import { getUserByEmail } from "@/actions"
import { auth, signIn, signOut } from "auth"
import Link from "next/link"

const Navbar = async () => {

    const session = await auth()

    const user = await getUserByEmail(session?.user.email)

  return (
    <div className="bg-gray-800 text-white px-10 py-5 flex justify-between items-center">
      <Link href='/' className="text-white hover:text-zinc-200 text-lg font-bold">NextGram</Link>
      <div>
        {user ? (
          // logado
          <div className="flex gap-4 items-center">
            <p>{user.name}</p>
            <form action={async () => {
                'use server'
                await signOut()
            }}>
              <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">Sair</button>
            </form>
          </div>
        ) : (
          <Link href="/signin" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Entrar</Link>

        )}
      </div>
    </div>
  )
}

export default Navbar
