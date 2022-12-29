import { Layout, Row, Col, Card, Pagination } from 'antd';
import Image from 'next/image';
import routes from '../routes';
import ShowDetailsModal from './ShowDetailsModal';
import axios from "axios";

import React, { useState, useEffect } from 'react';

const { Meta } = Card;

const { Content } = Layout;

const Cards = ({data, onPaginationChange, page}) => {
  const [activeItemData, setActiveItemData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openCard = async (id) => {
    let mediaObj = data.filter((el) => el.id === id)[0];
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
        {data.map((el) => (
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
      {renderModal()}
    </Content>)
};

export default Cards;