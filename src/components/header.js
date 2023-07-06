import '../app/test.css'
import Link from 'next/link'
import Logout from './logout'

export default function Header(props) {
    var userName = props.userName

    return (
        <div className='header-bar' style={{paddingLeft:'10px', paddingRight:'10px', display:'flex', height:'2rem', flexDirection:'row', backgroundColor:'#2c8263'}}>
            <div style={{display:'flex',flex:'1',alignItems:'center', flexDirection:'row'}}>
                <div className="text-hover" style={{cursor:'pointer', }}><Link href={'/'}>{userName}</Link></div>
                <div style={{alignSelf:'center', borderRight:"1px solid black", marginLeft:'5px', marginRight:'5px', height:'75%'}}></div>
                <div className="text-hover" style={{cursor:'pointer'}}><Link href={'/game/dailyGuess'}>Daily Guess</Link></div>
                <div style={{alignSelf:'center', borderRight:"1px solid black", marginLeft:'5px', marginRight:'5px', height:'75%'}}></div>
                <div className="text-hover" style={{cursor:'pointer'}}><Link href={'/game/guess'}>Minigame</Link></div>
                <div style={{alignSelf:'center', borderRight:"1px solid black", marginLeft:'5px', marginRight:'5px', height:'75%'}}></div>
                <div className="text-hover" style={{cursor:'pointer'}}><Link href={'/social/picker'}>Game List</Link></div>
                <div style={{alignSelf:'center', borderRight:"1px solid black", marginLeft:'5px', marginRight:'5px', height:'75%'}}></div>
                <div className="text-hover" style={{cursor:'pointer'}}><Link href={'/social/daily'}>Daily Result</Link></div>
                <div style={{alignSelf:'center', borderRight:"1px solid black", marginLeft:'5px', marginRight:'5px', height:'75%'}}></div>
                <div className="text-hover" style={{cursor:'pointer'}}><Link href={'/tools/requests'}>Requests</Link></div>
            </div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'flex-end', flex:'.2'}}>
                <div style={{alignSelf:'center', borderRight:"1px solid black", marginLeft:'5px', marginRight:'5px', height:'75%'}}></div>
                <Logout></Logout>
            </div>
        </div>
    )
}