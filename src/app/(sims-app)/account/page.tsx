import Image from "next/image";
import AccountForm from "@/app/components/sims-app/account-form";

export default function Home() {
  return (
    <div className="flex flex-col px-60 py-10 items-center">
        <div>
            <Image src='/Profile Photo.png' width={130} height={130} alt="Foto Profil"/>
        </div>
        <span className="font-bold text-3xl my-8">Kristanto Wibowo</span>
        <AccountForm/>
    </div>
  );
}
