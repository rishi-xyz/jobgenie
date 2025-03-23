import { useState } from "react";
import { toast } from "sonner";

const useFetch = <T, A extends unknown[]>(cb: (...args: A) => Promise<T>) => {
    const [data, setData] = useState<T | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fn = async (...args: A) => {
        setLoading(true);
        setError(null);

        try {
            const response = await cb(...args);
            setData(response);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            setError(new Error(errorMessage));
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fn, setData };
};

export default useFetch;
