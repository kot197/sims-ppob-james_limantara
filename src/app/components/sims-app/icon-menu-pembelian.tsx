"use client"
import { setServiceRoute } from "@/app/state/services/serviceListSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';

export default function IconMenuPembelian({ srcPath, altName, name, code }: { srcPath: string, altName:string, name:string, code: string }) {
  const router = useRouter();
  const formattedString = name.toLowerCase().replace(/\s+/g, '-');
  const dispatch = useDispatch();

  function handleNavigate() {
    console.log(code);
    dispatch(setServiceRoute(code));

    router.push(`/services/${formattedString}`);
  }

  return (
      <div className="flex flex-col justify-items-center">
        <button onClick={handleNavigate}>
          <Image src={srcPath} width={70} height={70} alt={altName}/>
        </button>
        <p className="text-center text-sm mt-2 w-18 break-words whitespace-normal">{name}</p>
      </div>
  );
}