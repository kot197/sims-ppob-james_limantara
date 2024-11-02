import Image from "next/image";
import { EyeIcon } from '@heroicons/react/24/solid'
import IconMenuPembelian from "../components/sims-app/icon-menu-pembelian";

export default function Home() {
  return (
    <div className="flex flex-col px-60 py-10">
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
      {/* PILIHAN PEMBAYARAN */}
      <div className="flex py-12 justify-between">
        <IconMenuPembelian srcPath="/PBB.png" altName="Icon PBB" name="PBB"/>
        <IconMenuPembelian srcPath="/Listrik.png" altName="Icon Listrik" name="Listrik"/>
        <IconMenuPembelian srcPath="/Pulsa.png" altName="Icon Pulsa" name="Pulsa"/>
        <IconMenuPembelian srcPath="/PDAM.png" altName="Icon PDAM" name="PDAM"/>
        <IconMenuPembelian srcPath="/PGN.png" altName="Icon PGN" name="PGN"/>
        <IconMenuPembelian srcPath="/Televisi.png" altName="Icon Televisi" name="TV Langganan"/>
        <IconMenuPembelian srcPath="/Musik.png" altName="Icon Musik" name="Musik"/>
        <IconMenuPembelian srcPath="/Game.png" altName="Icon Game" name="Voucher Game"/>
        <IconMenuPembelian srcPath="/Voucher Makanan.png" altName="Icon Makanan" name="Voucher Makanan"/>
        <IconMenuPembelian srcPath="/Kurban.png" altName="Icon Kurban" name="Kurban"/>
        <IconMenuPembelian srcPath="/Zakat.png" altName="Icon Zakat" name="Zakat"/>
        <IconMenuPembelian srcPath="/Paket Data.png" altName="Icon Paket Data" name="Paket Data"/>
      </div>
      {/* PROMOS */}
      <div className="flex flex-col">
        <p className="font-bold text-sm">Temukan promo menarik</p>
        <div className="flex gap-8">
          <Image src='/Banner 1.png' width={270} height={121} alt="Banner 1"/>
          <Image src='/Banner 2.png' width={270} height={121} alt="Banner 2"/>
          <Image src='/Banner 3.png' width={270} height={121} alt="Banner 3"/>
          <Image src='/Banner 4.png' width={270} height={121} alt="Banner 4"/>
          <Image src='/Banner 5.png' width={270} height={121} alt="Banner 5"/>
        </div>
      </div>
    </div>
  );
}
