import { Layout, Row, Col, Card, Pagination } from 'antd';
import Image from 'next/image';
import routes from '../routes';
// import axios from "axios";

// import React, { useState, useEffect } from 'react';

const { Meta } = Card;

const { Content } = Layout;

const Cards = ({data, handleClick, onPaginationChange, page}) => {
  // const [page, setPage] = useState(1);
  // const [trendingData, setTrendingData] = useState(data);
  console.log('here')

  // const getTrendingData = async(pageNumber) => {
  //   const trendsUrl = routes.getTrendingPath(pageNumber);
  //   const res = await axios.get(trendsUrl); 
  //   // console.log('in getTrendingData')
  //   setTrendingData(() => res.data.results);    
  // }

  // const onPaginationChange = async(current) => {
  //   setPage(current);
  //   await getTrendingData(current);
  // };

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
    </Content>)
};

export default Cards;