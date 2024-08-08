import React, { useEffect, useRef, useState } from 'react'
import "./assistent.css"
import {io} from "socket.io-client"

const socket = io('https://clickshop-server.onrender.com',)

const Assistent = () => {

    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([
        'My payment is not going through',
        'Can I return a product?',
        'How do I track my order?',
        'Product delevery is late',
      ]);
  
    console.log(messages);
  
    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
  
    const handleSend = () => {
      if (inputValue.trim()) {
        const newMessage = inputValue;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputValue('');
        socket.emit('sendmessage', newMessage);
      }
    };
    const handleSuggestionClick = (suggestion) => {
        setMessages((prevMessages) => [...prevMessages, suggestion]);
        socket.emit('message', suggestion);
      };
  
    useEffect(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        'Hi, how can I help you?',
      ]);
  
      socket.on('response', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      socket.on('sendmessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
  
      return () => {
        socket.disconnect();
      };
    }, []);


  return (
    <>
    <div>
      <div className={`drawer open`}>
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className="message">{message}</div>
          ))}
        </div>
        <div className="suggestion">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="suggestion-button"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your issue here"
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default Assistent