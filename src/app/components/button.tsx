
export default function Button({text, isActive, optionalClass} : {text:string, isActive?:boolean, optionalClass?:string}) {
    return (
        <button className={`rounded-lg text-white py-4 ${optionalClass}
            ${
                isActive ? 'bg-red-500 cursor-pointer' : 'bg-zinc-400 cursor-not-allowed'
            }`}>
            {text}
        </button>
    );
}