import { UserState } from "@/app/state/user/userSlice";
import Image from "next/image";

export default function ImageCircle({ defaultImageSrc, user, width, height, className = "w-32 h-32" }: { defaultImageSrc: string, user: UserState, width: number, height: number, className?: string }) {
    return (
        <div className={`relative rounded-full overflow-hidden ${className}`}>
            <Image src={ user.profile_image.endsWith('null') ? defaultImageSrc : user.profile_image }
                width={width}
                height={height}
                alt="Foto Profil"
                className='object-cover'/>
        </div>
    );
}