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
                          <h1 className="text-2xl font-black lg:text-3xl">Your time, perfectly planned</h1>
                        <p className="font-extralight">
                            Join million of professionals who easily book meeting with the #1 scheduling tool
                        </p>
                        <Image
                            src="/assets/planning.svg"
                            alt="Planning illustration"
                            width={500}
                            height={500}
                            className="mt-6"
                        />
            </section>
        </main>
    )
}