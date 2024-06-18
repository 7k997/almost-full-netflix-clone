import { createStore } from "swr-global-state";

interface Initial {
    isOpen: boolean;
    id: string | null;
}

const useInfoModal = createStore({
    key: "gl-store",
    initial: {
        isOpen: false,
        id: null,
    } as Initial
});
export default useInfoModal;