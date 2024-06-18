import { createStore } from "swr-global-state";

interface Initial {
    profile: null | any;
}

const useCurrentProfile = createStore({
    key: "gl-profile",
    initial: {
        profile: null,
    } as Initial
});
export default useCurrentProfile;