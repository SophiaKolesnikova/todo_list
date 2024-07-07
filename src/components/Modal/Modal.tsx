import React from "react";
import styles from './styles.module.scss';

interface ModalProps {
    children: React.ReactNode;
    title: string;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, title, onClose } ) => {
    return (
        <>
            <div
                className={styles.modal}
                onClick={onClose}
            > </div>
                <div className={styles.modalContent}>
                    <h1>{title}</h1>
                    {children}
                </div>
        </>
    );
};

export default Modal;
