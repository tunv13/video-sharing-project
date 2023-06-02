import React, { useState } from "react";
import Header from "../../components/Header";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { YoutubeInformation } from "../../types/YoutubeInformation";
import Video from "../../components/Video";
import instanceVideoService from "../../services/video.service";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";
export default function AddVideoScreen() {
  const navigate = useNavigate();
  const [link, setLink] = useState<string>("");
  const [youtubeInformation, setYoutubeInformation] =
    useState<YoutubeInformation>({
      title: "",
      description: "",
      videoKey: "",
    });
  const changeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const youtubeParser = async () => {
    const { youtubeInformation, youtubeId } =
      await instanceVideoService.youtubeParse(link);
    setYoutubeInformation({
      title: youtubeInformation.data.items[0].snippet.title,
      description: youtubeInformation.data.items[0].snippet.description,
      videoKey: youtubeId,
    });
  };

  const shareVideo = async () => {
    try {
      const result = await instanceVideoService.shareVideo(youtubeInformation);
      socket.emit("success", result);
      alert("Success");
      navigate("/");
    } catch (error) {
      alert("Error");
    }
  };

  return (
    <section>
      <Header />
      <Container>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Youtube link"
            value={link}
            onChange={changeLink}
          />
          <Button
            variant="outline-secondary"
            onClick={youtubeParser}
            id="button-addon2"
          >
            Fetch Video
          </Button>
        </InputGroup>
        {youtubeInformation.videoKey ? (
          <Row>
            <Col lg={6}>
              Preview
              <Video
                image={`https://i.ytimg.com/vi/${youtubeInformation.videoKey}/sddefault.jpg`}
                title={youtubeInformation.title}
                description={youtubeInformation.description}
              />
              <Button className="mt-3" onClick={shareVideo}>
                Share this video
              </Button>
            </Col>
          </Row>
        ) : null}
      </Container>
    </section>
  );
}
