import MovieCard from "@/components/MovieCard";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

interface MoviesList {
    category: string;
    movies: Record<string, any>[];
}

function MoviesCategory({ category, movies }: MoviesList) {
    const itemsRef = useRef<Map<any, any>>(null!);
    const [vwIndexSet, setVwIndex] = useState(false);
    const [currIndx, setCurrIndx] = useState(0);
    const [isMounted, setIsMounted] = useState(false)

    const moviesInView: any = useCallback((onlyLength = false) => {
        const refsMap = getMap();
        const node = refsMap.get(`movie-card-[0]`);
        let moviesInView = Math.trunc(Math.max(document?.documentElement.clientWidth || 0, window.innerWidth || 0) / node?.offsetWidth)
        if (onlyLength) {
            return moviesInView
        }
        return [moviesInView, node]
    }, []);

    function appropriateSkip(fwd = false) {
        const howmany = movies?.length;
        const [numberOfMoviesInView, _] = moviesInView();
        if (fwd) {
            // last index based
            setCurrIndx(currIndx + numberOfMoviesInView >= howmany ? howmany - 1 : (currIndx === 0 ? ((currIndx + (2*numberOfMoviesInView)) - 1) : (currIndx + numberOfMoviesInView)));
        } else {
            // first index based
            const remain = (currIndx + 1) % numberOfMoviesInView;
            const lmi = remain === 0 ? currIndx - (numberOfMoviesInView - 1) : currIndx - (remain - 1);
            setCurrIndx(lmi <= 0 ? 0 : (lmi - numberOfMoviesInView));
        }
    }

    function getMap() {
        if (!itemsRef.current) {
            itemsRef.current = new Map();
        }
        return itemsRef.current;
    }

    useEffect(() => {
        setIsMounted(true);
        if (!movies.length) return;
        const cb = function () {
            setVwIndex(false);
            const [numberOfMoviesInView, node] = moviesInView();
            if (node) {
                const newIndex = (numberOfMoviesInView - 1);
                setCurrIndx(newIndex);
                setVwIndex(true);
            }
        }

        window.addEventListener("resize", cb);
        setTimeout(() => {
            cb()
        }, 500);

        return () => {
            window.removeEventListener("resize", cb);
        }

    }, [movies, moviesInView]);

    useEffect(() => {
        if (vwIndexSet) {
            const refsMap = getMap();
            const node = refsMap.get(`movie-card-[${currIndx}]`);
            if (node) {
                node.scrollIntoView({
                    behavior: "smooth",
                });
            }
        }
    }, [currIndx, vwIndexSet]);

    return isMounted ? (
        <div className="flex relative flex-col px-4 md:px-12 mt-4">
            <p className="text-white text-md md:text-xl lg:text-2xl font-semibold">{category}</p>
            <div className="flex scroll-smooth overflow-x-scroll gap-2 no-scrollbar">
                {currIndx >= moviesInView(true) && <div onClick={() => appropriateSkip()} className="absolute flex z-20 top-[calc(50%-5px)] left-0 h-8 w-8 rounded-full bg-white bg-opacity-70 items-center justify-center cursor-pointer">
                    <FaAngleLeft className="text-white" size={20} />
                </div>}
                {movies.map((movie, i) => (
                    <MovieCard innerRef={(node: Node) => {
                        const refsMap = getMap();
                        if (node) {
                            refsMap.set(`movie-card-[${i}]`, node);
                        } else {
                            refsMap.delete(`movie-card-[${i}]`);
                        }
                    }} indx={i} key={movie.id} movie={movie} />
                ))}
                {movies.length > moviesInView(true) && (currIndx < (movies.length - 1)) && <div onClick={() => appropriateSkip(true)} className="absolute flex z-20 top-[calc(50%-5px)] right-0 h-8 w-8 rounded-full bg-white bg-opacity-70 items-center justify-center cursor-pointer">
                    <FaAngleRight className="text-white" size={20} />
                </div>}
                <a id="scroloLink" />
            </div>
        </div>
    ) : null
}


export default MoviesCategory