"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Handlee, Playfair_Display } from 'next/font/google'
const handlee = Handlee({ subsets: ['latin'], weight: ['400'] })
const playfair = Playfair_Display({ subsets: ["latin"] });


function WordInfo({ word: word }: { word: string }) {

    const [data, setData] = useState([])
    const getData = async () => {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        const data = await res.json()
        return data;
    }

    // --- AUDIO logic improvements ---
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        word.length !== 0 ? getData().then(data => setData(data)) : ""
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [word])

    function handleAudioPlay() {
        if (playing && audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setPlaying(false);
        } else if (audioRef.current) {
            audioRef.current.play();
            setPlaying(true);
        }
    }
    function handleAudioEnd() {
        setPlaying(false);
    }

    if ((data as any)?.title === "No Definitions Found") return <h1 className={`${playfair.className} text-3xl lg:text-5xl text-primary-900 dark:text-primary-100`}>{(data as any)?.title}</h1>;
    return (
        <section className='w-full transition-colors duration-300'>
            {word.length !== 0 ? <div>
                {data.map((item: any, i: number) => {
                    // Only pick phonetics that have real audio
                    const phoneticsWithAudio = (item.phonetics || []).filter((p: any) => p.audio);
                    return <div key={i}>
                        <div className='flex my-12 mx-1 justify-between items-center gap-6 flex-wrap'>
                            <div className='flex flex-col gap-4'>
                                <h1 className={`${playfair.className} text-5xl text-primary-900 dark:text-primary-100`}>{item.word}</h1>
                                <p className='text-accent'>{phoneticsWithAudio.at(-1)?.text || ''}</p>
                            </div>
                            <div className="flex gap-3 items-center">
                                {phoneticsWithAudio.length > 0 && (
                                    <button
                                        onClick={handleAudioPlay}
                                        className={`rounded-full shadow-lg p-4 transition outline-none focus:ring-4 focus:ring-accent/40 border border-transparent
                                            bg-accent/10 text-primary-900
                                            dark:bg-primary-900/30 dark:text-primary-100
                                            ${playing ? 'ring-4 ring-accent/60 scale-110' : ''}`}
                                        aria-label="Play pronunciation audio"
                                    >
                                        <audio
                                            ref={audioRef}
                                            preload='auto'
                                            src={phoneticsWithAudio[0].audio}
                                            onEnded={handleAudioEnd}
                                        />
                                        {playing ? <PauseIcon /> : <PlayIcon />}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div>
                            <ul className=''>
                                {
                                    item.meanings.map((meaning: any, i: number) => {
                                        return <div className='my-12' key={i}>
                                            <p className={`${handlee.className} text-3xl font-bold flex items-center gap-4 text-gray-900 dark:text-gray-100`}>
                                                {meaning.partOfSpeech} 
                                                <div className='h-[1px] bg-gray-300 dark:bg-gray-700 w-full'></div>
                                            </p>
                                            <h2 className='text-gray-600 dark:text-gray-400 my-4 font-serif text-lg'>Meaning</h2>

                                            <ul className='ml-12'>
                                                {meaning.definitions.map((def: any, i: number) => {
                                                    return <div key={i} className='py-4'>
                                                        <li className='list-disc marker:text-violet-600 text-gray-800 dark:text-gray-200'>{def.definition}</li>
                                                        <p className='text-gray-600 dark:text-gray-400'>{def.example ? `&#34;${def.example}&#34;` : ''}</p>
                                                    </div>
                                                })}
                                            </ul>
                                        </div>
                                    })
                                }
                            </ul>
                        </div>
                        <div className='my-12'>
                            {(item.synonyms && item.synonyms.length > 0) && (
                                <div className='flex justify-start gap-12'>
                                    <h1 className='text-gray-600 dark:text-gray-400'>Synonyms</h1>
                                    {item.synonyms?.map((syn: any, i: number) => {
                                        return <p key={i} className='text-purple-600 dark:text-purple-400'>&#34;{syn}&#34;</p>
                                    })}
                                </div>
                            )}
                            {(item.antonyms && item.antonyms.length > 0) && (
                                <div className='flex justify-start gap-12'>
                                    <h1 className='text-gray-600 dark:text-gray-400'>Antonyms</h1>
                                    {item.antonyms?.map((ant: any, i: number) => {
                                        return <p key={i} className='text-red-600 dark:text-red-400'>&#34;{ant}&#34;</p>
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                })}
            </div> : ""}
        </section>
    )
}

export default WordInfo;

function PlayIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 3 20 12 6 21 6 3" /></svg>
}

function PauseIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
}
