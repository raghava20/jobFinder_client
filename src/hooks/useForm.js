import { useState } from 'react'

const useForm = (initialState, callback) => {
    const [inputs, setInputs] = useState(initialState)
    const handleSubmit = (event) => {
        if (event) event.preventDefault()
        callback()
    }

    const handleInputChange = (event) => {
        event.persist()
        setInputs(input => ({
            ...input,
            [event.target.name]: event.target.value
        }))
    }
    return {
        handleSubmit, handleInputChange, inputs
    }
}

export default useForm;