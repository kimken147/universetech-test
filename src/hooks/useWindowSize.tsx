import { useCallback, useEffect, useState } from "react"

export type Size = {
    height: number | undefined;
    width: number | undefined;
}

function useWindowSize() {
    const [size, setSize] = useState<Size>({
        width: window?.innerWidth,
        height: window?.innerHeight
    });

    const getSize = useCallback((): Size => {
        return {
            width: window.innerWidth,
            height: window.innerWidth
        }
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setSize(getSize())
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [getSize])

    return size;
}

export default useWindowSize