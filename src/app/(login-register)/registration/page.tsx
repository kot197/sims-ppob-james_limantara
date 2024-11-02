import Image from "next/image";
import { AtSymbolIcon, UserIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import InputField from "@/app/components/login-register/input-field";
import Button from "@/app/components/login-register/button";

export default function Registration() {
  return (
    <div className="flex">
        <div className="flex-1 justify-items-center content-center">
            <div className="flex flex-col items-center w-3/5">
                <div className="p-7 flex gap-2">
                    <Image src='/logo.png' width={32} height={32} alt="Logo"/>
                    <span className="text-xl font-semibold">SIMS PPOB</span>
                </div>
                <p className="text-xl font-semibold">Lengkapi data untuk membuat akun</p>
                <form className="flex flex-col w-full gap-8 mt-12">
                    <InputField
                        icon={<AtSymbolIcon className="size-5"/>}
                        placeholder="masukan email anda"
                        name="email"
                        id="email"
                        type="text"/>
                    <InputField
                        icon={<UserIcon className="size-5"/>}
                        placeholder="nama depan"
                        name="firstname"
                        id="firstname"
                        type="text"/>
                    <InputField
                        icon={<UserIcon className="size-5"/>}
                        placeholder="nama belakang"
                        name="lastname"
                        id="lastname"
                        type="text"/>
                    <InputField
                        icon={<LockClosedIcon className="size-5"/>}
                        placeholder="buat password"
                        name="password"
                        id="password"
                        type="password"/>
                    <InputField
                        icon={<LockClosedIcon className="size-5"/>}
                        placeholder="konfirmasi password"
                        name="confirmPassword"
                        id="confirmPassword"
                        type="password"/>
                    <Button text="Registrasi"/>
                    <p className="w-full text-center">sudah punya akun? login <span className="text-red-600 font-semibold">di sini</span></p>
                </form>
            </div>
        </div>
        <Image className="object-cover w-auto h-screen" src='/Illustrasi Login.png' width={752} height={1024} alt='Illustrasi Login'/>
    </div>
  );
}
