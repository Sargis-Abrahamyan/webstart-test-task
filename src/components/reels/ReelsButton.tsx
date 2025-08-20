import React from "react";

interface ReelsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const ReelsButton: React.FC<ReelsButtonProps> = ({ children, ...rest }) => (
    <button
        className='size-[40.7px] text-white bg-[#00000040] border-none rounded-[11px] cursor-pointer 
                   backdrop-blur-[10px]'
        type='button'
        {...rest}
    >
        {children}
    </button>
);

export default ReelsButton;
