import { useEffect } from "react";
export function SetTitle({title}) {
    useEffect(() => {
        document.title = `${title} | ServiceHub`;
    }, [title]);

    return null
}