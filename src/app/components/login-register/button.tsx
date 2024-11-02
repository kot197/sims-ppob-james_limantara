
export default function Button({text} : {text:string}) {
    return (
        <button className="rounded-lg bg-red-500 text-white mx-8 py-4">
            {text}
        </button>
    );
}