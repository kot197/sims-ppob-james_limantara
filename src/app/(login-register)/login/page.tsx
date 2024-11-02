import Image from "next/image";
import { AtSymbolIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import InputField from "@/app/components/input-field";
import Button from "@/app/components/button";

export default function Registration() {
  return (
    <div className="flex">
        <div className="flex-1 justify-items-center content-center">
            <div className="flex flex-col items-center w-3/5">
                <div className="p-7 flex gap-2">
                    <Image src='/logo.png' width={32} height={32} alt="Logo"/>
                    <span className="text-xl font-semibold">SIMS PPOB</span>
                </div>
                <p className="text-xl font-semibold">Masuk atau buat akun untuk memulai</p>
                <form className="flex flex-col w-full gap-8 mt-12">
                    <InputField
                        icon={<AtSymbolIcon className="size-5"/>}
                        placeholder="masukan email anda"
                        name="email"
                        id="email"
                        type="text"/>
                    <InputField
                        icon={<LockClosedIcon className="size-5"/>}
                        placeholder="masukan password anda"
                        name="password"
                        id="password"
                        type="password"/>
                    <Button text="Masuk"/>
                    <p className="w-full text-center">belum punya akun? registrasi <span className="text-red-600 font-semibold">di sini</span></p>
                </form>
            </div>
        </div>
        <Image className="object-cover w-auto h-screen" src='/Illustrasi Login.png' width={752} height={1024} alt='Illustrasi Login'/>
    </div>
  );
}
