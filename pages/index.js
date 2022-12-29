import React, { useState, useEffect } from 'react';
// import { getTrendingData } from '../api';
import Head from 'next/head';
import 'antd/dist/reset.css';
import axios from "axios";
import ShowDetailsModal from '../components/ShowDetailsModal';
import CustomHeader from '../components/CustomHeader';
import Cards from '../components/.Cards2';
import { Layout, theme, Spin } from 'antd';
import routes from '../routes';

const { Content, Footer } = Layout;

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
    setTrendingData(() => res.data.results);
    console.log('here') 
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
    // try {
      // const res = await axios.get(uri);
      // setActivePictureData(res.data);
      setShowModal(true);
    // } catch (error) {
    //   setShowErrorBlock(true);
    //   throw error;
    // }   
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
          <Cards data={trendingData} handleClick={handleClick} onPaginationChange={onPaginationChange} page={page} />
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
