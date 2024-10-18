'use client'

import {useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import {Send, Sparkles, X} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"

export default function InPlaceWaitlistForm() {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the email to your backend
        console.log('Email submitted:', email)
        setIsSubmitted(true)
        setTimeout(() => {
            setIsFormOpen(false)
            setIsSubmitted(false)
            setEmail('')
        }, 3000)
    }

    return (
        <section className="w-full py-24 lg:py-32 bg-gradient-to-br from-purple-700 via-violet-600 to-indigo-700">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center space-y-8 text-center">
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white"
                        initial={{y: 50, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{duration: 0.5}}
                    >
                        Be Part of the Future
                    </motion.h1>
                    <motion.p
                        className="mx-auto max-w-[700px] text-xl text-violet-100"
                        initial={{y: 50, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{duration: 0.5, delay: 0.2}}
                    >
                        Join our waitlist and be the first to experience our revolutionary product.
                        Don&apos;t miss out on exclusive early access and special perks!
                    </motion.p>
                    <AnimatePresence mode="wait">
                        {!isFormOpen ? (
                            <motion.div
                                key="button"
                                initial={{opacity: 0, y: 50}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -50}}
                                transition={{duration: 0.3}}
                            >
                                <Button
                                    onClick={() => setIsFormOpen(true)}
                                    className="bg-white text-violet-600 hover:bg-violet-100 hover:text-violet-700 text-lg px-8 py-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    <Sparkles className="h-5 w-5 mr-2"/>
                                    Add to Waitlist
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                initial={{opacity: 0, y: 50}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -50}}
                                transition={{duration: 0.3}}
                                className="w-full max-w-md"
                            >
                                {!isSubmitted ? (
                                    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
                                        <div className="flex w-full">
                                            <Input
                                                type="email"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="flex-grow rounded-r-none bg-white/10 text-white placeholder-white/70 border-white/30"
                                            />
                                            <Button type="submit"
                                                    className="rounded-l-none bg-white text-violet-600 hover:bg-violet-100 hover:text-violet-700">
                                                <Send className="h-4 w-4 mr-2"/>
                                                Send
                                            </Button>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-white hover:bg-white/20"
                                            onClick={() => setIsFormOpen(false)}
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
                                        <h3 className="text-2xl font-bold mb-2">Thank you for joining!</h3>
                                        <p className="text-lg">We&apos;ll be in touch soon with exclusive updates.</p>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Decorative elements */}
            <div
                className="absolute top-1/4 left-4 w-24 h-24 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div
                className="absolute top-1/3 right-4 w-32 h-32 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div
                className="absolute bottom-1/4 left-1/2 w-36 h-36 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </section>
    )
}