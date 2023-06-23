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
            <Header userName={user['name']}></Header>
            <div className='body-padding' style={{display:'flex', flex:'1', gap:'25px', flexFlow:'wrap'}}>
               <div style={{ gap:'25px', flex:'3', display:'flex', flexFlow:'row wrap', justifyContent:'space-around'}}>
                   <Link href='/game/dailyGuess'><div className='activity-card'>Daily Guess</div></Link>
                   <Link href='/game/guess'><div className='activity-card'>Number Guess Minigame</div></Link>
                   <Link href='/game/picker'><div className='activity-card'>Game List</div></Link>
                   <Link href='/social/daily'><div className='activity-card'>Daily Result</div></Link>
               </div>
               <div style={{display:'flex', flex:'1', justifyContent:'space-around'}}>
                  <InfoColumn title='User Info' info={tempInfo}></InfoColumn>
               </div>
            </div>
        </div>
    )
}