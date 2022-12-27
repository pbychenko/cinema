import React, { useState } from 'react';
// import Head from 'next/head'
// import Image from 'next/image'
// // import styles from '../styles/Home.module.css'
import Link from 'next/link';
// import 'antd/dist/reset.css';
// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

// import { Menu } from 'antd';
// const items = [ 
//   {
//     label: (
//       <Link href="/movies" target="_blank">In trend</Link>
//     ),
//     key: 'alipay',
//     icon: <MailOutlined />,
//   },
//   {
//     label: (
//       <Link href="/movies" target="_blank">Movies</Link>
//     ),
//     key: 'alipay',
//   },
//   {
//     label: (
//       <Link href="/movies" target="_blank">Series</Link>
//     ),
//     key: 'alipay',
//   },
//   {
//     label: (
//       <Link href="/search" target="_blank">Search</Link>
//     ),
//     key: 'alipay',
//   },
// ];

// const Home = () => {
//   const [current, setCurrent] = useState('mail');
//   const onClick = (e) => {
//     console.log('click ', e);
//     setCurrent(e.key);
//   };
//   {/* <Head>
//         <title>Create Next App</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>
//           Welcome to <a href="https://nextjs.org">Next.js!</a>
//         </h1>

//         <p className={styles.description}>
//           Get started by editing{' '}
//           <code className={styles.code}>pages/index.js</code>
//         </p>

//         <div className={styles.grid}>
//           <a href="https://nextjs.org/docs" className={styles.card}>
//             <h2>Documentation &rarr;</h2>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className={styles.card}>
//             <h2>Learn &rarr;</h2>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href="https://github.com/vercel/next.js/tree/canary/examples"
//             className={styles.card}
//           >
//             <h2>Examples &rarr;</h2>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//             className={styles.card}
//           >
//             <h2>Deploy &rarr;</h2>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
//       </main>

//       <footer className={styles.footer}>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{' '}
//           <span className={styles.logo}>
//             <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
//           </span>
//         </a>
//       </footer> */}
//   return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} theme="dark" />;
// };

// export default Home
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { Select } from 'antd';

const App = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  
const items1 = [ 
  {
    label: (
      <Link href="/" target="_blank">In trend</Link>
    ),
    key: 'alipay',
    // icon: <MailOutlined />,
  },
  {
    label: (
      <Link href="/movies" target="_blank">Movies</Link>
    ),
    key: 'alipay',
  },
  {
    label: (
      <Link href="/movies" target="_blank">Series</Link>
    ),
    key: 'alipay',
  },
  {
    label: (
      <Link href="/search" target="_blank">Search</Link>
    ),
    key: 'alipay',
  },
];
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={200}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{
                height: '100%',
              }}
              items={items2}
              multiple='true'
            />
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default App;

