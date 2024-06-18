import { PiCaretDownBold } from "react-icons/pi";
import PlayButton from "@/components/PlayButton";
import FavoriteButton from "@/components/FavoriteButton";
import { useCallback } from "react";
import useInfoModal from "@/hooks/useInfoModal";

interface Movie {
  movie: any;
  indx: number;
  innerRef: any;
}

function MovieCard({ movie, indx, innerRef }: Movie) {
  const [modal, mutate] = useInfoModal();

  const openModal = useCallback(() => {
    mutate({
      isOpen: true,
      id: movie?.id,
    });
  }, [movie?.id, modal, mutate]);

  return (
    <div ref={innerRef} id={`movie-card-[${indx}]`} className="relative group md:h-[12vw] cursor-pointer min-w-[50%] max-w-[50%] md:min-w-[25%]">
      <img className="h-[33vw] w-full rounded-md transition duration delay-300 shadow-xl md:h-[12vw] group-hover:opacity-100 sm:group-hover:opacity-300 cursor-pointer object-cover" src={movie.thumbnailUrl} alt="Thumb" />
      <div className="absolute py-4 md:py-7 flex flex-col items-between opacity-0 bg-zinc-800 top-0 left-0 right-0 bottom-0 w-full h-full rounded-md transition duration delay-200 shadow-xl md:h-[12vw] group-hover:opacity-80 sm:group-hover:opacity-80 cursor-pointer object-cover"></div>
      <div className="absolute py-6 md:py-7 px-3.5 top-0 left-0 right-0 bottom-0 flex flex-col transition duration delay-300 opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 justify-between">
        <div>
          <p className="text-white text-xs md:text-xl font-semibold">Title: {movie?.title}</p>
          <p className="text-white text-xs md:text-xl">{movie?.duration}</p>
        </div>
        <div className="flex gap-2">
          <PlayButton movieId={movie?.id} />
          <FavoriteButton movieId={movie?.id} />
          <div onClick={openModal} className="w-7 h-7 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition cursor-pointer">
            <PiCaretDownBold size={25} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default MovieCard