'use client'

import { updateUserProfile } from "@/actions"
import { User } from "../../types/User"
import { useActionState } from "react"
import Label from "./Label"
import Button from "./Button"

type ProfileFormProps = {
    user: User
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {

    const [formState, formAction] = useActionState(updateUserProfile, {
        message: "",
        type: "success",
    })

  return (
    <div>{formState.message && <p>Algum texto...</p>}
        <form action="">
            <input type="hidden" name="id" value={user.id} />
            <div>
                <Label htmlFor="name" text="Nome" />
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Digite o seu nome" 
                    defaultValue={user.name || ""} 
                    className="p-2 border border-zinc-300 rounded w-full text-sm placeholder:text-zinc-500 focus:ring-0 focus:outline-none"
                />
                <p>Image preview</p>
                <div className="flex justify-end">
                    <Button type='submit' text='Salvar' />
                </div>
            </div>
        </form>
    </div>
  )
}

export default ProfileForm
