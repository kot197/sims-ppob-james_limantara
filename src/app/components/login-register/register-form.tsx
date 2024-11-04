"use client"
import InputField from '../input-field';
import { AtSymbolIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import Button from '../button';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { registerSchema } from '@/app/lib/validationSchema';
import toast from 'react-hot-toast';

export default function RegisterForm() {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // Check if all fields are filled
    const isFormValid = Boolean(email && firstName && lastName && password && confirmPassword);

    function validateForm(formObject: Record<string, FormDataEntryValue>) {
        const validation = registerSchema.safeParse(formObject);

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

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        // Convert FormData to a plain object for easier inspection
        const formObject = Object.fromEntries(formData.entries());
        console.log("test1")
        const isValid = validateForm(formObject);
        console.log(isValid)
        delete formObject.confirmPassword;
        // Log the form data right from the start
        console.log("Form Data at Start:", formObject);
        console.log(JSON.stringify(formObject));

        if(!isValid) return;

        const response = await fetch('https://take-home-test-api.nutech-integrasi.com/registration', {
            method: 'POST',
            body: JSON.stringify(formObject),
            headers: {
                'Content-Type': 'application/json',
            },    
        });

        if(!response.ok) {
            console.log(response.status);
            const responseBody = await response.json();
            console.log(responseBody.message);
            toast.error(responseBody.message);
        } else {
            console.log(response.status);
            const responseBody = await response.json();
            console.log(responseBody.message);
            toast.success(responseBody.message);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-8 mt-12">
            <InputField
                icon={<AtSymbolIcon className="size-5"/>}
                placeholder="masukan email anda"
                name="email"
                id="email"
                value={email}
                setValue={(value: string) => setEmail(value)}
                type="text"/>
            {errors.email && <p className='text-red-400 mx-1 -mt-6'>{errors.email}</p>}
            <InputField
                icon={<UserIcon className="size-5"/>}
                placeholder="nama depan"
                name="first_name"
                id="first_name"
                value={firstName}
                setValue={(value: string) => setFirstName(value)}
                type="text"/>
            {errors.first_name && <p className='text-red-400 mx-1 -mt-6'>{errors.first_name}</p>}
            <InputField
                icon={<UserIcon className="size-5"/>}
                placeholder="nama belakang"
                name="last_name"
                id="last_name"
                value={lastName}
                setValue={(value: string) => setLastName(value)}
                type="text"/>
            {errors.last_name && <p className='text-red-400 mx-1 -mt-6'>{errors.last_name}</p>}
            <InputField
                icon={<LockClosedIcon className="size-5"/>}
                placeholder="buat password"
                name="password"
                id="password"
                value={password}
                setValue={(value: string) => setPassword(value)}
                type="password"/>
            {errors.password && <p className='text-red-400 mx-1 -mt-6'>{errors.password}</p>}
            <InputField
                icon={<LockClosedIcon className="size-5"/>}
                placeholder="konfirmasi password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                setValue={(value: string) => setConfirmPassword(value)}
                type="password"/>
            {errors.confirmPassword && <p className='text-red-400 mx-1 -mt-6'>{errors.confirmPassword}</p>}
            <Button type="submit" text="Registrasi" isActive={isFormValid}/>
            <p className="w-full text-center">sudah punya akun? login <Link href="/login" className="text-red-600 font-semibold">di sini</Link></p>
        </form>
    );
}
