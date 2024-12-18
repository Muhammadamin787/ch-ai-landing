"use client";

import {AnimatePresence, motion} from "framer-motion";
import {Button} from "@/components/ui/button";
import {Send, Sparkles, X} from "lucide-react";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {SpinnerIcon} from "@/lib/icons";
import Image from "next/image";
import Link from "next/link";
import Intercom from "@intercom/messenger-js-sdk";

interface IValidationError {
    attr: string
    code: string
    detail: string
}

interface IResponse {
    type: "validation_error"
    errors: IValidationError[]
}

export default function Home() {
    // States
    const [email, setEmail] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSubmittedAlready, setIsSubmittedAlready] = useState(false)
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        Intercom({
            app_id: "mlyig37v",
            // user_id: "1",
            // email: "qulpi@gmail.com",
            // name: "Qulpiddin",
            // created_at: Math.floor(Date.now() / 1000),
        });
    }, []);

    // Functions
    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault()
    //     // Here you would typically send the email to your backend
    //     console.log('Email submitted:', email)
    //     setIsSubmitted(true)
    //     setTimeout(() => {
    //         setIsFormOpen(false)
    //         setIsSubmitted(false)
    //         setEmail('')
    //     }, 3000)
    // }
    // SWR Submit Function
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Replace with your endpoint URL
            const endpoint = 'https://ai.moneymentor.uz/api/v1/accounts/waitlist/';

            // Using SWR mutate for submission
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email}),
            });

            if (res.status === 400) {
                const json = await res.json() as IResponse;
                if (json.type === "validation_error"
                    // (json.errors as IValidationError[]).length > 0 &&
                    // (json.errors as IValidationError[]).find(e => e.code === "unique")
                ) {
                    // Handle notification submission
                    setIsSubmittedAlready(true)
                    setTimeout(() => {
                        setIsFormOpen(false);
                        setIsSubmittedAlready(false);
                        setEmail('');
                    }, 4000);
                }
            } else {
                // Handle successful submission
                setIsSubmitted(true);
                setTimeout(() => {
                    setIsFormOpen(false);
                    setIsSubmitted(false);
                    setEmail('');
                }, 4000);
            }

        } catch (error) {
            console.error('Error submitting email:', error);
            // console.log(error?.[0])
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="h-screen relative flex items-center justify-center flex-col app-container">
            <div className="absolute top-4 left-5">
                <Image src="/images/favicon.png" width={50} height={50} alt="logo"/>
            </div>
            <div className="absolute top-4 right-5">
                <Link href="https://chai.moneymentor.uz"
                      className="bg-white text-black px-8 py-2 rounded-md hover:bg-[#eee] active:bg-[#ddd]">Log
                    in</Link>
            </div>
            <motion.h1
                className="text-white -mt-12 tracking-wide leading-tight text-5xl w-[60%] text-center"
                initial={{y: 50, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.9}}
            >
                {/*<div className="relative inline-block top-1.5">*/}
                {/*<Link className="relative z-10  flex gap-2 items-center" href={"https://ch.ai/"}>*/}
                {/*<Image src="/images/favicon.png" width={50} height={50} alt="logo"/>*/}
                {/*</Link>*/}
                {/*<motion.div*/}
                {/*    className="absolute -top-px rounded-[19px] h-[64px] w-[200px] scale-125 transform -ml-2 inset-0 bg-gradient-to-r from-pink-500 to-yellow-500"*/}
                {/*    initial={{scaleX: 0}}*/}
                {/*    animate={{scaleX: 1}}*/}
                {/*    transition={{duration: 0.8, delay: 0.5}}*/}
                {/*    style={{originX: 0}}*/}
                {/*/>*/}
                {/*</div>*/}
                <span className="ml-5">
                Chai is an agentic AI platform and organizational
                intelligence.
                </span>
            </motion.h1>

            <motion.h2
                className="mt-8 text-[#DBDADA]  w-[60%] text-2xl text-center"
                initial={{y: 50, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.5, delay: 0.2}}
            >
                It acts as an intermediary layer connecting companies, their employees, and customers, providing
                insights to
                improve decision-making and performance.
            </motion.h2>

            <div className="h-[140px] text-center">
                <AnimatePresence mode="wait">
                    {!isFormOpen ? (
                        <motion.div
                            key="button"
                            initial={{opacity: 0, y: 50}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -50}}
                            transition={{duration: 0.5, delay: 0.3}}
                            className="mt-10 bg-r-200"
                        >
                            <Button
                                onClick={() => setIsFormOpen(true)}
                                className="bg-white text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700 text-lg px-8 py-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                <Sparkles className="h-5 w-5 mr-2"/>
                                Join to Waitlist
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{opacity: 0, y: 50}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -50}}
                            transition={{duration: 0.3, delay: 0}}
                            className="w-full max-w-md mt-10"
                        >
                            {!isSubmitted && !isSubmittedAlready ? (
                                <form onSubmit={handleSubmit}
                                      className="flex bg-re-300 flex-col items-center space-y-4">
                                    <div className="flex w-full">
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            disabled={isLoading}
                                            className={cn("h-11 text-lg shadow-none w-80 ring-0 flex-grow border-0 rounded-r-none text-black placeholder-black border-white/30", email ? "bg-white/90" : "bg-white/60")}
                                        />
                                        <Button size="lg" type="submit"
                                                disabled={isLoading}
                                                className="rounded-l-none bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800">
                                            {isLoading ? (
                                                    <SpinnerIcon rectClassName="fill-white"
                                                                 style={{
                                                                     marginLeft: "-10px",
                                                                     height: "34px",
                                                                     width: "34px"
                                                                 }} className=""/>
                                                ) :
                                                <Send className="h-4 w-4 mr-2"/>
                                            }
                                            Send
                                        </Button>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        type="button"
                                        className="text-white hover:bg-white/50 bg-white/20"
                                        onClick={() => {
                                            setIsFormOpen(false)
                                            setEmail("")
                                        }}
                                    >
                                        <X className="h-4 w-4 mr-2"/>
                                        Close
                                    </Button>
                                </form>
                            ) : (
                                <motion.div
                                    initial={{scale: 0.8, opacity: 0}}
                                    animate={{scale: 1, opacity: 1}}
                                    className="text-white text-center"
                                >
                                    <Sparkles className="h-12 w-12 mx-auto mb-4 text-yellow-300"/>
                                    <h3 className="text-2xl font-bold mb-2">{
                                        isSubmittedAlready ? "You have already joined!" :
                                            "Thank you for joining!"
                                    }</h3>
                                    <p className="text-lg">We&apos;ll be in touch soon with exclusive updates.</p>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
