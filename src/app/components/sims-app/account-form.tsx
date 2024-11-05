"use client"
import InputField from '../input-field';
import { AtSymbolIcon, UserIcon } from '@heroicons/react/24/outline';
import { PencilIcon } from '@heroicons/react/24/solid';
import Button from '../button';
import { logout } from '@/app/state/auth/authSlice';
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';
import Image from 'next/image'
import { setUser } from '@/app/state/user/userSlice';
import { accountEditSchema } from '@/app/lib/validationSchema';

export default function AccountForm() {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state:RootState) => state.reducer.user);
    const token = useSelector((state:RootState) => state.reducer.auth.token);
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

    function handleProfilePictureChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                uploadProfilePicture(file);
            };
            reader.readAsDataURL(file);
        }
    }

    const triggerFileInput = () => {
        document.getElementById('file')?.click();
    };

    // Function to send the profile picture as a base64 string to an API
    async function uploadProfilePicture(file: File) {
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch("https://take-home-test-api.nutech-integrasi.com/profile/image", {
                    method: "PUT",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData,
                });

                const responseBody = await response.json();

                if (response.ok) {
                    dispatch(setUser(responseBody.data));
                    toast.success(responseBody.message);
                } else {
                    toast.error(responseBody.message);
                }
            } catch (error) {
                console.error("Error uploading profile picture:", error);
                toast.error("An error occurred while uploading the profile picture.");
            }
        } else {
            toast.error("No profile picture to upload.");
        }
    }

    function validateForm(formObject: Record<string, FormDataEntryValue>) {
        const validation = accountEditSchema.safeParse(formObject);

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
        const isValid = validateForm(formObject);
        delete formObject.email; 
        console.log(isValid)
        
        // Log the form data right from the start
        console.log("Form Data at Start:", formObject);
        console.log(JSON.stringify(formObject));

        if(!isValid) return;

        const response = await fetch('https://take-home-test-api.nutech-integrasi.com/profile/update', {
            method: 'PUT',
            body: JSON.stringify(formObject),
            headers: {
                'Authorization': `Bearer ${token}`,
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
            dispatch(setUser(responseBody.data));
            console.log(responseBody.message);
            toast.success(responseBody.message);
        }
    }

    useEffect(() => {
        setEmail(user.email);
        setFirstName(user.first_name);
        setLastName(user.last_name);
    }, [])

    return (
        <div className="flex flex-col px-60 py-10 items-center">
            <div className='relative flex'>
                <div className='relative w-32 h-32 rounded-full overflow-hidden'>
                    <Image src={ user.profile_image.endsWith('null') ? "/Profile Photo.png" : user.profile_image }
                        width={130}
                        height={130}
                        alt="Foto Profil"
                        className='object-cover'/>
                </div>
                <input
                    id="file"
                    type='file'
                    accept='image/jpeg, image/png'
                    onChange={handleProfilePictureChange}
                    className='hidden'/>
                <button
                    onClick={triggerFileInput}
                    className='rounded-full border absolute p-2 bg-white bottom-0 right-0'>
                    <PencilIcon className='size-5'/>
                </button>
            </div>
            <span className="font-bold text-3xl my-8">{user.first_name} {user.last_name}</span>
            <form onSubmit={handleSubmit} className="flex flex-col w-full">
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
                {errors.email && <p className='text-red-400 mx-1'>{errors.email}</p>}
                <p className="mb-3 mt-6">Nama Depan</p>
                <InputField
                    icon={<UserIcon className="size-5"/>}
                    placeholder="nama depan"
                    name="first_name"
                    id="first_name"
                    type="text"
                    value={firstName}
                    setValue={(value: string) => setFirstName(value)}/>
                {errors.first_name && <p className='text-red-400 mx-1'>{errors.first_name}</p>}
                <p className="mb-3 mt-6">Nama Belakang</p>
                <InputField
                    icon={<UserIcon className="size-5"/>}
                    placeholder="nama belakang"
                    name="last_name"
                    id="last_name"
                    type="text"
                    value={lastName}
                    setValue={(value: string) => setLastName(value)}/>
                {errors.last_name && <p className='text-red-400 mx-1'>{errors.last_name}</p>}
                {!isEditing ? (
                    <>
                        <Button altTheme={true} type='button' onClick={() => setIsEditing(true)} text='Edit Profile' isActive={true}
                        optionalClass='mt-8 bg-white border border-red-500'/>
                        <Button type='button' onClick={handleLogout} text='Logout' isActive={true} optionalClass='mt-8'/>
                    </>
                ) : (
                    <>
                        <Button altTheme={true} type='button' onClick={() => setIsEditing(false)} text='Cancel Editing' isActive={true}
                        optionalClass='mt-8 bg-white border border-red-500'/>
                        <Button type='submit' text='Simpan' isActive={true} optionalClass='mt-8'/>
                    </>
                )}
            </form>
        </div>
    );
}
