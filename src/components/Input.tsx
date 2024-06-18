interface InputProps {
    id: string;
    onChange?: any;
    value: string;
    label: string;
    bg?: string;
    type: string
}

function Input({ id, onChange, value, label, bg, type }: InputProps) {
    return (
        <div className="relative">
            <input
                id={id}
                className={`block rounded-md min-w-[280px] px-4 pt-5 pb-1 w-full border-[rgba(128,128,128,0.7)] border-[1px] text-md text-white ${!bg ? 'bg-[rgba(22,22,22,0.7)]' : bg} appearance-none focus:outline-0 focus:ring-1 focus:ring-white autofill:!bg-red-400 peer`}
                placeholder=" "
                value={value}
                type={type}
                onChange={onChange}
            />
            <label htmlFor={id} className="absolute text-md text-white duration-150 transform -translate-y-3 scale-75 top-3 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                {label}
            </label>
        </div>
    )
}
export default Input