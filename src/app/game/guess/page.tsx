import Header from '@/components/header'
import User from '@/data/user'
import { cookies } from 'next/headers';
import { retriveUser } from '@/components/service_fetch';
import PageGuessWrapper from '@/components/page_guess';

export default async function GuessPage() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user:User = await retriveUser(token);

    return (
        <div style={{display:'flex', flexDirection:'column',flex:'1'}}>
            <Header token={token} userName={user['name']}></Header>
            <div className='body-padding' style={{display:'flex',paddingBottom:'25px', flexFlow:'wrap'}}>
                <div style={{flex:'1'}}>
                    <div className='header'>Guess the Number</div>
                    <div style={{paddingBottom:'10px'}}>A random number is generated and then you can guess as many times
                         as is needed to guess the generated number. Try to guess the 
                         number in the least amount of tries</div>
                </div>
                <div className='hide-on-mobile' style={{flex:'1'}}></div>
            </div>
            <PageGuessWrapper token={token}></PageGuessWrapper>
        </div>
    )
}