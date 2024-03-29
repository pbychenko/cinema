import React, { useState, useEffect, useLayoutEffect } from 'react';
import {UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Pagination, Spin, Alert } from 'antd';
const { Content, Footer, Sider } = Layout;
import Head from 'next/head';
import 'antd/dist/reset.css';
import axios from "axios";
import CustomHeader from '../components/CustomHeader';
import Cards from '../components/Cards';
import routes from '../routes';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// const Series = ({genres, movies}) => {
const Series = ({ genres }) => {
  const [page, setPage] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [tvData, setTvData] = useState([]);
  const [showLoad, setShowLoad] = useState(false);
  const [showError, setShowError] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  
  const filters = [UserOutlined].map((icon) => {
    return {
      key: `genres`,
      icon: React.createElement(icon),
      label: `Genres`,
      children: genres.map((el) => ({ key: el.id, label: el.name })),
    };
  });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  
  const onSelect = async(e) => {
    const newSelectedGenres = [...selectedGenres, e.key]
    setSelectedGenres(newSelectedGenres);
    setPage(1);
    localStorage.setItem('series_page', 1);
  }

  const onDeselect = async(e) => {
    const newSelectedGenres = selectedGenres.filter((el) => el !== e.key)
    setSelectedGenres(newSelectedGenres);
    setPage(1);
    localStorage.setItem('series_page', 1);
  }

  const onPaginationChange = async(current) => {
    localStorage.setItem('series_page', current);
    setPage(current);
  };

  useEffect(() => {
    const getTvData = async(pageNumber) => {
      const tvUrl = routes.getDiscoverByGenresPath('tv', selectedGenres.toString(), pageNumber);
      setShowLoad(true);
      try {
        const res = await axios.get(tvUrl);
        const { results, total_results: totalResults } = res.data;
        setTvData(() => results.map((el) => ({ ...el, media_type: 'tv' })));
        setTotalResults(() => totalResults);
        setShowLoad(false);
        setShowError(false);
      } catch (e) {
        console.log('error', e);
        setShowError(true);
        setShowLoad(false);
      }    
    };
    const series_page = localStorage.getItem('series_page') ?? 1;
    setPage(+series_page);
    if (page) {
      getTvData(page);
    }    
  }, [selectedGenres, page]);

  return (
    <Layout>
      <Head>
        <title>Series</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CustomHeader />
      <Content 
        className='main-content'
      >
        <Layout
          className='main-layout'
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
              defaultOpenKeys={['genres']}
              items={filters}
              multiple='true'
              onSelect={onSelect}
              onDeselect={onDeselect}
            />
          </Sider>
          <Content>
            {(showLoad && !showError) ? (
              <Spin tip="Loading" size="large">
                <div className="content" />
              </Spin>): null}
            {(!showLoad && showError) ? (
              <Alert
                message="Что пошло не так"
                description="Попробуйте перезагрузить страницу чуть позже"
                type="error"
              />
            ): null}
            {(!showLoad && !showError) ? (
              <>
                <Cards data={tvData} />
                <Pagination
                    current={page}
                    onChange={onPaginationChange}
                    total={totalResults}
                    pageSize = {20}
                    className='pagination' />
              </>): null}                       
          </Content>
        </Layout>
      </Content>
      <Footer>
        Cinema ©2022 Created by pavl1k
      </Footer>
    </Layout>
  );
};
export default Series;


export async function getStaticProps() {
  const genresUrl = routes.getGenresPath('tv');
  try {
    const res = await axios.get(genresUrl);
    const genresData = res.data.genres;
    // const moviesUrl = routes.getDiscoverByGenresPath('movie', '', 1);
    // const movies = (await axios.get(moviesUrl)).data.results;

    return {
      props: {
        genres: genresData,
        // movies
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        genres: [],
      },
    };
  }  
}

