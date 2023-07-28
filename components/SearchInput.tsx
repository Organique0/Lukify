"use client";

import useDebounce from "@/hooks/useDebounced";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";
import Input from "./Input";

const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>("");
    const debauncedValue = useDebounce<string>(value, 500);

    useEffect(() => {
        const query = {
            title: debauncedValue
        }

        const url = qs.stringifyUrl({
            url: '/search',
            query: query
        })

        router.push(url);

    }, [debauncedValue, router])

    return (
        <Input placeholder="" value={value} onChange={e => setValue(e.target.value)} />
    );
}

export default SearchInput;