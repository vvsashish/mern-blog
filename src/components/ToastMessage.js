import { Toast } from "react-bootstrap";

export const ToastMessage = ({ show, onClose, message }) => (
  <Toast
    show={show}
    onClose={onClose}
    delay={3000}
    autohide
    bg="success"
    className="toast-message"
  >
    <Toast.Header>
      <strong className="me-auto">Success</strong>
    </Toast.Header>
    <Toast.Body>{message}</Toast.Body>
  </Toast>
);
