import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalState {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode;
}


function Modal({ isOpen, onClose, children }: ModalState) {
    useEffect(() => {
        const handleEscModal = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }
        if (isOpen) {
            document.body.style.overflow = 'hidden'
            document.addEventListener("keydown", handleEscModal)
        } else {
            document.body.style.overflow = 'unset'
            document.removeEventListener("keydown", handleEscModal)
        }

        return () => {
            document.body.style.overflow = 'unset'
            document.removeEventListener("keydown", handleEscModal)
        }
    }, [onClose, isOpen])

    if (!isOpen) return null

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"/>
            
            <div className="relative z-10 w-full max-w-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-300">
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')!
    )
}
export default Modal