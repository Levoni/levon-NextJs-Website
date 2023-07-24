import Header from '@/components/header'
import User from '@/data/user'
import { cookies } from 'next/headers';
import { retriveUser } from '@/components/service_fetch';
import TicTacToe from '@/components/tic_tac_toe';

export default async function TicTacToePage() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user:User = await retriveUser(token);

    return (
        <div style={{display:'flex', flexDirection:'column',flex:'1'}}>
            <Header userName={user['name']}></Header>
            <div className='body-padding' style={{display:'flex',paddingBottom:'25px', flexFlow:'wrap'}}>
                <div style={{flex:'1'}}>
                    <div className='header'>Tic Tac Toe</div>
                    <div style={{paddingBottom:'10px'}}>Play tic-tac-toe agienst other people</div>
                </div>
                <div className='hide-on-mobile' style={{flex:'1'}}></div>
            </div>
            <TicTacToe user={user}></TicTacToe> 
        </div>
    )
}