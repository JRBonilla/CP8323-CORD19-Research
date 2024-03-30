// Import useEffect for managing side effects
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [userInput, setUserInput] = useState('');
  // Add a new piece of state for storing the server's response
  const [serverResponse, setServerResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submit action
    try {
      const response = await axios.post('http://localhost:3001/query', {
        userString: userInput,
      });
      setServerResponse(response.data); // Store the server's response
    } catch (error) {
      console.error('There was an error!', error);
      setServerResponse('Failed to receive response from the server.');
    }
  };

  // Optionally, clear the response message after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setServerResponse('');
    }, 5000); // Clear after 5 seconds

    return () => clearTimeout(timer);
  }, [serverResponse]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter a string"
        />
        <button type="submit">Submit</button>
      </form>
      {/* Check if serverResponse is an object and if it has the property 'answer' */}
      {serverResponse && serverResponse.answer && <p>Server says: {serverResponse.answer}</p>}
    </div>
  );
}

export default App;
