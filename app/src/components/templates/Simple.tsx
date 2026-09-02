import React from 'react';

interface SimpleProps {
  content: object;
}

const Simple: React.FC<SimpleProps> = ({ content }) => {
  return (
    <div className="simple-container">
      <p>{JSON.stringify(content, null, 2)}</p>
    </div>
  );
};

export default Simple;