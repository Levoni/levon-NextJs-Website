import PageVNVDocumentationWrapper from "@/components/page_vnv_documentation";
import { retriveUserOrGuest } from "@/components/service_fetch";
import { cookies } from "next/headers";

export default async function VNVDocumentationPage() {
    const cookieStore = cookies()
    const token = cookieStore.get('loginToken')?.value
    var user = { ...await retriveUserOrGuest(token) }

    return (
        <div>
            <PageVNVDocumentationWrapper></PageVNVDocumentationWrapper>
        </div>
    )
}
