import Image from "next/image";
import RegisterForm from "@/app/components/login-register/register-form";

export default function Registration() {
  return (
    <div className="flex">
        <div className="flex-1 justify-items-center content-center">
            <div className="flex flex-col items-center w-3/5">
                <div className="p-7 flex gap-2">
                    <Image src='/Logo.png' width={32} height={32} alt="Logo"/>
                    <span className="text-xl font-semibold">SIMS PPOB</span>
                </div>
                <p className="text-xl font-semibold">Lengkapi data untuk membuat akun</p>
                <RegisterForm/>
            </div>
        </div>
        <Image className="object-cover w-auto h-screen" src='/Illustrasi Login.png' width={752} height={1024} alt='Illustrasi Login'/>
    </div>
  );
}
