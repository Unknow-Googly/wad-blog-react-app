import { Card, List, message, Avatar, Tooltip, Popconfirm } from 'antd'
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { EditOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import Paragraph from 'antd/lib/typography/Paragraph';
import { Link } from 'react-router-dom';


const { Meta } = Card;

const BlogList = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const reloadData = ()=>{
        axios({
            url: '/api/blogs'
        }).then(r => {
            setLoading(false)
            setData(r.data)
        }).catch(e => {
            console.log(e)
            setLoading(false)
            message.error("Failed to load resource!");
        })
    }

    useEffect(()=>{
        setLoading(true);

        reloadData()

    }, [])

    const handleDelete = id=>{
        
        axios({
            url: `/api/blogs/${id}`,
            method: 'delete'
        }).then(r=>{
            message.success("Deleted!")
            reloadData()
        }).catch(e=>{
            message.error("Fail to delete!");
            console.log(e);
        })

        
    };
    return (
        <div style={{margin: 20}}>
            <h3>Blogs</h3>
            <List
            loading={loading}
            dataSource={data}
            pagination
            grid={{
                gutter: 16, 
                xs: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 3,
            }}
            renderItem={(item, index)=><List.Item >
                <Card 
                    actions={[
                        <Tooltip title="No function here yet!"><SettingOutlined key="setting" /></Tooltip>,
                        <Link to={`/blog/edit/${item.blogId}`}><EditOutlined key="edit" /></Link>,
                        <Popconfirm 
                            title="Delete blog?"
                            onConfirm={()=>handleDelete(item.blogId)}>
                            <DeleteOutlined key="delete" />
                        </Popconfirm>
                    ]}
                    
                    hoverable
                    
                    >
                    <Meta
                        avatar={<Tooltip title={item.user.fullName}><Avatar src="./user.png" /></Tooltip>}
                        title={item.title}
                        description={<Paragraph ellipsis={{rows: 3, expandable: true, }}>{item.description}</Paragraph>}
                    />
                </Card>
            </List.Item>}
            >

            </List>
        </div>
    )
}

export default BlogList
