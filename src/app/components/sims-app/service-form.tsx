"use client"
import InputField from '../input-field';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import Button from '../button';
import { useSelector } from 'react-redux';
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { RootState } from '@/app/state/store';
import Image from "next/image";
import { selectServiceByCode } from '@/app/state/selectors/serviceSelector';
import { useRouter } from 'next/navigation';
import Modal from '../modal';

export default function ServiceForm() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [successStatus, setSuccessStatus] = useState<boolean>(false);
    const [isConfirming, setIsConfirming] = useState<boolean>(true);
    const auth = useSelector((state:RootState) => state.reducer.auth);
    const code = useSelector((state:RootState) => state.reducer.serviceList.on_route);
    const service = useSelector((state:RootState) => selectServiceByCode(state, code));
    const router = useRouter();

    console.log("/service " + code);
    console.log(service?.service_code);

    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        if(service) {
            const response = await fetch('https://take-home-test-api.nutech-integrasi.com/transaction', {
                method: 'POST',
                body: JSON.stringify({
                    service_code: service.service_code // Automatically converted to string if it's not
                }),
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json',
                },
            });

            const responseBody = await response.json();
            console.log(response.status);
            console.log(responseBody.message);
    
            if(!response.ok) {
                setSuccessStatus(false);
                setIsConfirming(false);
                toast.error(responseBody.message);
            } else {
                setSuccessStatus(true);
                setIsConfirming(false);
                toast.success(responseBody.message);
            }
        }
    }

    useEffect(() => {
        if(!service) {
            router.push('/');
        }
    }, []);

    return (
        <form className="flex flex-col mt-14" onSubmit={handleSubmit}>
            <p className="font-normal leading-7 mt-8 text-xl">
                Pembayaran
            </p>
            <div className='flex'>
                { !service ? (
                    <div>Loading...</div>
                ) : (
                    <div className='flex items-center mt-2'>
                        <Image src={service.service_icon} width={40} height={40} alt={service.service_name}/>
                        <p className='ml-2 font-semibold text-md'>{service.service_name}</p>
                    </div>
                )}
            </div>
            <div className="flex flex-col w-full pr-6 mt-12">
                <InputField
                    icon={<BanknotesIcon className="size-5"/>}
                    placeholder="masukan nominal pembayaran"
                    name="amount"
                    id="amount"
                    type="number"
                    value={service?.service_tariff.toString() ?? ""}
                    readOnly={true}
                    />
                <Button onClick={() => {
                    setIsConfirming(true);
                    setIsModalOpen(true)
                }} text="Bayar" isActive={true} optionalClass="mt-8 w-full"/>
            </div>
            { service && (
                <Modal
                isOpen={isModalOpen}
                isConfirming={isConfirming}
                onClose={() => setIsModalOpen(false)}
                transactionConfirmText={`Beli ${service.service_name} senilai`}
                transactionResultText={`Pembayaran ${service.service_name} sebesar`}
                confirmButtonText={'Ya, lanjutkan Bayar'}
                amount={service?.service_tariff}
                successStatus={successStatus}/>
            )}
        </form>
    );
}
