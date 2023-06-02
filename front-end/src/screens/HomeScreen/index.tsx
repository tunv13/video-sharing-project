import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../../components/Header";
import Video from "../../components/Video";
import { useAuth } from "../../Auth/AuthContext";
import instanceVideoService from "../../services/video.service";

export default function HomeScreen() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
   const response =await instanceVideoService.getVideo()
    setData(response.data.videos)
  };
  return (
    <section>
      <Header />
      <Container>
        <Row>
          {data.map((item:any, index) => (
            <Col md={4} lg={3} key={index}>
              <Video title={item.title}
              videoKey={item.videoKey}
              user={item.User.email}
              description={item.description}
              image={`https://i.ytimg.com/vi/${item.videoKey}/sddefault.jpg`}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
