import InputField from "@/app/components/input-field";
import BalanceView from "../../components/sims-app/balance-view";
import TransactionItem from "@/app/components/sims-app/transaction-item";
import Image from "next/image";
import { AtSymbolIcon, UserIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="flex flex-col px-60 py-10 items-center">
        <div>
            <Image src='/Profile Photo.png' width={130} height={130} alt="Foto Profil"/>
        </div>
        <span className="font-bold text-3xl my-8">Kristanto Wibowo</span>
        <form className="flex flex-col w-full">
        <p className="mb-3">Email</p>
        <InputField
            icon={<AtSymbolIcon className="size-5"/>}
            placeholder="masukan email anda"
            name="email"
            id="email"
            type="text"/>
        <p className="mb-3 mt-6">Nama Depan</p>
        <InputField
            icon={<UserIcon className="size-5"/>}
            placeholder="nama depan"
            name="firstname"
            id="firstname"
            type="text"/>
        <p className="mb-3 mt-6">Nama Belakang</p>
        <InputField
            icon={<UserIcon className="size-5"/>}
            placeholder="nama belakang"
            name="lastname"
            id="lastname"
            type="text"/>
        </form>
    </div>
  );
}
