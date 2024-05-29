import Header from "@/components/header"
import HeaderGuest from "@/components/header_guest"
import { retriveUserOrGuest } from "@/components/service_fetch"
import { cookies } from "next/headers"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user = {...await retriveUserOrGuest(token)}
  return (

    <div style={{display:'flex',flexDirection:'column', flex:'1'}}>
    {!user['name'] || user['name'] == "Guest" ? 
        <HeaderGuest></HeaderGuest> :
        <Header token={token} userName={user['name']}></Header>}
        <div className="body-padding">
            {children}
        </div>
    </div>
  )
}
