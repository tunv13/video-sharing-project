import React from "react";
import { Badge } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import styles from './styles.module.scss'
export default function Video({ image, title,user, description, videoKey }: any) {
  const clickVideo = () => {
    window.open("https://www.youtube.com/watch?v=" + videoKey);
  };
  return (
    <Card className="w-100 my-3 pointer" onClick={clickVideo}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      User:  <Badge bg="primary">{user}</Badge>
        <Card.Text className={styles.description} >
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
