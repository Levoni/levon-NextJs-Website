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
                <div>Version 0.7</div>
                <ul>
                    <li>Added person file drive page/feature</li>
                    <li>Added loader and added to some pages</li>
                </ul>
                <div>Version 0.6</div>
                <ul>
                    <li>Added password reset feature</li>
                </ul>
                <div>Version 0.5</div>
                <ul>
                    <li>Added a photo share feature to share images with people</li>
                    <li>Fixed ordering of highscores</li>
                </ul>
                <div>Version 0.4</div>
                <ul>
                    <li>Upgraded List funtionallity. Added CSS changes and count functionallity.</li>
                    <li>Added request notifications</li>
                </ul>
                <div>Version 0.3</div>
                <ul>
                    <li>Added Domain option to the leaderboard</li>
                    <li>Fixed issue stopping requests from being created</li>
                </ul>
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