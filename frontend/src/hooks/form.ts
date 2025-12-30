import { useState, type ChangeEvent } from "react";

export function useForm<V extends object, E>(initialValues: V, initialErrors: E) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(initialErrors);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors(initialErrors)
    };

    const setFrontError = (field: keyof E, message: string) => {
        setErrors(prev => {
            const currentFieldErrors = (prev[field] as unknown as string[]) || []
            if (!currentFieldErrors.includes(message)) {
                return {...prev, [field]: [...currentFieldErrors, message]}
            }
            return prev
        })
    }

    const setServerErrors = (serverData: Partial<E>) => {
        setErrors({...(initialErrors as E), ...serverData})
    }

    const resetForm = () => {
        setValues(initialValues);
        setErrors(initialErrors)
    };

    return {values, errors, handleChange, setFrontError, setServerErrors, resetForm, setErrors, setValues}
}