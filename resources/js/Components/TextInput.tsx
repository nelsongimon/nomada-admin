import { forwardRef, useEffect, useImperativeHandle, useRef, InputHTMLAttributes } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
    ref
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            // className={
            //     'border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-gray-500 rounded-md shadow-sm px-3 py-2' +
            //     className
            // }
            className="
                w-full
                border-gray-200
                focus:border-gray-400
                border
                rounded-md
                outline-none
                px-3
                py-2
                duration-300
                mt-2 
                block
            "

            ref={localRef}
        />
    );
});
