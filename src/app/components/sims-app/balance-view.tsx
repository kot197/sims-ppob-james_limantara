"use client"
import { EyeIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { setBalance } from '@/app/state/balance/balanceSlice';
import { useAppDispatch } from '@/app/state/hooks';
import ImageCircle from './image-circle';

export default function BalanceView() {
    const [isVisible, setIsVisible] = useState(false);
    const user = useSelector((state: RootState) => state.reducer.user);
    const auth = useSelector((state:RootState) => state.reducer.auth);
    const dispatch = useAppDispatch();
    const amount = useSelector((state:RootState) => state.reducer.balance.amount);

    console.log(user);
    console.log(auth.token);

    useEffect(() => {
        (async () => {
            // Function to fetch balance
            const fetchBalance = async () => {
                try {
                    const response = await fetch('https://take-home-test-api.nutech-integrasi.com/balance', {
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
                        dispatch(setBalance(responseBody.data.balance));

                        toast.success(responseBody.message);
                        console.log(responseBody.data.balance); // Handle balance data here
                    }
                } catch (error) {
                    console.error('Error fetching balance:', error);
                }
            };

            await fetchBalance(); // Call the function to fetch balance
        })();
    }, []);

    return (
        <div className="flex">
            {/* PROFILE PIC AND WELCOME TEXT */}
            <div className="flex flex-col w-2/5">
            <ImageCircle defaultImageSrc="/Profile Photo.png" user={user} width={70} height={70} className='w-16 h-16'/>
                <p className="font-normal leading-7 mt-4 text-xl">
                    Selamat datang,
                    <br/>
                    <span className="font-bold text-3xl">{user.first_name} {user.last_name}</span>
                </p>
            </div>
            {/* SALDO */}
            <div className="bg-red-500 rounded-2xl flex-1">
            <div className="flex flex-col text-white p-6">
                <p className="text-md">Saldo anda</p>
                <p className="text-3xl py-3">Rp <span className="text-4xl tracking-wider">{isVisible? amount : '•••••••' }</span></p>
                <div className="flex items-center gap-2">
                <p className="text-sm">Lihat Saldo</p>
                <button onClick={() => setIsVisible(!isVisible)}>
                    <EyeIcon className="size-4"/>
                </button>
                </div>
            </div>
            </div>
        </div>
    );
}

