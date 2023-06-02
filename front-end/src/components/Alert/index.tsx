import React from "react";
import { Toast } from "react-bootstrap";
import styles from './style.module.scss'
export default function Alert({ show, content,setShow }: any) {
  return (
    <Toast 
    className={styles.alert} 
    show={show} onClose={() => setShow(false)} delay={3000} autohide>
      <Toast.Header>
        <strong className="me-auto">Alert</strong>
      </Toast.Header>
      <Toast.Body>{content}</Toast.Body>
    </Toast>
  );
}
