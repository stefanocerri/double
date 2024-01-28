"use client"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/Logo"
import { signOut, useSession } from "next-auth/react"
import { translationClient } from "@/utilities/i18n"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuShortcut
  } from "@/components/ui/dropdown-menu"

export function Header() {
    const { data: session } = useSession()
    const { t } = translationClient("it")

    const initials = session?.user?.name ?
    session.user.name.split(' ').map(word => word[0]).join('') : '';

    return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                <Logo/>
                {session?.user?.name && (
                    <div className="flex gap-3 items-center">
                        {session?.user?.name}
                        {session.user.image ?
                            (
                                <div className="w-10 h-10 aspect-1 rounded-full overflow-hidden">
                                    <img className="object-cover" src={session.user.image} alt={session.user.name} />
                                </div>
                            ) : (
                                <div className="w-10 h-10 aspect-1 rounded-full overflow-hidden bg-red-500 flex items-center justify-center">
                                    {initials}
                                </div>
                            )
                        }
                        <button className="text-xs bg-black text-white py-2 px-3 rounded-lg" onClick={() => signOut()}>{t("auth.signOut")}</button>
                    </div>
                )}
        </div>
    </header>
  )
}