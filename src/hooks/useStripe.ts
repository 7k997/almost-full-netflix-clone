import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useStripe = (type: string) => {
    const { data, error, isLoading, mutate } = useSWR(`/api/payment/create?type=${type}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        // revalidateOnMount: false,
    });

    return { data, error, isLoading, mutate };
}

export default useStripe;