import Image from "next/image";

export default function IconMenuPembelian({ srcPath, altName, name }: { srcPath: string, altName:string, name:string }) {
    return (
        <div className="flex flex-col justify-items-center">
          <Image src={srcPath} width={70} height={70} alt={altName}/>
          <p className="text-center text-sm mt-2 w-18 break-words whitespace-normal">{name}</p>
        </div>
    );
}