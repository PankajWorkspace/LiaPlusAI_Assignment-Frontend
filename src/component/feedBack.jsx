import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Feedback() {
    const [info, setInfo] = useState({
        name: '',
        email: '',
        message: '',
        category: '',   // 🔥 Added category
        buttonText: 'Submit',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        setInfo({ ...info, buttonText: '...sending' });

        try {
            const response = await axios.post('http://localhost:5000/feedback/save', info);  // no need for { payload }, send info directly
            console.log(response)
            if (response.data.message) {
                toast('🦄 Thanks for your feedback!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                setInfo({
                    name: '',
                    email: '',
                    message: '',
                    category: '',
                    buttonText: 'Submit',
                });
            } else {
                console.log(response.data.error);
                toast.error('Failed, try again!');
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed, try again!');
        }
    };

    const handleChange = name => e => {
        setInfo({ ...info, [name]: e.target.value });
    };

    return (
        <div className='form'>
            <ToastContainer />
            <Form onSubmit={handleSubmit}>
                {/* Name */}
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={info.name}
                        onChange={handleChange('name')}
                        type='text'
                        placeholder='Enter your name'
                        required
                    />
                </Form.Group>

                {/* Email */}
                <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        value={info.email}
                        onChange={handleChange('email')}
                        type='email'
                        placeholder='Enter email'
                        required
                    />
                </Form.Group>

                {/* Category Dropdown */}
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        as="select"
                        value={info.category}
                        onChange={handleChange('category')}
                        required
                    >
                        <option value="">-- Select Category --</option>
                        <option value="suggestion">Suggestion</option>
                        <option value="bug">Bug</option>
                        <option value="feature">Feature</option>
                    </Form.Control>
                </Form.Group>

                {/* Message */}
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        onChange={handleChange('message')}
                        as='textarea'
                        value={info.message}
                        rows={3}
                        required
                    />
                </Form.Group>

                <Button type='submit'>{info.buttonText}</Button>
            </Form>
        </div>
    );
}

export default Feedback;
