import { AiOutlinePlus } from "react-icons/ai"
import { AiOutlineCheck } from "react-icons/ai"
import useFavorites from "@/hooks/useFavorites";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useCallback, useMemo } from "react";
import axios from "axios";

interface FavoriteButton {
    movieId: string;
}

function FavoriteButton({ movieId }: FavoriteButton) {
    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();

    const alreadyFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || "";
        return list.includes(movieId);
    }, [currentUser, movieId]);

    const favoriteHandler = useCallback(async () => {
        let response;

        if (alreadyFavorite) {
            response = await axios.delete("/api/favorite", { data: { movieId } });
        } else {
            response = await axios.post("/api/favorite", { movieId });
        }

        mutate({
            ...currentUser,
            favoriteIds: response?.data?.favoriteIds,
        });

        mutateFavorites();
    }, [movieId, alreadyFavorite, currentUser, mutate, mutateFavorites]);
    return (
        <div className="w-7 h-7 lg:w-10 lg:h-10 text-white border-[1px] mr-auto md:border-2 border-white rounded-full flex justify-center items-center transition cursor-pointer hover:border-neutral-300" onClick={favoriteHandler}>
            {alreadyFavorite ? <AiOutlineCheck size={20} /> : <AiOutlinePlus size={20} />}
        </div>
    )
}
export default FavoriteButton