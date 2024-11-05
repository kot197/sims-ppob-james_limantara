"use client"
import Image from "next/image";
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/app/state/hooks';
import { setBanners } from '@/app/state/promo/promoSlice';

export default function BannerView() {
    const auth = useSelector((state:RootState) => state.reducer.auth);
    const banners = useSelector((state: RootState) => state.reducer.promo.banners);
    const dispatch = useAppDispatch();

    console.log(auth.token);

    useEffect(() => {
        (async () => {
            if(banners.length > 0) {
                return;
            }

            // Function to fetch balance
            const fetchBanners = async () => {
                try {
                    const response = await fetch('https://take-home-test-api.nutech-integrasi.com/banner', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${auth.token}`, // Use the auth token if needed
                            'Content-Type': 'application/json',
                        },
                    });

                    const responseBody = await response.json();

                    if (!response.ok) {
                        toast.error(responseBody.message);
                    } else {
                        dispatch(setBanners(responseBody.data));

                        toast.success(responseBody.message);
                        console.log(responseBody.data); 
                    }
                } catch (error) {
                    console.error('Error fetching banners:', error);
                }
            };

            await fetchBanners(); // Call the function to fetch banners
        })();
    }, []);

    return (
    <div className="flex flex-col">
        <p className="font-bold text-sm">Temukan promo menarik</p>
        <div className="flex gap-8">
            { banners.map((banner) => (
                <Image key={banner.banner_name} src={banner.banner_image} width={270} height={121} alt={banner.banner_name}/>
            ))}
        </div>
      </div>
    );
}

