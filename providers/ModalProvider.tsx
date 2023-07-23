"use client";

import AuthModal from "@/components/AuthModal";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
    const [isMouted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMouted) {
        return null;
    }

    return (
        <>
            <AuthModal />
        </>
    );
}

export default ModalProvider;