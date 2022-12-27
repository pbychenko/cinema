import React, { useState, useEffect } from 'react';
// import { getTrendingData } from '../api';
import Head from 'next/head';
import Image from 'next/image';
import 'antd/dist/reset.css';
import { Card } from 'antd';
import { Col, Row } from 'antd';
import axios from "axios";
import ShowDetailsModal from '../components/ShowDetailsModal';
import CustomHeader from '../components/CustomHeader';
import { Layout, theme, Pagination, Spin } from 'antd';
import routes from '../routes';

const { Content, Footer } = Layout;

const { Meta } = Card;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const Home = ({data}) => {
// const Home = () => {
  const [page, setPage] = useState(1);
  const [trendingData, setTrendingData] = useState(data);
  const [showModal, setShowModal] = useState(false);
  const [activeItemData, setActiveItemData] = useState(null);
  // const [load, setLoad] = useState(false);
  // const [showError, setShowError] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const getTrendingData = async(pageNumber) => {
    const trendsUrl = routes.getTrendingPath(pageNumber);
    const res = await axios.get(trendsUrl); 
    // console.log('in getTrendingData')
    setTrendingData(() => res.data.results);    
  }

  const openCard = async (id) => {
    let mediaObj = trendingData.filter((el) => el.id === id)[0];
    const videosUrl = routes.getVideosPath(mediaObj.media_type, id);
    const acrotrsUrl = routes.getActorsPath(mediaObj.media_type, id);
    const videoRes = await axios.get(videosUrl);
    const actorsRes = await axios.get(acrotrsUrl);
    const videoLink = videoRes.data.results[0].key;
    const acrotrsData = actorsRes.data.cast.slice(0, 10);
    mediaObj = { ...mediaObj, videoLink, acrotrsData };

    setActiveItemData(mediaObj);


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
    // console.log('in Card', id)
    
  };

  // useEffect(() => {
  //   console.log('here')
  //   getTrendingData(page)
  //   // console.log('here')
  // }, [page]);

  const onPaginationChange = async(current) => {
    setPage(current);
    await getTrendingData(current);
  };

  const handleClick = (id) => () => openCard(id);

  const renderModal = () => (
    activeItemData && <ShowDetailsModal
      open={showModal}
      data={activeItemData}
      // onFormChange={handleChange}
      // onFormSubmit={handleSubmit}
      // formData={form}
      onCancel={handleCloseModal}
  />);
  
  const handleCloseModal = () => {
    setShowModal(false);
    setActiveItemData(null); //?
  };
  
  return (
    <Layout>
      <Head>
        <title>Cinema</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CustomHeader />
      {/* <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin> */}
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
                  cover={<Image src={routes.getImagePath(200,el.poster_path)} alt="Vercel Logo" width={200} height={300} />}
                  onClick={handleClick(el.id)}
                >                  
                  <Meta title={el.title || el.name}/>
                  <span>{el.media_type} {el.release_date || el.first_air_date }</span>
                </Card>
              </Col>))}
            </Row>
            <Pagination
              current={page}
              onChange={onPaginationChange}
              total={50}
              style={{textAlign: 'center'}} />
          </Content>
          {renderModal()}
        </Layout>
      </Content>
      <Footer style={{textAlign: 'center'}}>
        Cinema ©2022 Created by pavl1k
      </Footer>
    </Layout>
  );
};

export default Home;

export async function getStaticProps() {
  const trendsUrl = routes.getTrendingPath(1);
  const res = await axios.get(trendsUrl);
  const data = res.data.results;
  return {
    props: {
      data
    },
  };
}
