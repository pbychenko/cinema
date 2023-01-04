import React, { useState, useEffect, useLayoutEffect } from 'react';
import {UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Pagination } from 'antd';
const { Content, Footer, Sider } = Layout;
import Head from 'next/head';
import 'antd/dist/reset.css';
import axios from "axios";
import CustomHeader from '../components/CustomHeader';
import Cards from '../components/Cards';
import routes from '../routes';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// const Movies = ({genres, movies}) => {
const Series = ({genres}) => {
  const [page, setPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [tvData, setTvData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  
  console.log(selectedGenres)
  const filters = [UserOutlined].map((icon, index) => {
    return {
      key: `genres`,
      icon: React.createElement(icon),
      label: `Genres`,
      children: genres.map((el) => ({ key: el.id, label: el.name })),
    };
  });

  const getTvData = async(pageNumber) => {
    console.log('in get', selectedGenres.toString())
    const tvUrl = routes.getDiscoverByGenresPath('tv', selectedGenres.toString(), pageNumber);
    const res = await axios.get(tvUrl);
    // console.log(res)
    setTvData(() => res.data.results.map((el) => ({ ...el, 'media_type': 'tv' })));
    setTotalResults(res.data.total_results);
  }
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  
  const onSelect = async(e) => {
    const newSelectedGenres = [...selectedGenres, e.key]
    setSelectedGenres(newSelectedGenres);
  }

  const onDeselect = async(e) => {
    const newSelectedGenres = selectedGenres.filter((el) => el !== e.key)
    setSelectedGenres(newSelectedGenres);
  }

  const onPaginationChange = async(current) => {
    setPage(current);
  };

  useEffect(() => {
    getTvData(page)
    console.log('in movies', tvData)
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
              defaultOpenKeys={['genres']}
              style={{
                height: '100%',
              }}
              items={filters}
              multiple='true'
              onSelect={onSelect}
              onDeselect={onDeselect}
            />
          </Sider>
          <Content
            style={{
              padding: '50px 15x'
            }}
          >
            {/* {moviesData ? (<Cards data={moviesData} onPaginationChange={onPaginationChange} page={page} /> ) : null} */}
            <Cards data={tvData} />
            <Pagination
              current={page}
              onChange={onPaginationChange}
              total={totalResults}
              pageSize = {20}
              style={{textAlign: 'center'}} />
                       
          </Content>
        </Layout>
      </Content>
      <Footer style={{textAlign: 'center'}}>
        Cinema ©2022 Created by pavl1k
      </Footer>
    </Layout>
  );
};
export default Series;

export async function getStaticProps() {
  const genresUrl = routes.getGenresPath('tv');
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
}

