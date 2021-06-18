import { Table } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UserList = () => {

    const [source, setSource] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: "Fullname",
            dataIndex: 'fullName',
            key: 'fullname',
        },
        {
            title: 'Date of birth',
            dataIndex: 'doB',
            key: 'dob',
        }
    ]

    useEffect(()=>{
        setLoading(true);
        axios({
            url: 'api/users'
        }).then(r=>{
            setSource(r.data)
            setLoading(false)
        }).catch(e=>{
            setLoading(false);
        })
    },[])

    return (
        <div style={{margin: 20}}> 
            <h3>Users</h3>
            <Table 
            columns={columns}
            loading={loading}
            dataSource={source}
            pagination
            />
        </div>
    )
}

export default UserList
