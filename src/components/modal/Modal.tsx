interface ModalProps {
    children?: React.ReactNode;
    isOpen: boolean;
}

const Modal = ({ children, isOpen }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-[999999999999999] sm:px-10  flex items-center justify-center bg-[#1d1d1dee] backdrop-blur-[25px] '>
            <div className='relative w-full max-w-[485px] h-dvh sm:h-[95dvh] bg-white sm:rounded-[30px] shadow-xl overflow-hidden'>
                {children}
            </div>
        </div>
    );
};

export default Modal;
