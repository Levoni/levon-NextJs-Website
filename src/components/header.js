import '../app/test.css'
import Link from 'next/link'
import Logout from './logout'
import HeaderItem from './header_item'

export default function Header(props) {
    var userName = props.userName

    return (
        <div className='header-bar' style={{paddingLeft:'10px', paddingRight:'10px', display:'flex', height:'2rem', flexDirection:'row', backgroundColor:'#2c8263'}}>
            <div style={{display:'flex',flex:'1',alignItems:'center', flexDirection:'row'}}>
                <div className="text-hover" style={{cursor:'pointer', }}><Link href={'/'}>{userName}</Link></div>
                <div className='header-bar-divider'></div>
                <HeaderItem title={'Game'} items={[{name:'Daily Guess', link:'/game/dailyGuess'},{name:'Guess',link:'/game/guess'},{name:'TicTacToe',link:'/game/ticTacToe'}]}></HeaderItem>
                <div className='header-bar-divider'></div>
                <HeaderItem title={'Social'} items={[{name:'Game Picker', link:'/social/picker'},{name:'Daily Quiz Result',link:'/social/daily'}]}></HeaderItem>
                <div className='header-bar-divider'></div>
                <HeaderItem title={'Tools'} items={[{name:'Requests', link:'/tools/requests'},{name:'List Manager',link:'/tools/listManager'}]}></HeaderItem>
            </div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'flex-end', flex:'.2'}}>
                <div className="text-hover" style={{cursor:'pointer', }}><Link href={'/user'}>Settings</Link></div>
                <div style={{alignSelf:'center', borderRight:"1px solid black", marginLeft:'5px', marginRight:'5px', height:'75%'}}></div>
                <Logout></Logout>
            </div>
        </div>
    )
}