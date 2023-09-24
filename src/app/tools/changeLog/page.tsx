import Header from "@/components/header";
import { retriveUserOrGuest } from "@/components/service_fetch";
import { cookies } from "next/headers";

export default async function ChangeLogPage() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    let user = await retriveUserOrGuest(token)

    return (
        <div style={{flex:'1', display:'flex', flexDirection:'column'}}>
            <Header userName={user.name}></Header>
            <div className="body-padding">
                <div>Version 0.2</div>
                <ul>
                    <li>Corrected spelling mistake when correctly guessing under in the daily or minigame number guess.</li>
                    <li>Added a basic leaderboard page for future highscores.</li>
                    <li>Added a changelog page.</li>
                </ul>
                <div>Version 0.1</div>
                <ul>
                    <li>All initial features.</li>
                </ul>
            </div>
        </div>
    )

}