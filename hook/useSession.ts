"use client";

import { useEffect, useState } from "react";

export const useSession = () => {
    const [session, setSession] = useState<{ token: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/session")
        .then((res) => res.json())
        .then((data) => setSession(data))
        .catch(() => setSession(null))
        .finally(() => setLoading(false));
    }, []);

    return { session, loading };
};
