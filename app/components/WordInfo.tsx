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
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);
    const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

    useEffect(() => {
        word.length !== 0 ? getData().then(data => setData(data)) : ""
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [word])

    function handleAudioPlay(idx: number) {
        if (playingIndex !== null && audioRefs.current[playingIndex]) {
            audioRefs.current[playingIndex]?.pause();
            audioRefs.current[playingIndex]!.currentTime = 0;
        }
        if (audioRefs.current[idx]) {
            audioRefs.current[idx]?.play();
            setPlayingIndex(idx);
        }
    }
    function handleAudioEnd() {
        setPlayingIndex(null);
    }

    if ((data as any)?.title === "No Definitions Found") return <h1 className={`${playfair.className} text-3xl lg:text-5xl `}>{(data as any)?.title}</h1>;
    return (
        <section className='w-full transition-colors duration-300'>
            {word.length !== 0 ? <div>
                {data.map((item: any, i: number) => {
                    // Only pick phonetics that have real audio
                    const phoneticsWithAudio = (item.phonetics || []).filter((p: any) => p.audio);
                    return <div key={i}>
                        <div className='flex my-12 mx-1 justify-between items-center gap-6 flex-wrap'>
                            <div className='flex flex-col gap-4'>
                                <h1 className={`${playfair.className} text-5xl dark:text-gray-100`}>{item.word}</h1>
                                <p className='text-violet-700 dark:text-violet-300'>{phoneticsWithAudio.at(-1)?.text || ''}</p>
                            </div>
                            <div className="flex gap-3 items-center">
                                {phoneticsWithAudio.map((phon: any, audioIdx: number) => (
                                    <button
                                        key={audioIdx}
                                        onClick={() => handleAudioPlay(audioIdx)}
                                        className={`rounded-full bg-pink-100 dark:bg-purple-900/30 shadow-lg p-4 transition outline-none focus:ring-4 focus:ring-pink-300/60 border border-transparent ${playingIndex === audioIdx ? 'ring-4 ring-pink-400/60 scale-110' : ''}`}
                                        aria-label={`Play pronunciation audio ${audioIdx+1}`}
                                    >
                                        <audio
                                            ref={el => (audioRefs.current[audioIdx] = el)}
                                            preload='auto'
                                            src={phon.audio}
                                            onEnded={handleAudioEnd}
                                        />
                                        {playingIndex === audioIdx ? <PauseIcon /> : <PlayIcon />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>

                            <ul className=''>
                                {
                                    item.meanings.map((meaning: any, i: number) => {
                                        return <div className='my-12' key={i}>
                                            <p className={`${handlee.className}  text-3xl  font-bold flex items-center gap-4`}>{meaning.partOfSpeech} <div className='h-[1px] bg-gray-300 w-full'></div></p>
                                            <h2 className='text-gray-400 my-4 font-serif text-lg'>Meaning</h2>

                                            <ul className='ml-12'>
                                                {meaning.definitions.map((def: any, i: number) => {
                                                    return <div key={i} className='py-4'>
                                                        <li className='list-disc  marker:text-violet-600'>{def.definition}</li>
                                                        <p className='text-gray-400'>{def.example ? `"${def.example}"` : ''}</p>
                                                    </div>
                                                })}
                                            </ul>
                                        </div>
                                    })
                                }

                            </ul>
                        </div>
                        <div className='my-12'>
                            {(item.synonyms && item.synonyms.length > 0) && <div className='flex justify-start gap-12'>
                                <h1 className='text-gray-400'>Synonyms</h1>
                                {item.synonyms?.map((syn: any, i: number) => {
                                    return <p key={i} className='text-purple-600'>{`"${syn}"`}</p>
                                })}
                            </div>}
                            {(item.antonyms && item.antonyms.length > 0) && <div className='flex justify-start gap-12'>
                                <h1 className='text-gray-400'>Antonyms</h1>
                                {item.antonyms?.map((ant: any, i: number) => {
                                    return <p key={i} className='text-red-600'>{`"${ant}"`}</p>
                                })}
                            </div>}
                        </div>

                    </div>
                })}
            </div> : ""}
        </section>
    )
}

export default WordInfo;

function PlayIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 3 20 12 6 21 6 3" /></svg>;
}
function PauseIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>;
}
}

export default WordInfo;

function PlayIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-play"><polygon points="6 3 20 12 6 21 6 3" /></svg>
}