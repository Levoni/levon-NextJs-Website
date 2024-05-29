import PageNumberPuzzle from "@/components/page_number_puzzle";
import { retriveUserOrGuest } from "@/components/service_fetch";
import { cookies } from "next/headers";

export default async function clubHouseGamesPage() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user = {...await retriveUserOrGuest(token)}
    return (
        <div>
            <div>
                <div className="header">Number Puzzle</div>
                <div className="body-text">This puzzle will be composed of 5 numbers that must follow a specific set of rules. The goal is to find the smallest numbers (left to right) that adheres to the rules.</div>
                <div className="body-text">The best possible score is 100 and will be lowered if the solutions answers are larger.</div>
            </div>
            <PageNumberPuzzle  user={user} token={token}></PageNumberPuzzle>
        </div>
    )
  }
  