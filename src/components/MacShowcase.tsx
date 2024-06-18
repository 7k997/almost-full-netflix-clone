import React from 'react'

function MacShowcase() {
  return (
    <section>
        <div className='relative flex justify-center text-white text-center h-full px-6'>
        <div className="m-auto flex flex-col items-center text-center lg:flex-row">
        <div className="text-center pr-[0.375rem]">
                    <h2 className='text-3xl font-bold my-6 lg:text-5xl'>Watch everywhere</h2>
                    <p className='text-xl my-6'>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
                </div>
                <div className="pr-[0.375rem]">
                <div className="relative">
                        <img className='relative z-50' src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png" alt="" />
                        <div className="absolute top-[25px] left-[60px] z-0 overflow-hidden w-full h-full max-w-[62%] max-h-[45%] md:top-[50px] md:left-[117px] lg:top-[40px] lg:left-[90px] xl:left-[120px] xl:top-[55px] 2xl:left-[120px] 2xl:top-[55px]">
                            <video autoPlay playsInline muted loop>
                                <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v" type="video/mp4" />
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

export default MacShowcase