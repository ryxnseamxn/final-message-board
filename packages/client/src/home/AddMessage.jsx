import React, { useState } from 'react';
import PropTypes from 'prop-types';
import config from '../config';
import '../App.css';

const AddMessage = ({ onMessageAdded }) => {
    const [formData, setFormData] = useState({
        username: '',
        text: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${config.API_URL}/api/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: formData.username,
                    text: formData.text
                })
            });

            if (response.ok) {
                setFormData({ username: '', text: '' });
                onMessageAdded();
            }

        } catch (error) {
            console.error('Error submitting message:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input 
                type="text" 
                name="username" 
                id="username"
                value={formData.username}
                onChange={handleChange}
            />
            
            <label htmlFor="text">Text</label>
            <input 
                type="text" 
                name="text" 
                id="text"
                value={formData.text}
                onChange={handleChange}
            />
            <br />
            <button type="submit">Add Message</button>
        </form>
    );
};

AddMessage.propTypes = {
    onMessageAdded: PropTypes.func
}

export default AddMessage;