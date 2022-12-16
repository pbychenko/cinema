import React, { useState, useEffect } from 'react';
// import { getTrendingData } from '../api';
import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
// import { AppstoreOutlined, MailOutlined, SettingOutlined, LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import 'antd/dist/reset.css';
import { Card } from 'antd';
import { Col, Row } from 'antd';
import axios from "axios";
import ShowDetailsModal from '../components/ShowDetailsModal'

const { Meta } = Card;
import { Layout, Menu, theme, Pagination, Modal } from 'antd';
const { Header, Content, Footer,  } = Layout;

// const Home = ({ trendingData }) => {
const Home = () => {
  const style = {
    background: '#0092ff',
    padding: '8px 0',
  };
  const [page, setPage] = useState(1);
  const [trendingData, setTrendingData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeItemData, setActiveItemData] = useState(null);

  const items1 = [ 
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

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const baseImagePath = 'https://image.tmdb.org/t/p/w200'

  const getTrendingData = async (pageNumber = 1) => {
    const res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=6e5ea66aa145c5494dd12c5604e4f89a&page=${pageNumber}`)
    // console.log('f', res.data)
    setTrendingData((prev) => res.data.results);
  }

  const openCard = async (id) => {
    // const uri = baseUrl + (id ? `/${id}` : '');
    // try {
      // const res = await axios.get(uri);
      // setActivePictureData(res.data);
      setShowModal(true);
    // } catch (error) {
    //   setShowErrorBlock(true);
    //   throw error;
    // }
    // const res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=6e5ea66aa145c5494dd12c5604e4f89a&page=${pageNumber}`)
    console.log('in Card', id)
    
  };

  useEffect(() => {
    getTrendingData(page)
    console.log(trendingData)
  }, [page]);

  const onPaginationChange = (current) => {
    console.log('cut', current)
    setPage(current)
  };

  const handleClick = (id) => () => openCard(id);

  const renderModal = () => (
    // activePictureData && <MyModal
    //   show={showModal}
    //   data={activePictureData}
    //   onFormChange={handleChange}
    //   onFormSubmit={handleSubmit}
    //   formData={form}
    //   onHide={handleCloseModal}
    // />

    <ShowDetailsModal
    open={showModal}
      // data={activePictureData}
      // onFormChange={handleChange}
      // onFormSubmit={handleSubmit}
      // formData={form}
      onCancel={handleCloseModal}
    />
  );
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  return (
    <Layout>
      <Head>
        <title>Cinema</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
          <Content
            style={{
              padding: '0 300px',
              minHeight: 280,          
            }}
          >
            
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              {trendingData.map((el) => (
              <Col className="gutter-row" span={6} key = {el.id}>
                <Card
                  
                  hoverable
                  style={{ width: 200 }}
                  cover={<Image src={`${baseImagePath}${el.poster_path}`} alt="Vercel Logo" width={200} height={300} />}
                  onClick={handleClick(el.id)}
                >                  
                  <Meta title={el.title || el.name}/>
                  <span>{el.media_type} {el.release_date || el.first_air_date }</span>
                </Card>
              </Col>))}
            </Row>
            {renderModal()}
            <Pagination defaultCurrent={1}
             current ={page} total={100} showSizeChanger={false}
             onChange={onPaginationChange} />

          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Cinema ©2022 Created by pavl1k
      </Footer>
    </Layout>
  );
};

export default Home;

// export async function getStaticProps() {
//   const trendingData = await getTrendingData();
//   return {
//     props: {
//       trendingData
//     },
//   };
// }
