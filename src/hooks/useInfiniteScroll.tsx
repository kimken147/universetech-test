import { useEffect, useRef, useState } from "react";
import useInterval from "./useInterval";
import useWindowSize from "./useWindowSize";

export interface UseInfiniteScrollArgs {
    hasMore: boolean;
    loadMore: Function;
    threshold?: number;
    loading: boolean;
    checkInterval?: number;
}

function useInifiniteScroll<T extends HTMLElement>({
    hasMore,
    threshold = 150,
    loading = false,
    loadMore = Function,
    checkInterval = 200
}: UseInfiniteScrollArgs) {
    const ref = useRef<T>(null);
    const windowSize = useWindowSize();
    const [listen, setListen] = useState(true);

    useEffect(() => {
        if (!loading) setListen(true);
    }, [loading])

    function getOffset() {
        const element = ref.current;
        if (element && !loading && windowSize.height !== undefined) {
            const { bottom } = element.getBoundingClientRect();
            let offset = bottom - windowSize.height;
            return offset;
        }
        else return null;
    }

    const listenBottom = () => {
        if (listen && hasMore && !loading) {
            if (ref.current) {
                const offset = getOffset();
                if (offset !== null) {
                    const valid = offset < threshold;
                    if (valid) {
                        setListen(false);
                        loadMore?.();
                    }
                }
            }
        }
    }

    useInterval(() => listenBottom(), hasMore ? checkInterval : 0);

    return ref;
}

export default useInifiniteScroll