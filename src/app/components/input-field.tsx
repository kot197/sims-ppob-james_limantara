"use client"

export default function InputField({icon, placeholder, name, id, type, value, setValue}
    :{icon: React.ReactNode, placeholder: string, name:string, id:string, type:string, value:string, setValue: (value: string) => void}) {

    return (
        <div className="relative flex">
            <div className="absolute left-3 top-1/3 text-gray-500">
                {icon}
            </div>
            <input
                name={name}
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="flex-1 pl-10 border-gray-500 py-3"/>
        </div>
    );
}