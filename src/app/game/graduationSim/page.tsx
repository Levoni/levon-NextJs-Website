import Header from '@/components/header'
import User from '@/data/user'
import { cookies } from 'next/headers';
import { retriveUser } from '@/components/service_fetch';
import PageGuessWrapper from '@/components/page_guess';
import PageGraduation from '@/components/page_graduation';

export default async function GraduationSimPage() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user:User = await retriveUser(token);

    return (
        <div style={{display:'flex', flexDirection:'column',flex:'1'}}>
            <Header token={token} userName={user['name']}></Header>
            <PageGraduation token={token}></PageGraduation>
        </div>
    )
}