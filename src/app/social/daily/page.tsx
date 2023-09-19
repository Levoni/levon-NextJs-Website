import AddDailyResult from "@/components/add_daily_result";
import AddSite from "@/components/add_site";
import Header from "@/components/header";
import Leaderboard from "@/components/leaderboard";
import PersonalStatistics from "@/components/personal_stats";
import { GetSite, retriveUser } from "@/components/service_fetch";
import User from "@/data/user";
import { cookies } from "next/headers";

export default async function SocialDaily() {
  const cookieStore = cookies()
  const token = cookieStore.get('loginToken')?.value
  var user:User = await retriveUser(token);
  var initialSites = await GetSite(token)

  return (
      <div style={{flex:'1', display:'flex', flexDirection:'column'}}>
        <Header token={token} userName={user.name}></Header>
        <div className="body-padding" style={{display:'flex', justifyContent:'space-around',flex:'1', gap:'25px', flexWrap:'wrap'}}>
          <div className=" column" style={{flex:'1', justifyContent:'flex-start', gap:'25px'}}>
            <div>
              <div className="header">Daily Quiz Leaderboards</div>
              <div style={{paddingTop:'25px', paddingBottom:'10px'}}>This page is for users to view daily quiz results. 
                Users can view the leaderboard for each quiz for each day (results over time to be included in the future). 
                Users can also view their personal result history.</div>
              <div style={{paddingBottom:'50px'}}>Note: When adding results, please use date of the quiz not the date you are submitting it on.</div>
            </div>
            <div>
              <AddDailyResult initialSites={initialSites}></AddDailyResult>
            </div>
            <div>
              <PersonalStatistics user={user} sites={initialSites}></PersonalStatistics>
            </div>
          </div>
          <div className="column" style={{flex:'1', display:'flex', flexDirection:'column'}}>
            <div style={{display:'flex', flex:'1', flexDirection:'column', gap:'25px', justifyContent:'flex-start'}}>
              <Leaderboard sites={initialSites}></Leaderboard>
              {user.is_admin ? <div style={{display:'flex', justifyContent:'center'}}>
                <AddSite></AddSite>
              </div> : ''}
            </div>
          </div>
        </div>
      </div>
  )
}
