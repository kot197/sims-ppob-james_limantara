"use client"
import InputField from '../input-field';
import { AtSymbolIcon, UserIcon } from '@heroicons/react/24/outline';
import Button from '../button';
import { useDispatch } from 'react-redux';
import { logout } from '@/app/state/auth/authSlice';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { setUser } from '@/app/state/user/userSlice';

export default function AccountForm() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const dispatch = useDispatch();
    const router = useRouter();

    function handleLogout() {
        dispatch(logout());
        Cookies.remove('token');

        const token = Cookies.get('token');

        if(!token) {
            toast.success("Logout succesful");

            const timer = setTimeout(() => {
                router.push('/login'); // Replace with your target route
            }, 1000); // 1000 milliseconds = 1 second
    
            return () => clearTimeout(timer);
        }
    }

    return (
        <form className="flex flex-col w-full">
            <p className="mb-3">Email</p>
            <InputField
                icon={<AtSymbolIcon className="size-5"/>}
                placeholder="masukan email anda"
                name="email"
                id="email"
                type="text"
                value={email}
                setValue={(value: string) => setEmail(value)}
                />
            <p className="mb-3 mt-6">Nama Depan</p>
            <InputField
                icon={<UserIcon className="size-5"/>}
                placeholder="nama depan"
                name="firstname"
                id="firstname"
                type="text"
                value={firstName}
                setValue={(value: string) => setFirstName(value)}/>
            <p className="mb-3 mt-6">Nama Belakang</p>
            <InputField
                icon={<UserIcon className="size-5"/>}
                placeholder="nama belakang"
                name="lastname"
                id="lastname"
                type="text"
                value={lastName}
                setValue={(value: string) => setLastName(value)}/>
            <Button type='button' onClick={handleLogout} text='Logout' isActive={true} optionalClass='mt-8'/>
        </form>
    );
}
