import React from 'react';
import Image from 'next/image';

function OfflineWatch() {
  return (
    <section>
        <div className='relative flex justify-center text-white text-center h-full px-6'>
            <div className="m-auto flex flex-col items-center text-center lg:flex-row-reverse">
               <div className="text-center pr-[0.375rem]">
                    <h2 className='text-3xl font-bold my-6 lg:text-5xl'>Download your shows to watch offline</h2>
                    <p className='text-xl my-6'>Save your favorites easily and always have something to watch.</p>
                </div>
               <div className="pr-[0.375rem]">
                    <div className="relative">
                        <img className='relative z-40' src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg" alt="" />
                        <div className="absolute left-[15%] flex bottom-0 z-50 bg-black w-[75%] px-0.5 py-1 rounded-md border-2 border-[2px solid rgba(128,128,128,0.7)] md:h-20">
                            <div className="relative mr-4 flex-1">
                                <Image className='min-h-[48px] min-w-[36px] md:min-h-[60px]' style={{ objectFit: 'contain', width: "100%", height: "100%" }} fill src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png" alt="" />
                            </div>
                            <div className="relative mr-4 flex-1 my-auto">
                                <div className="box-name text-sm md:text-lg lg:text-sm">Stranger Things</div>
                                <div className="box-downloading">Downloading...</div>
                            </div>
                            <div className="relative flex-1 bg-center bg-contain bg-no-repeat bg-[url('https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/download-icon.gif')]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="relative w-full h-[0.5rem] bottom-[-.5rem] bg-[#9ca3af] z-50"></div>
    </section>
  )
}

export default OfflineWatch