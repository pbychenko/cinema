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
  slidesToScroll: 1,
  variableWidth: true
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
                    style={{ width: 150 }}
                    cover={<Image src={`${baseImageActorsPath}${el.profile_path}`} alt="Vercel Logo" width={150} height={200}/>}
                  >                  
                    <p> {el.name}</p>
                  </Card>))}
                </Carousel>
             </Col>
          </Row>
        </Content>
    </Modal>)
};

export default ShowDetailsModal;