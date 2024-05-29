import Link from 'next/link'
import Logout from './logout'
import HeaderItem from './header_item'
import NotificationMenu from './notification_menu'

export default function Header(props) {
    var userName = props.userName

    return (
        <div className='header-bar' style={{paddingLeft:'10px', paddingRight:'10px', display:'flex', height:'2rem', flexDirection:'row', backgroundColor:'#2c8263'}}>
            <div style={{display:'flex',flex:'1',alignItems:'center', flexDirection:'row'}}>
                <div className="text-hover" style={{cursor:'pointer', }}><Link href={'/'}>{userName ? userName : 'Guest'}</Link></div>
                <div className='header-bar-divider'></div>
                <HeaderItem title={'Game'} items={[{name:'Daily Guess', link:'/site/game/dailyGuess'},{name:'Guess',link:'/site/game/guess'},{name:'Clubhouse Games',link:'/guest/game/clubHouseGames'},{name:'TOT Games',link:'/site/game/totGames'},{name:'Graduation Sim', link:'/site/game/graduationSim'},{name:'Number Puzzle', link:'/guest/daily/numberPuzzle'}]}></HeaderItem>
                <div className='header-bar-divider'></div>
                <HeaderItem title={'Social'} items={[{name:'Game Picker', link:'/site/social/picker'},{name:'Daily Quiz Result',link:'/site/social/daily'},{name:'Photo Share', link:'/site/social/photoShare'},{name:'Leaderboard',link:'/site/social/highScore'}]}></HeaderItem>
                <div className='header-bar-divider'></div>
                <HeaderItem title={'Tools'} items={[{name:'Requests', link:'/site/tools/requests'},{name:'List Manager',link:'/site/tools/listManager'},{name:'Drive',link:'/site/tools/drive'},{name:'Changelog',link:'/site/tools/changeLog'}]}></HeaderItem>
            </div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'flex-end', flex:'.2'}}>
                <NotificationMenu token={props.token} userName={userName}></NotificationMenu>
                <div style={{alignSelf:'center', borderRight:"1px solid black", marginLeft:'5px', marginRight:'5px', height:'75%'}}></div>
                <div className="text-hover" style={{cursor:'pointer', }}><Link href={'/site/user'}>Settings</Link></div>
                <div style={{alignSelf:'center', borderRight:"1px solid black", marginLeft:'5px', marginRight:'5px', height:'75%'}}></div>
                <Logout></Logout>
            </div>
        </div>
    )
}