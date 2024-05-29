import Header from '@/components/header'
import Guesser from '@/components/guess'
import InfoColumn from '@/components/info_column';
import User from '@/data/user'
import DataTable from '@/components/data_table';
import { cookies } from 'next/headers';
import { GetUserGuess, retriveUser, retriveWonNumbers } from '@/components/service_fetch';

export default async function GuessPage() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user:User = await retriveUser(token);
    const numberHistory = await retriveWonNumbers(token)
    const guessData = await GetUserGuess(token)

    const createStatObject = () => {
        return [
            {
                name:"Daily Guess Id",
                value:guessData.numberId
            },
            {
                name: "Current Guess Amount",
                value: guessData.guessInfo.length
            },
            {
                name:"Total Daily Guesses",
                value:user.guesses
            },
            {
                name:'Correct Guesses', 
                value:user.correct_guesses
            }
        ]
    }

    const createTableData = () => {
        let data = {
            header:[{text:'Number',value:'Number'},
            {text:'Winner',value:'winner'},
            {text:'Date Created',value:'CreatedDate'},
            ],
            values:numberHistory
          }
          return data
    }

    return (
        <>
            <div style={{paddingBottom:'25px', display:'flex', flexFlow:'wrap'}}>
                <div style={{flex:'1'}}>
                    <div className='header'>Daily Guess</div>
                    <div>
                        This is a guessing competition. There is one daily guess number that everone has a chance to guess each day. 
                        Whomever guesses the number first gets a reward in the form of points. The number will then reset to be guessed again.
                        The number will be between 0-100 (inclusive)
                    </div>
                </div>
                <div className='hide-on-mobile' style={{flex:'1'}}></div>
            </div>
            <div style={{paddingTop:'0px', gap:'25px', display:'flex',flex:'1',justifyContent:'space-around', flexFlow:'wrap'}}>
                <div style={{flex:'1', display:'flex', flexDirection:'column', justifyContent:'flex-start', gap:'50px'}}>
                    <div style={{flex:'1'}}>
                        <Guesser 
                         type='Daily'
                         number='0'
                         key='dailyGuess'
                         previousGuess={guessData.guessInfo}
                         lastGuessDate={user.last_daily_guess}
                         token={token}>
                        </Guesser>
                    </div>
                    <div style={{flex:'2'}} className='card'>
                        <DataTable title={'Winner History'} data={createTableData()}></DataTable>
                    </div>
                </div>
                <div style={{flex:'1', display:'flex', justifyContent:'center'}}>
                    <InfoColumn title='Stats' info={createStatObject()}></InfoColumn>
                </div>
            </div>
        </>
    )
}