import React from 'react'
import Image from 'next/image'

function ProfilesForKids() {
    return (
        <section>
            <div className='relative flex justify-center text-white text-center h-full px-6'>
                <div className="m-auto flex flex-col items-center text-center lg:flex-row-reverse">
                    <div className="text-center pr-[0.375rem]">
                        <h2 className='text-3xl font-bold my-6 lg:text-5xl'>Create profiles for kids</h2>
                        <p className='text-xl my-6'>Send kids on adventures with their favorite characters in a space made just for them—free with your membership.</p>
                    </div>
                    {/* <div style={{ width: '100%', height: '100%', position: 'relative' }}> */}
                        <Image fill className="cursor-pointer !relative" src="https://occ-0-1489-2774.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABejKYujIIDQciqmGJJ8BtXkYKKTi5jiqexltvN1YmvXYIfX8B9CYwooUSIzOKneblRFthZAFsYLMgKMyNfeHwk16DmEkpIIcb6A3.png?r=f55" alt="" />
                    {/* </div> */}
                </div>
            </div>
            <div className="relative w-full h-[0.5rem] bottom-[-.5rem] bg-[#9ca3af] z-50"></div>
        </section>
    )
}

export default ProfilesForKids