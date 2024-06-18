import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "./PlayButton";
import { useCallback } from "react";
import useInfoModal from "@/hooks/useInfoModal";

interface MovieInfo {
    id: string;
    title: string;
    description: string;
}

function BillboardInfo({ id, title, description }: MovieInfo) {
    const [ modal, mutate ] = useInfoModal();

    function truncate(string: string, n: number) {
        return string?.length > n ? string.substring(0, n - 1) + '...' : string;
    }

    const openModal = useCallback(() => {
        mutate({
            isOpen: true,
            id,
        });
    }, [id, mutate]);

    return (
        <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
            <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">{title}</p>
            <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">{truncate(description, 150)}</p>
            <div className="flex items-center mt-3 md:mt-4 gap-3">
                <PlayButton isRectangle movieId={id} />
                <button onClick={openModal} className=" flex items-center hover:bg-opacity-20 transition bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold"><AiOutlineInfoCircle className="mr-1" size={20} /> More info</button>
            </div>
        </div>
    )
}
export default BillboardInfo