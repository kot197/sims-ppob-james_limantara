"use client"
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Modal({ isOpen, onClose, transactionConfirmText, transactionResultText, confirmButtonText, amount, successStatus, isConfirming}:
    { isOpen: boolean, onClose: () => void, transactionConfirmText: string, transactionResultText: string, confirmButtonText: string, amount:number, successStatus: boolean, isConfirming:boolean }) {

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return (): void => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const formattedCurrency = new Intl.NumberFormat('id-ID').format(amount);

    return (
        // Modal Container
        <div className="fixed inset-0 flex items-center justify-center">
            {/* Dark Overlay */}
            <div className="fixed inset-0 bg-black opacity-50"></div>

            {/* Modal */}
            <div className="relative bg-white rounded-lg border-2 border-white backdrop-blur-sm w-1/5 shadow-md flex justify-center items-center p-10 overflow-hidden transition-[height] duration-500 ease-in-out">
                {isConfirming ? (
                    <div className="flex flex-col items-center">
                        <Image src="/Logo.png" alt="Logo" width={64} height={64}></Image>
                        <p className="mt-6">{transactionConfirmText}</p>
                        <p className="mt-1 -ml-4 text-2xl font-semibold">Rp{formattedCurrency} ?</p>
                        <button type="submit" className="mt-6 font-semibold text-red-500">{confirmButtonText}</button>
                        <button type="button" onClick={onClose} className="mt-6 font-semibold text-gray-300">Batalkan</button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <Image src={successStatus? "/confirm-icon.png" : "/close-red-icon.png"} alt="Logo" width={64} height={64}></Image>
                        <p className="mt-6">{transactionResultText}</p>
                        <p className="mt-1 -ml-1 text-2xl font-semibold">Rp{formattedCurrency}</p>
                        <p className="mt-1">{successStatus ? "berhasil!" : "gagal"}</p>
                        <Link href="/" className="mt-6 font-semibold text-red-500">Kembali ke beranda</Link>
                    </div>
                )}
            </div>
        </div>
    );
}