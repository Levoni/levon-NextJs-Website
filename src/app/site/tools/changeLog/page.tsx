import Header from "@/components/header";
import { retriveUserOrGuest } from "@/components/service_fetch";
import { cookies } from "next/headers";

export default async function ChangeLogPage() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    let user = await retriveUserOrGuest(token)

    return (
        <div>
                <div>Version 0.11</div>
                <ul>
                    <li>New number puzzle game </li>
                    <li>Added reconnection ability to clubhouse games</li>
                </ul>
                <div>Version 0.10</div>
                <ul>
                    <li>Started separation of user and guest pages (Clubhouse Games)</li>
                    <li>Updated javascript framework</li>
                    <li>fixed photoshare download button bug</li>
                    <li>Added Graduation Sim game</li>
                </ul>
                <div>Version 0.9</div>
                <ul>
                    <li>Added request notification</li>
                    <li>Bug fixes for password reset, Tot Games, saving preferences, and more</li>
                    <li>updated toaster layout for mobile</li>
                </ul>
                <div>Version 0.8</div>
                <ul>
                    <li>Fixed issue with new accounts signing up</li>
                    <li>Fixed Password Reset issue</li>
                    <li>Added confirm dialog for most delete options</li>
                    <li>Added toaster messages for some actions</li>
                    <li>Updated mobile UI on several pages</li>
                </ul>
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
    )

}