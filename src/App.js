import React, { useState } from 'react';
import axios from 'axios';
import { API_SERVER } from './env';
import './App.css';
import 'antd/dist/antd.css';
import { Link, Route, Switch } from 'react-router-dom';
import UserCreateForm from './components/UserCreateForm';
import BlogCreateForm from './components/BlogCreateForm';
import BlogList from './components/BlogList';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  SoundOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import UserList from './components/UserList';

const { Sider } = Layout;
const { SubMenu } = Menu;

function App() {

  axios.defaults.baseURL = API_SERVER
  const [collapsed, onCollapse] = useState(false);
  return (
    <Layout style={{ minHeight: '100vh' }}>

      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/">My SPA</Link>
            </Menu.Item>
          
          <SubMenu key="sub2" icon={<SoundOutlined />} title="Blog">
            <Menu.Item key="8"><Link to="/blog">List</Link></Menu.Item>
            <Menu.Item key="6"><Link to="/blog/create">Create</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="4"><Link to="/user">List</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/user/create">Create</Link></Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <div>
        <Switch>
          <Route path="/user/create" component={ UserCreateForm } exact />
          <Route path="/user" component={UserList} exact />
          <Route path="/blog/create" component={BlogCreateForm} exact />
          <Route path="/blog" component={BlogList} exact/>
          <Route path="/" component={BlogList} exact />
          <Route path="/blog/edit/:blogId" component={BlogCreateForm} exact />
        </Switch>
        </div>
      </Layout>
    </Layout>
  );
}

export default App;
