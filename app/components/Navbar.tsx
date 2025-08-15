"use client"
import React, { useEffect } from 'react'

function Navbar() {
    const [darkTheme, setDarkTheme] = React.useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const theme = localStorage.getItem('theme')
            if (theme) {
                setDarkTheme(theme === 'dark')
                if (theme === 'dark') {
                    document.documentElement.classList.add('dark')
                } else {
                    document.documentElement.classList.remove('dark')
                }
            }
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = !darkTheme
        setDarkTheme(newTheme)
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newTheme ? 'dark' : 'light')
            if (newTheme) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        }
    }


    return (
        <div className='flex justify-between mb-0 lg:mb-12 items-center w-full'>
            <div>
                <BookIcon />
            </div>
            <div className='flex gap-8'>
                <button 
                    aria-label="Toggle dark mode"
                    title="Toggle dark mode"
                    className={"rounded-full p-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-400 " + (darkTheme ? 'bg-gray-800 text-yellow-300' : 'bg-yellow-50 text-gray-800')}
                    onClick={toggleTheme}>{darkTheme ? <SunIcon /> : <MoonIcon />}</button>
            </div>
        </div>
    )
}


function MoonIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
}

function BookIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-book"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
}

function SunIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sun"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
}
export default Navbar