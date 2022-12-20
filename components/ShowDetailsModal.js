import { Modal, Layout, Row, Col } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, Ico, Button } from "antd";
import { RightOutlined, LeftOutlined} from '@ant-design/icons';

// const Arrow = ({ type, style, className, onClick }) => (
//   <Icon type={type} style={style} className={className} onClick={onClick} />
// );

const baseImagePath = 'https://image.tmdb.org/t/p/w400';
const { Header, Content, Footer } = Layout;
const carouselSettings = {
  arrows: true,
  slidesToShow: 2,
  slidesToScroll: 1
};
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
};
const ShowDetailsModal = ({open, onCancel, data}) => {
  console.log(data.videoLink)

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
        <LeftOutlined width={100} height={100} />
          <Row >
             <Col className="gutter-row" span={8}>
               <Image src={`${baseImagePath}${data.poster_path}`} alt="Vercel Logo" width={400} height={600}  />
            </Col>
             <Col className="gutter-row" span={16}>
                <h1>{data.title || data.name}</h1>
                <p>{data.overview}</p>
                <Link href={`https://youtu.be/${data.videoLink}`} target="_blank">Watch Trailer</Link>
                {/* <Button className="ant-carousel slick-next">Next</Button>
                  <Button className="ant-carousel slick-prev">Prev</Button> */}
                <Carousel
                  {...settings}
                  arrows='true'
                  prevArrow={ <Button transparentclassName="ant-carousel slick-prev" type="primary"><Image src={`${baseImagePath}${data.poster_path}`} alt="Vercel Logo" width={15} height={15} /></Button>}
                  nextArrow={<Button className="ant-carousel slick-next" type="primary"><RightOutlined /></Button>}
                  // effect="fade"
                >
                  
                  <div>
                    <h3>1</h3>
                  </div>
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