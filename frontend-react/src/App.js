import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'; //v2, v3

const socket = io('http://localhost:5000'); //v2, v3 Change the URL according to your server



function App() {
  // v1 const [messages, setMessages] = useState([]);
  // const [input, setInput] = useState('');

  // const handleMessageSend = () => {
  //   // Send the message to the server
  //   // You can use a library like Axios to make HTTP requests

  //   // Clear the input field
  //   setInput('');
  // };

  // v2 const [message, setMessage] = useState('');
  // const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   socket.on('message', (message) => {
  //     setMessages([...messages, message]);
  //   });
  // }, [messages]);

  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   socket.emit('sendMessage', message);
  //   setMessage('');
  // };

  return (
    // v1 <div>
    //   <div className="chat-messages">
    //     {messages.map((message, index) => (
    //       <div key={index} className="message">
    //         {message.content}
    //       </div>
    //     ))}
    //   </div>
    //   <div className="chat-input">
    //     <input
    //       type="text"
    //       value={input}
    //       onChange={(e) => setInput(e.target.value)}
    //     />
    //     <button onClick={handleMessageSend}>Send</button>
    //   </div>
    // </div>

    // v2, v3 <div>
    //   <h1>Chat App</h1>
    //   <div>
    //     {messages.map((message, index) => (
    //       <div key={index}>{message}</div>
    //     ))}
    //   </div>
    //   <form onSubmit={sendMessage}>
    //     <input
    //       type="text"
    //       value={message}
    //       onChange={(e) => setMessage(e.target.value)}
    //     />
    //     <button type="submit">Send</button>
    //   </form>
    // </div>
  );
}

export default App;
