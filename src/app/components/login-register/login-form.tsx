"use client"
import InputField from '../input-field';
import { AtSymbolIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Button from '../button';
import { useDispatch } from 'react-redux';
import { setToken } from '@/app/state/auth/authSlice';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { loginSchema } from '@/app/lib/validationSchema';

export default function LoginForm() {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const isFormValid = Boolean(email && password);
    const dispatch = useDispatch();

    function validateForm(formObject: Record<string, any>) {
        const validation = loginSchema.safeParse(formObject);

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

    function handleLogin(token: string) {
        console.log(token);
        dispatch(setToken(token));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        // Convert FormData to a plain object for easier inspection
        const formObject = Object.fromEntries(formData.entries());
        console.log("test1")
        const isValid = validateForm(formObject);
        console.log(isValid)
        // Log the form data right from the start
        console.log("Form Data at Start:", formObject);
        console.log(JSON.stringify(formObject));

        const response = await fetch('https://take-home-test-api.nutech-integrasi.com/login', {
            method: 'POST',
            body: JSON.stringify(formObject),
            headers: {
                'Content-Type': 'application/json',
            },    
        });

        const responseBody = await response.json();

        if(!response.ok) {
            console.log(response.status);
            console.log(responseBody.message);
        } else {
            console.log(response.status);
            console.log(responseBody.message);
        }

        handleLogin(responseBody.data.token)
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
                icon={<LockClosedIcon className="size-5"/>}
                placeholder="masukan password anda"
                name="password"
                id="password"
                value={password}
                setValue={(value: string) => setPassword(value)}
                type="password"/>
            {errors.password && <p className='text-red-400 mx-1 -mt-6'>{errors.password}</p>}
            <Button type='submit' text="Masuk" isActive={isFormValid}/>
            <p className="w-full text-center">belum punya akun? registrasi <Link href="/registration" className="text-red-600 font-semibold">di sini</Link></p>
        </form>
    );
}
