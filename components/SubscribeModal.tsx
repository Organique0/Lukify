"use client";

import { Price, ProductWithPrice } from "@/types";
import Modal from "./Modal";
import Button from "./Button";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";
import useSubscribeModal from "@/hooks/useSubscribeModal";

interface SubscribeModalProps {
    products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: price.currency,
        minimumFractionDigits: 0,

    }).format((price?.unit_amount || 0) / 100);
    return priceString;
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({ products }) => {
    const { user, isLoading, subscription } = useUser();
    const [priceIdLoading, setPriceIdLoading] = useState<string>();
    const subscribeModal = useSubscribeModal();

    const onChange = (open: boolean) => {
        if (!open) {
            subscribeModal.onClose();
        }
    }


    const handleCheckout = async (price: Price) => {
        setPriceIdLoading(price.id);

        if (!user) {
            setPriceIdLoading(undefined);
            return toast.error("must be logged in");
        }

        if (subscription) {
            setPriceIdLoading(undefined);
            return toast("already subbed");
        }

        try {
            const { sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: { price }
            });

            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId })
        } catch (error) {
            toast.error((error as Error)?.message)
        } finally {
            setPriceIdLoading(undefined);
        }
    }

    let content = (
        <div className="text-center">
            nothing here
        </div>
    )

    if (products.length) {
        content = (
            <div>
                {products.map((p) => {
                    if (!p.prices?.length) {
                        return (
                            <div key={p.id}>
                                no prices available for product ${p.name}
                            </div>
                        )
                    }
                    return p.prices.map(price => (
                        <Button key={price.id} onClick={() => handleCheckout(price)} disabled={isLoading || price.id === priceIdLoading} className="mt-5">
                            {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
                        </Button>
                    ))
                })}
            </div>
        )
    }

    if (subscription) {
        content = (
            <div className="text-center">
                already subbed
            </div>
        )
    }

    return (
        <Modal title="wait, you are not subscribed yet" description="listen to free music but still pay for it" isOpen={subscribeModal.isOpen} onChange={onChange}>
            {content}
        </Modal>
    );
}

export default SubscribeModal;