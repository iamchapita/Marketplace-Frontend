import React, { useState } from 'react';
import Search from '../bar/search';

function Searchproducts() {
  const [resultado, setResultado] = useState(null);

  const searchDB = async (query) => {
    const response = await fetch(`/api/buscar?query=${query}`);
    const data = await response.json();
    setResultado(data);
  };

  return (
    <div>
      <Search onSearch={searchDB} />
      {resultado && (
        <ul>
          {resultado.map((item) => (
            <li key={item.id}>{item.nombre}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Searchproducts;