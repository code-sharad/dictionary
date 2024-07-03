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

    const audioRef = useRef<HTMLAudioElement>(null);
    useEffect(() => {
        console.log(word)
        word.length !== 0 ? getData().then(data => setData(data)) : ""

    }, [word])
    console.log(data)
    if (data?.title === "No Definitions Found") return <h1 className={`${playfair.className } text-5xl `}>{data?.title}</h1>
    return (
        <section className='w-full '>

            {word.length !== 0 ? <div>
                {data.map((item: any, i: number) => {
                    return <div key={i}>
                        <div className='flex my-12 justify-between items-center'>
                            <div className='flex flex-col gap-4'>
                                <h1 className={`${playfair.className} text-5xl `}>{item.word}</h1>
                                <p className='text-violet-700'>{item.phonetics.at(-1).text}</p>
                            </div>
                            <button onClick={() => audioRef.current?.play()} className='active:border active:border-black focus:border-black rounded-full bg-pink-100 p-6'>
                                {/* item.phonetics.text */}
                                <audio ref={audioRef} src={item.phonetics.at(0).audio} ></audio>
                                <PlayIcon />
                            </button>
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
                                                    return <div key={i}>
                                                        <li className='list-disc  marker:text-violet-600'>{def.definition}</li>
                                                        <p className='text-gray-400'>{`"${def.example}"`}</p>
                                                    </div>
                                                })}
                                            </ul>
                                        </div>
                                    })
                                }

                            </ul>
                        </div>
                        <div className='my-12'>
                            {item.meanings.synonyms?.length !== 0 ? <div className='flex justify-start gap-12'>
                                <h1 className='text-gray-400'>Synonms</h1>
                                {item.synonyms?.map((syn: any, i: number) => {
                                    return <p key={i} className='text-purple-600'>{`"${syn}"`}</p>
                                })}
                            </div> : ""}
                            {
                                item.meanings.antonyms?.length !== 0 ? <div className='flex justify-start gap-12'>
                                    <h1 className='text-gray-400'>Antonyms</h1>
                                    {item.antonyms?.map((ant: any, i: number) => {
                                        return <p key={i} className='text-red-600'>{`"${ant}"`}</p>
                                    })}
                                </div> : ""
                            }
                        </div>

                    </div>
                })}
            </div> : ""}
        </section>
    )
}

export default WordInfo;

function PlayIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play"><polygon points="6 3 20 12 6 21 6 3" /></svg>
}