"use client"
import { EyeIcon } from '@heroicons/react/24/solid'
import Image from "next/image";
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

export default function BalanceView() {
    const user = useSelector((state: RootState) => state.user);
    const auth = useSelector((state:RootState) => state.auth);

    console.log(user);
    console.log(auth.token);

    return (
        <div className="flex">
            {/* PROFILE PIC AND WELCOME TEXT */}
            <div className="flex flex-col w-2/5">
                <Image src='/Profile Photo.png' width={70} height={70} alt="Foto Profil"/>
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
                <p className="text-3xl py-3">Rp <span className="text-4xl tracking-wider">•••••••</span></p>
                <div className="flex items-center gap-2">
                <p className="text-sm">Lihat Saldo</p>
                <EyeIcon className="size-4"/>
                </div>
            </div>
            </div>
        </div>
    );
}
