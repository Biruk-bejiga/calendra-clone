import PrivateNaveBar from "@/components/PrivateNaveBar";
import PublicNaveBar from "@/components/PublicNaveBar";
import { currentUser } from "@clerk/nextjs/server"
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const user = await currentUser();
  return (
    <main className="relative">
        {/* <PublicNaveBar/> */}
        {user ? <PrivateNaveBar/> : <PublicNaveBar/>}
        <section className="pt-36">
            {children}
        </section>
    </main>
  )
}