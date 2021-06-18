import { Form, Select, Input, Button, message } from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Ripples from 'react-ripples'

const { Option } = Select;

const BlogCreateForm = ({ match }) => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [f] = Form.useForm();
    const { blogId } = match.params;
    useEffect(()=>{

        if(blogId){
            axios({
                url: `/api/blogs/${blogId}`
            }).then(r=>{
                const { title, description, user } = r.data;
                f.setFieldsValue({
                    Title: title,
                    Description: description,
                    UserId: user.userId 
                })
            }).catch(e=>{
                console.log(e);
            })
        }

        axios({
            url:'api/users',
        }).then(r=>{    
            if(Array.isArray(r.data)){
                setUsers(r.data);
            }
        }).catch(e=>{
            console.log(e);
        })

    }, []);

    const onFinish = data=>{
        setLoading(true);

        if(blogId){
            axios({
                url: `api/blogs/${blogId}`,
                method: 'put',
                data: { ...data, BlogId: blogId }
            }).then(r => {
                console.log(r)
                message.success("Blog updated successfully!");
                setLoading(false);
            }).catch((e) => {
                console.log(e)
                message.error("Blog is not updated!");
                setLoading(false);
            })
        }
        else{
            axios({
                url: 'api/blogs',
                method: 'post',
                data
            }).then(r => {
                console.log(r)
                message.success("Blog create successfully!");
                setLoading(false);
            }).catch((e) => {
                console.log(e)
                message.error("Blog is not created!");
                setLoading(false);
            })
        }
        
    }

    return (
        <div style={{ 
            width: '50%', 
            margin: '30px auto'
            }}>
            <Form
                form={f}
                onFinish={onFinish}
                name="blogs-form"
            >
                <h3>Create Blog</h3>
                <Form.Item
                    name="Title"
                    key="Title"
                >
                    <Input
                        required
                        placeholder="Title" />
                </Form.Item>
                <Form.Item
                    name="Description"
                    key="Description"
                >
                    <TextArea
                        rows={6}
                        required
                        placeholder="Description" />
                </Form.Item>

                <Form.Item
                    name="UserId"
                    key="User"
                >
                    <Select
                        required
                        placeholder="User"
                        >
                        { users.map(user=> <Option value={user.userId}>{user.fullName}</Option>) }
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Ripples>
                        <Button 
                            loading={loading}
                            type="primary" 
                            htmlType="submit" 
                            style={{ display: 'block' }}>
                                Submit
                        </Button>
                    </Ripples>
                </Form.Item>
            </Form>
        </div>
    )
}

export default BlogCreateForm
