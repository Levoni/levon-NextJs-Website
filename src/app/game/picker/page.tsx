import Header from '@/components/header'
import User from '@/data/user';
import InfoColumn from '@/components/info_column';
import AddGame from '@/components/add_game'
import CreateGame from '@/components/create_game'
import GameSearch from '@/data/game_search';
import Game from '@/data/game';
import { cookies } from 'next/headers';
import { GetOrderedUsers, retriveUser, GetOrderedGames } from '@/components/service_fetch';
import PagePickerWrapper from '@/components/page_picker';


export default async function GamePage() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user:User = await retriveUser(token);
    var initialUsers = await GetOrderedUsers(token)
    var initialGames = await GetOrderedGames(token)
    var initialGenres = Array.from(new Set(initialGames.map((element:Game)=>{return element.genre}))).sort()

    function createStatObject() {
        return [{name:'Total Games', value:initialGames.length}]
    }

    const isAdmin = () => {
        return user && user.is_admin
    }

    return (
        <div style={{display:'flex',flexDirection:'column', flex:'1'}}>
            <Header userName={user.name}></Header>
                <div style={{flex:'1', display:'flex', padding:'50px', flexFlow:'wrap'}}>
                    <PagePickerWrapper initialUsers={initialUsers}
                        initialGames={initialGames}
                        initialGenres={initialGenres}>
                    </PagePickerWrapper>
                    <div style={{flex:'1', display:'flex', flexDirection:'column', alignItems:'center'}}>
                        <div style={{flex:'1', width:'20rem', display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                            <div style={{flex:'1', display:'flex', maxHeight:'175px'}}>
                                <InfoColumn title='Gmae Info' info={createStatObject()}></InfoColumn>
                            </div>
                            <AddGame gameList={initialGames}></AddGame>
                            {isAdmin() ? <CreateGame></CreateGame> : null}
                        </div>
                    </div>
                </div>
        </div>
    )
}