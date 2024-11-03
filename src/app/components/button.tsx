
export default function Button({text, isActive, optionalClass, type = "button"} : {text:string, isActive?:boolean, optionalClass?:string, type?: 'button' | 'submit' | 'reset'}) {
    return (
        <button type={type} className={`rounded-lg text-white py-4 ${optionalClass}
            ${
                isActive ? 'bg-red-500 cursor-pointer' : 'bg-zinc-400 cursor-not-allowed'
            }`}>
            {text}
        </button>
    );
}