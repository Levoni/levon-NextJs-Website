'use client';
import { useRouter } from "next/navigation";
import { ClearLoginCookie } from "./server_actions";

export default function Logout() {
    const router = useRouter()

    const handleLogoutClick = async (event:any) => {
        event.preventDefault()
        localStorage.clear()
        await ClearLoginCookie()
        router.push('/login')
        return
    }

    return <div className="text-hover" style={{cursor:'pointer'}} onClick={handleLogoutClick}>Logout</div>
}