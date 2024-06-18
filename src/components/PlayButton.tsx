import { BsFillPlayFill } from "react-icons/bs";
import { useRouter } from "next/router";

interface PlayButton {
    movieId: string;
    isRectangle?: boolean;
}

function PlayButton({ movieId, isRectangle = false }: PlayButton) {
    const router = useRouter();
    return (
        <>
            {!isRectangle && (
                <div onClick={() => router.push(`/watch/${movieId}`)} className="w-7 h-7 text-black lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition cursor-pointer">
                    <BsFillPlayFill size={25} />
                </div>)}
            {isRectangle && (
                <button onClick={() => router.push(`/watch/${movieId}`)} className="flex items-center px-2 py-1 text-xs text-black md:px-4 md:py-2 bg-white font-semibold rounded-md transition"><BsFillPlayFill className="mr-1 text-black" size={25} />Play</button>
            )}
        </>
    )
}
export default PlayButton