
export default function Button({text, isActive, optionalClass, type = "button", onClick} :
    {text:string, isActive?:boolean, optionalClass?:string, type?: 'button' | 'submit' | 'reset', onClick?: () => void}) {
    return (
        <button type={type} onClick={onClick} className={`rounded-lg text-white py-4 ${optionalClass}
            ${
                isActive ? 'bg-red-500 cursor-pointer' : 'bg-zinc-400 cursor-not-allowed'
            }`}>
            {text}
        </button>
    );
}