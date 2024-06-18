import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useProfiles = (type: string) => {
    const { data, error, isLoading, mutate } = useSWR("/api/profiles", fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return { data, error, isLoading, mutate };
}

export default useProfiles;