
export default function Button({text, isActive, optionalClass, type = "button", onClick, altTheme = false} :
    {text:string, isActive?:boolean, optionalClass?:string, type?: 'button' | 'submit' | 'reset', onClick?: () => void, altTheme?: boolean}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`rounded-lg py-4 ${optionalClass}
            ${isActive ? 'cursor-pointer' : 'cursor-not-allowed'}
                ${altTheme
                    ? isActive 
                        ? 'text-red-500 bg-white border border-red-500' 
                        : 'text-zinc-400 bg-white border border-zinc-400'
                    : isActive 
                        ? 'text-white bg-red-500'
                        : 'text-white bg-zinc-400'
                }`}>
            {text}
        </button>
    );
}