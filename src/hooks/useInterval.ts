import { useEffect, useRef } from "react"

function useInterval(callback: VoidFunction, delay: number) {
    const cachedCallback = useRef<VoidFunction | null | undefined>(null);

    useEffect(() => {
        cachedCallback.current = callback;
    }, [callback])

    useEffect(() => {
        const tick = () => {
            cachedCallback.current?.();
        }
        if (delay) {
            const id = setInterval(() => tick, delay)
            return () => {
                clearInterval(id);
            }
        }
    }, [delay])
}

export default useInterval