import { Layout, Row, Col, Card } from 'antd';
import Image from 'next/image';
import routes from '../routes';
import ShowDetailsModal from './ShowDetailsModal';
import styles from './Cards.module.css';

import React, { useState } from 'react';

const { Meta } = Card;
const { Content } = Layout;

const Cards = ({ data }) => {
  const [activeItemData, setActiveItemData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openCard = async (id) => {
    let mediaObj = data.filter((el) => el.id === id)[0];
    setActiveItemData(mediaObj);
    setShowModal(true);
  };

  const handleClick = (id) => () => openCard(id);

  const renderModal = () => (    
    activeItemData && 
    <ShowDetailsModal
      open={showModal}
      data={activeItemData}
      onCancel={handleCloseModal}
  />
  );
  
  const handleCloseModal = () => {
    setShowModal(false);
    setActiveItemData(null); //?
  };

  return (
    <Content
      className={styles.contentCard}
    >      
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        {data.length > 0 ? (data.map((el) => (
        <Col className="gutter-row" span={6} key = {el.id}>
          <Card                  
            hoverable
            className={styles.card}
            cover={<Image src={routes.getImagePath(200,el.poster_path)} alt="Vercel Logo" width={200} height={300} />}
            onClick={handleClick(el.id)}
          >                  
            <Meta title={el.title || el.name}/>
            <span>{el.media_type} {el.release_date || el.first_air_date }</span>
          </Card>
        </Col>))) : null}
      </Row>
      {renderModal()}
    </Content>)
};

export default Cards;