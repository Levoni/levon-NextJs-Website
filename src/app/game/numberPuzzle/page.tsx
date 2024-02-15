import Header from '@/components/header'
import User from '@/data/user'
import { cookies } from 'next/headers';
import { retriveUser } from '@/components/service_fetch';
import PageGuessWrapper from '@/components/page_guess';
import PageNumberPuzzle from '@/components/page_number_puzzle';

export default async function NumberPuzzlePage() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user:User = await retriveUser(token);

    return (
        <div style={{display:'flex', flexDirection:'column',flex:'1'}}>
            <Header token={token} userName={user['name']}></Header>
            <div className='body-padding' style={{display:'flex',paddingBottom:'25px', flexFlow:'wrap'}}>
                <div style={{flex:'1'}}>
                    <div className='header'>Number Puzzle</div>
                    <div style={{paddingBottom:'10px'}}>Solve the puzzle</div>
                </div>
                <div className='hide-on-mobile' style={{flex:'1'}}></div>
            </div>
            <PageNumberPuzzle></PageNumberPuzzle>
        </div>
    )
}