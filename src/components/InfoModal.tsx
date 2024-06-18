import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";
import { AiOutlineClose } from "react-icons/ai";
import PlayButton from "@/components/PlayButton";
import FavoriteButton from "@/components/FavoriteButton";
import { useCallback } from "react";

function InfoModal() {
    const [modal, mutate] = useInfoModal();
    const { data: movie } = useMovie(modal?.id as string | undefined);

    const closeModal = useCallback(() => {
        mutate({
            id: null,
            isOpen: false,
        })
    }, [mutate]);

    if (!modal?.isOpen) return null;

    return (
        <div className="fixed w-screen h-screen bg-black bg-opacity-80 flex justify-center items-center text-white transition duration-300 overflow-x-hidden overflow-y-auto z-50">
            <div className="fixed z-50 top-7 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center cursor-pointer md:hidden" onClick={closeModal}>
                <AiOutlineClose className="text-white" size={20} />
            </div>
            <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
                <div className={`${modal?.isOpen ? "scale-100" : "scale-0"} transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>
                    <div className="relative h-96">
                        <video className="h-full w-full brightness-[60%] object-cover" src={movie?.videoUrl} autoPlay muted loop poster={movie?.thumbnailUrl}></video>
                        <div className="z-50 top-7 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 items-center justify-center cursor-pointer hidden lg:flex lg:absolute" onClick={closeModal}>
                            <AiOutlineClose className="text-white" size={20} />
                        </div>
                        <div className="absolute bottom-[10%] left-10">
                            <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold">
                                {movie?.title}
                            </p>
                            <div className="flex gap-4 mt-2 items-center">
                                <PlayButton isRectangle movieId={movie?.id} />
                                <FavoriteButton movieId={movie?.id} />
                            </div>
                        </div>
                    </div>
                    <div className="px-12 py-8">
                        <p className="text-green-400 font-semibold text-lg">
                            New
                        </p>
                        <p className="text-white text-lg">
                            {movie?.duration}
                        </p>
                        <p className="text-white text-lg">
                            {movie?.genre}
                        </p>
                        <p className="text-white text-lg">
                            {movie?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default InfoModal