'use client'
import { useEffect } from 'react';

const useOutsideClickHandler = (ref, isOpen, onOutsideClick) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && ref.current && !ref.current.contains(event.target)) {
                onOutsideClick();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, isOpen, onOutsideClick]);
}

export default useOutsideClickHandler