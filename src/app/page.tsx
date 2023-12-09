import Header from '../components/header'
import InfoColumn from '../components/info_column'
import User from '../data/user'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { retriveUser } from '@/components/service_fetch'


export default async function GuessPage() {  
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user:User = await retriveUser(token);

    var tempInfo: Array<object> = [
        {name:'Name', value:user.name},
        {name:'Points', value:user.points},
        {name:'Daily Wins', value:user.correct_guesses},
        {name:'Daily Guesses', value:user.guesses},
        {name:'Last Daily Guesses UTC', value:user.last_daily_guess},
    ]

    return (
        <div style={{display:'flex', flexDirection:'column', flex:'1'}}>
            <Header token={token} userName={user['name']}></Header>
            <div className='body-padding' style={{display:'flex', flex:'1', gap:'25px', flexFlow:'wrap'}}>
               <div style={{ gap:'25px', flex:'3', display:'flex', flexFlow:'row wrap', justifyContent:'space-around'}}>
                   <Link href='/game/dailyGuess'><div className='activity-card'>Daily Guess</div></Link>
                   <Link href='/game/guess'><div className='activity-card'>Number Guess Minigame</div></Link>
                   <Link href='/game/clubHouseGames'><div className='activity-card'>Clubhouse Games</div></Link>
                   <Link href='/game/totGames'><div className='activity-card'>Turn Over Time Games</div></Link>
                   <Link href='/social/picker'><div className='activity-card'>Game List</div></Link>
                   <Link href='/social/daily'><div className='activity-card'>Daily Result</div></Link>
                   <Link href='/social/highScore'><div className='activity-card'>Leaderboard</div></Link>
                   <Link href='/social/photoShare'><div className='activity-card'>Photo Share</div></Link>
                   <Link href='/tools/listManager'><div className='activity-card'>List Manager</div></Link>
                   <Link href='/tools/requests'><div className='activity-card'>Requests</div></Link>
                   <Link href='/tools/changeLog'><div className='activity-card'>Changelog</div></Link>
                   <Link href='/user'><div className='activity-card'>Settings</div></Link>
               </div>
               <div style={{display:'flex', flex:'1', justifyContent:'space-around'}}>
                  <InfoColumn title='User Info' info={tempInfo}></InfoColumn>
               </div>
            </div>
        </div>
    )
}