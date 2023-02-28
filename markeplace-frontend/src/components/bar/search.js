import React, { useState } from 'react';

function Search({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Escriba su Busqueda"
       value={query} onChange={(event) => setQuery(event.target.value)} />
      <button className='btn btn-success' type="submit">Buscar</button>
    </form>
  );
}

export default Search;
