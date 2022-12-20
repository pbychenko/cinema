import { Modal, Layout, Row, Col } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

const baseImagePath = 'https://image.tmdb.org/t/p/w400';
const { Header, Content, Footer } = Layout;
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
          <Row >
             <Col className="gutter-row" span={8}>
               <Image src={`${baseImagePath}${data.poster_path}`} alt="Vercel Logo" width={400} height={600}  />
            </Col>
             <Col className="gutter-row" span={16}>
                <h1>{data.title || data.name}</h1>
                <p>{data.overview}</p>
                <Link href={`https://youtu.be/${data.videoLink}`} target="_blank">Watch Trailer</Link>
             </Col>
          </Row>
        </Content>
    </Modal>)
};

export default ShowDetailsModal;