import Header from "@/components/header"
import HeaderGuest from "@/components/header_guest"
import { retriveUser, retriveUserOrGuest } from "@/components/service_fetch"
import { cookies } from "next/headers"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user = {...await retriveUser(token)}
  return (

    <div style={{display:'flex',flexDirection:'column', flex:'1'}}>
        <Header token={token} userName={user['name']}></Header>
        <div className="body-padding" style={{display:'flex', justifyContent:'space-around',flex:'1', gap:'25px', flexWrap:'wrap'}}>
            {children}
        </div>
    </div>
  )
}
