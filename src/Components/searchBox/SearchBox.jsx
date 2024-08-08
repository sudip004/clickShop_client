import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBox.css';

const SearchBox = ({ products }) => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  
  console.log("products", filteredItems);

  useEffect(() => {
    if (searchTerm) {
      const newSuggestions = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setFilteredItems([suggestion]);
    setSuggestions([]);
    setSearchTerm('');
    // Navigate after clearing suggestions
    setTimeout(() => {
      navigate(`/searchcart/${suggestion.name}`);
    }, 0);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for products"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
