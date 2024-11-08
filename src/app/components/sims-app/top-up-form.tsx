"use client"
import InputField from '../input-field';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import Button from '../button';
import { useDispatch, useSelector } from 'react-redux';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { topUpSchema } from '@/app/lib/validationSchema';
import TopUpBalanceButton from './top-up-balance-button';
import { RootState } from '@/app/state/store';
import { setBalance } from '@/app/state/balance/balanceSlice';
import Modal from '../modal';

export default function TopUpForm() {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [topUpAmount, setTopUpAmount] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [successStatus, setSuccessStatus] = useState<boolean>(false);
    const [isConfirming, setIsConfirming] = useState<boolean>(true);
    const auth = useSelector((state:RootState) => state.reducer.auth);
    const dispatch = useDispatch();

    function validateForm(formObject: Record<string, FormDataEntryValue>) {
        const validation = topUpSchema.safeParse(formObject);

        console.log(validation.error?.errors);
        console.log("test")

        if(!validation.success) {
            const errorMessages = validation.error.errors.reduce((accumulator, error) => {
                const field = error.path[0]; // 'email' or 'password'

                // Only set the error if it doesn't already exist in the accumulator (i.e., surface error)
                if (!accumulator[field]) {
                    accumulator[field] = error.message;
                }

                return accumulator;
            }, {} as {[key: string]: string});

            console.log("Validation Errors:", errorMessages);
            setErrors(errorMessages);
            return false;
        }

        console.log("No validation error: ", formObject);
        setErrors({});
        return true;
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        // Convert FormData to a plain object for easier inspection
        const formObject = Object.fromEntries(formData.entries());
        const isValid = validateForm(formObject);
        console.log(isValid)
        
        // Log the form data right from the start
        console.log("Form Data at Start:", formObject);
        console.log(JSON.stringify(formObject));
        console.log(formData.get("top_up_amount") as string);

        if(!isValid) return;

        const response = await fetch('https://take-home-test-api.nutech-integrasi.com/topup', {
            method: 'POST',
            body: `{ "top_up_amount": ${Number(formData.get("top_up_amount") as string)} }`,
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
            console.log(responseBody.data.balance);
            dispatch(setBalance(responseBody.data.balance));
            setIsConfirming(false);
            setSuccessStatus(true);
            toast.success(responseBody.message);
        }
    }

    return (
        <form className="flex mt-14" onSubmit={handleSubmit}>
            <div className="flex flex-col w-3/5 pr-6">
                {errors.top_up_amount && <p className='text-red-400 mx-1 -mt-6'>{errors.top_up_amount}</p>}
                <InputField
                    icon={<BanknotesIcon className="size-5"/>}
                    placeholder="masukan nominal Top Up"
                    name="top_up_amount"
                    id="top_up_amount"
                    type="number"
                    value={topUpAmount}
                    setValue={(value: string) => setTopUpAmount(value)}
                    />
                <Button onClick={() => {
                    setIsConfirming(true);
                    
                    const object = {
                        top_up_amount: topUpAmount
                    }

                    const valid = validateForm(object);

                    if(!valid) {
                        return;
                    }

                    setIsModalOpen(true)
                }} text="TopUp" isActive={true} optionalClass="mt-8 w-full"/>
            </div>
            <div className="grid grid-cols-3 gap-y-6 gap-x-2 flex-1">
                <TopUpBalanceButton onClick={() => setTopUpAmount("10000")} amount="10.000"/>
                <TopUpBalanceButton onClick={() => setTopUpAmount("20000")} amount="20.000"/>
                <TopUpBalanceButton onClick={() => setTopUpAmount("50000")} amount="50.000"/>
                <TopUpBalanceButton onClick={() => setTopUpAmount("100000")} amount="100.000"/>
                <TopUpBalanceButton onClick={() => setTopUpAmount("250000")} amount="250.000"/>
                <TopUpBalanceButton onClick={() => setTopUpAmount("500000")} amount="500.000"/>
            </div>
            <Modal
                isOpen={isModalOpen}
                isConfirming={isConfirming}
                onClose={() => setIsModalOpen(false)}
                transactionConfirmText={'Anda yakin untuk Top Up sebesar'}
                transactionResultText={'Top Up sebesar'}
                confirmButtonText={'Ya, lanjutkan Top Up'}
                amount={parseInt(topUpAmount, 10)}
                successStatus={successStatus}/>
        </form>
    );
}
