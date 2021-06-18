import React, { useState } from 'react'
import { Button, DatePicker, Input, message } from 'antd';
import {Form} from 'antd';
import Ripples from 'react-ripples'
import axios from 'axios';

const UserCreateForm = () => {

    const [loading, setLoading] = useState(false);
    const hangleSubmit = data=>{
        //console.log(data);
        setLoading(true);
        axios({
            url: "/api/users",
            method: 'post',
            data
        }).then(r=>{
            message.success("User successfully created!");
            setLoading(false)
            //console.log(r)
        }).catch(e=>{
            console.log(e)
            message.error("Failed to create the user!");
            setLoading(false)
        })
    }

    return (
        <div style={{width: '50%', margin:'30px auto'}}>
            <h3>User create</h3>
            <Form
                onFinish={hangleSubmit}
                name="user-create-form"
            >
                <Form.Item
                name="FullName"
                key="fullname"
                >
                    <Input
                        required 
                        placeholder="Full Name" />
                </Form.Item>

                <Form.Item
                name="DoB"
                key="dob"
                >
                    <DatePicker 
                        style={{width: '100%'}} 
                        placeholder="Date of Birth" />

                </Form.Item>

                <Form.Item>
                    <Ripples>
                        <Button 
                        loading={loading}
                        type="primary" 
                        htmlType="submit" 
                        style={{display: 'block'}}>Submit</Button>
                    </Ripples>
                </Form.Item>

            </Form>
        </div>
    )
}

export default UserCreateForm
