import { EyeIcon } from '@heroicons/react/24/solid'
import Image from "next/image";

export default function BalanceView() {
    return (
        <div className="flex">
            {/* PROFILE PIC AND WELCOME TEXT */}
            <div className="flex flex-col w-2/5">
                <Image src='/Profile Photo.png' width={70} height={70} alt="Foto Profil"/>
                <p className="font-normal leading-7 mt-4 text-xl">
                    Selamat datang,
                    <br/>
                    <span className="font-bold text-3xl">Kristanto Wibowo</span>
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
