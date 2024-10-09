import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import io from "socket.io-client";
import useUser from "../hooks/useUser";

const socket = io("http://localhost:8000");

function ChatRoom() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { user } = useUser();
  const userName = user?.providerData[0].displayName
    ? user?.providerData[0].displayName
    : user?.email.substring(0, user.email.indexOf("@"));
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { text: message, user: userName });
      setMessage("");
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleSend = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setMessage(value);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="8">
          <h2>Chat</h2>
          {user && (
            <div>
              <p>Logged in as: {userName}</p>
            </div>
          )}
          <div className="chat-dialog">
            {messages.map((msg, index) => (
              <div key={index}>
                <strong>{msg.user}:</strong> {msg.text}
              </div>
            ))}
          </div>
          <Form onSubmit={handleSend}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              className="mt-4 mb-2"
              variant="primary"
              onClick={sendMessage}
            >
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ChatRoom;
