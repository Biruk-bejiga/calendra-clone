'use client'
import Image from "next/image";

export default function LandingPage() {
    return (
        <main className="flex items-center p-10 gap-24 animate-fade-in max-md:flex-col">
            <section className="flex flex-col items-center">
                 <Image
                          src="/assets/logo.svg"
                          alt="Logo"
                          width={100}
                          height={100}
                          
                          />
            </section>
        </main>
    )
}