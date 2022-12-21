import { Modal, Layout, Row, Col } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, Card } from "antd";
// import Icon, { RightOutlined, LeftOutlined} from '@ant-design/icons';

// const Arrow = ({ type, style, className, onClick }) => (
//   <Icon type={type} style={style} className={className} onClick={onClick} />
// );
const { Meta } = Card;
const baseImagePath = 'https://image.tmdb.org/t/p/w400';
const baseImageActorsPath = 'https://image.tmdb.org/t/p/w200';
const { Content } = Layout;
const carouselSettings = {
  // arrows: true,
  swipeToSlide: true,
  draggable: true,
  slidesToShow: 3,
  slidesToScroll: 1
};

const ShowDetailsModal = ({open, onCancel, data}) => {
  // console.log(data.videoLink)
  console.log(data.acrotrsData)

  return (
    <Modal
      // title={data.title || data.name}
      centered
      style={{
        top: 20,
      }}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={1300}
    >
        <Content>
          <Row >
             <Col className="gutter-row" span={8}>
               <Image src={`${baseImagePath}${data.poster_path}`} alt="Vercel Logo" width={400} height={600}  />
            </Col>
             <Col className="gutter-row" span={16}>
                <h1>{data.title || data.name}</h1>
                <p>{data.overview}</p>
                <Link href={`https://youtu.be/${data.videoLink}`} target="_blank">Watch Trailer</Link>
                <Carousel
                  {...carouselSettings}
                  // prevArrow={<Button transparentclassName="ant-carousel slick-prev"><Image src={`${baseImagePath}${data.poster_path}`} alt="Vercel Logo" width={15} height={15} /></Button>}
                  // nextArrow={<Icon className="ant-carousel slick-next" style={style}><RightOutlined /></Icon>}
                >{data.acrotrsData.map((el) => (
                  <Card
                    key={el.id}                  
                    hoverable
                    cover={<Image src={`${baseImageActorsPath}${el.profile_path}`} alt="Vercel Logo" width={200} height={300}/>}
                  >                  
                    <Meta title={el.name}/>
                    {/* <span>{el.media_type} {el.release_date || el.first_air_date }</span> */}
                  </Card>))}
                  <div>
                    <h3>2</h3>
                  </div>
                  <div>
                    <h3>3</h3>
                  </div>
                  <div>
                    <h3>4</h3>
                  </div>
                </Carousel>
             </Col>
          </Row>
        </Content>
    </Modal>)
};

export default ShowDetailsModal;