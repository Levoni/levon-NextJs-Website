import Link from 'next/link'
import HeaderItem from './header_item'

export default function HeaderGuest() {
    return (
        <div className='header-bar' style={{paddingLeft:'10px', paddingRight:'10px', display:'flex', height:'2rem', flexDirection:'row', backgroundColor:'#2c8263'}}>
            <div style={{display:'flex',flex:'1',alignItems:'center', flexDirection:'row'}}>
                <div className="text-hover" style={{cursor:'pointer', }}><Link href={'/'}>{'Guest'}</Link></div>
                <div className='header-bar-divider'></div>
                <HeaderItem title={'Game'} items={[{name:'Clubhouse Games',link:'/guest/game/clubHouseGames'}]}></HeaderItem>
            </div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'flex-end', flex:'.2'}}>
                <div className="text-hover" style={{cursor:'pointer', }}><Link href={'/login'}>{'Login'}</Link></div>
            </div>
        </div>
    )
}