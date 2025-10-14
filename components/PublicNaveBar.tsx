import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function PublicNaveBar() {
    return (
        <nav className="flex justify-between items-center fixed z-50 w-full h-28 bg-gray-300 px-10 gap-4 shadow-2xl"> 
        <Link href="/login" className="flex item-center gap-1 hover:scale-150 duration-500">
            <Image
                                        src="/assets/logo.svg"
                                        alt="Planning illustration"
                                        width={60}
                                        height={60}
                                        className="mt-6"
                                    />
        </Link>
        <section className="sticky top-0 flex jusitfy-between">
            <div className="flex flex-1 max-sm:gap-0 sm:gap-6">
                <SignInButton>
                    <Button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Login</Button>
                </SignInButton>
                <SignUpButton>
                    <Button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">Register</Button>
                </SignUpButton>
            </div>
        </section>
        </nav>
    );
}