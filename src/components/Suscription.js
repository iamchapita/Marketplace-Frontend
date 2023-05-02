import React, { useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';

const Subscriptions = ({ userId }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
 const [subscriptionState, setSubscriptionState] = useState(false);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error(error);
        alert('Ocurrió un error al cargar las categorías.');
      }
    };
    fetchCategories();
  }, []);

  const handleCategorySelect = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await apiClient.post('/subscription', { 
        userIdFk: localStorage.getItem('id'), 
        categoryIdFK: selectedCategories 
    });
      alert('Suscripciones guardadas exitosamente.');
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al guardar las suscripciones.');
    }
  };

  const handleSwitchToggle = async () => {
    const newSubscriptionState = !subscriptionState;

    try {
      await apiClient.post('/state', { 
        userIdFk: localStorage.getItem('id'), 
        subscriptionState: newSubscriptionState 
      });
      setSubscriptionState(newSubscriptionState);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container-sm'>
        <div className='tittle'>
          <h1>Suscripciones</h1>
        </div>
      <div>
          <form onSubmit={handleSubmit} className='d-flex justify-content-center align-items-center'>
            <div className='form-group'>
              {categories.map((category) => (
                <div className='form-check form-switch' key={category.id}>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id={`category-${category.id}`}
                    value={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategorySelect(category.id)}
                  />
                  <label className='form-check-label' htmlFor={`category-${category.id}`}>
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
            <div className='form-group d-flex justify-content-center align-items-center'>
              <button type='submit' className='btn btn-primary'>
                Guardar suscripciones
              </button>
            </div>
          </form>
      </div>
      <div>
        <label className='form-check form-switch d-flex justify-content-center align-items-center'>
          <input className='form-check-input' type="checkbox" checked={subscriptionState} onChange={handleSwitchToggle} />
          Activar/desactivar suscripción
        </label>
      </div>
    </div>
  );
};

export default Subscriptions;
