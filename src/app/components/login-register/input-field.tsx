
export default function InputField({icon, placeholder, name, id, type}
    :{icon: React.ReactNode, placeholder: string, name:string, id:string, type:string}) {
    return (
        <div className="relative flex mx-8">
            <div className="absolute left-2 top-1/4 text-gray-500">
                {icon}
            </div>
            <input
                name={name}
                id={id}
                type={type}
                placeholder={placeholder}
                className="flex-1 pl-10 border-gray-500"/>
        </div>
    );
}