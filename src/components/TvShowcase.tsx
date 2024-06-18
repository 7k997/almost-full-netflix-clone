import React from 'react'

function TvShowcase() {
  return (
    <section>
        <div className='relative flex justify-center text-white text-center h-full px-6'>
            <div className="m-auto flex flex-col items-center text-center lg:flex-row">
               <div className="text-center pr-[0.375rem]">
                    <h2 className='text-3xl font-bold my-6 lg:text-5xl'>Enjoy on your TV</h2>
                    <p className='text-xl my-6'>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more</p>
                </div>
               <div className="pr-[0.375rem]">
                    <div className="relative">
                        <img className='relative z-40' src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" alt="" />
                        <div className="absolute top-[50px] left-[42px] z-0 overflow-hidden w-full h-full max-w-[73%] max-h-[54%] md:top-[100px] md:left-[85px] lg:top-[67px] lg:left-[57px] xl:left-[82px] xl:top-[97px] 2xl:left-[85px] 2xl:top-[100px]">
                            <video autoPlay playsInline muted loop>
                                <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="relative w-full h-[0.5rem] bottom-[-.5rem] bg-[#9ca3af] z-50"></div>
    </section>
  )
}

export default TvShowcase