import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const AutoComplete = () => {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([
    'mustard oil',
    'rice',
    'fortune atta',
    'toothpaste',
    'biscuit',
    'horlicks',
    'surf excel',
    'dettol soap',
    'coconut oil'

    // Add more items as needed
  ]);
  const [selectedItems, setSelectedItems] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleItemClick = (item) => {
    setSelectedItems([...selectedItems, item]);
    setItems(items.filter((i) => i !== item));
    setInputValue('');
  };

  const handleChipRemove = (removedItem) => {
    setSelectedItems(selectedItems.filter((item) => item !== removedItem));
    setItems([...items, removedItem]);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Backspace' && inputValue === '' && selectedItems.length > 0) {
      // Highlight and remove the last chip when backspace is pressed with an empty input
      const lastItem = selectedItems[selectedItems.length - 1];
      handleChipRemove(lastItem);
    }
  };

  return (
    <div className="autocomplete-container">
      <div className="chips-container">
        {selectedItems.map((item, index) => (
          <div key={index} className="chip">
            {item}
            <button className="chip-remove" onClick={() => handleChipRemove(item)}>
              X
            </button>
          </div>
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Type to search..."
        className="autocomplete-input"
      />
      <ul className="autocomplete-list">
        {items
          .filter((item) => item.toLowerCase().includes(inputValue.toLowerCase()))
          .map((item, index) => (
            <li key={index} onClick={() => handleItemClick(item)}>
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AutoComplete;
