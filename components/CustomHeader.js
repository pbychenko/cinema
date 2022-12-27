import Link from 'next/link';
import { Layout, Menu, } from 'antd';
// import { AppstoreOutlined, MailOutlined, SettingOutlined, LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

const CustomHeader = () => {
  const links = [ 
    {
      label: (
        <Link href="/" target="_blank">In trend</Link>
      ),
      key: 'in trend',
      // icon: <MailOutlined />,
    },
    {
      label: (
        <Link href="/movies" target="_blank">Movies</Link>
      ),
      key: 'movies',
    },
    {
      label: (
        <Link href="/series" target="_blank">Series</Link>
      ),
      key: 'series',
    },
    {
      label: (
        <Link href="/search" target="_blank">Search</Link>
      ),
      key: 'search',
    },
  ];

  return (
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={links} />
    </Header>)
};

export default CustomHeader;