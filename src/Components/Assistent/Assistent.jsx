import React, { useEffect, useRef, useState } from 'react'
import "./assistent.css"


const Assistent = () => {

    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([
        'My payment is not going through',
        'Can I return a product?',
        'How do I track my order?',
        'Product delivery is late',
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

        fetch(`${import.meta.env.VITE_BASE_URL}/messagesend`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: inputValue }),
        }).then((res) => res.json()).then((data) => setMessages((prevMessages) => [...prevMessages, data.response]));

      }
    };
    const handleSuggestionClick = (suggestion) => {
        setMessages((prevMessages) => [...prevMessages, suggestion]);
        

        fetch(`${import.meta.env.VITE_BASE_URL}/message`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: suggestion }),
        }).then((res) => res.json()).then((data) => setMessages((prevMessages) => [...prevMessages, data.response]));
      };



  
    useEffect(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        'Hi, how can I help you?',
      ]);
  

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