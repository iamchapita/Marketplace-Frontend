import React, { useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';

const Subscriptions = ({ userId }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [subscriptionState, setSubscriptionState] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [subscribedCategories, setSubscribedCategories] = useState([]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get('/categories');
        setCategories(response.data);
        setLoadingCategories(false);
  
        const subscribedResponse = await apiClient.get(`/getSubscription?userIdFK=${localStorage.getItem('id')}`);
        setSubscribedCategories(subscribedResponse.data.map((category) => category.categoryIdFK));
      } catch (error) {
        console.error(error);
        alert('Ocurrió un error al cargar las categorías.');
      }
    };
    fetchCategories();
  }, []);
  
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await apiClient.get(`/getState?userIdFK=${localStorage.getItem('id')}`);
        setSubscriptionState(response.data[0].subscriptionState);
      } catch (error) {
        console.error(error);
        alert('Ocurrió un error al obtener la suscripción.');
      }
    };
    fetchSubscription();
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

  const handleSavePDF = async () => {
    try {
      const response = await apiClient.get(`/pdf?userIdFK=${localStorage.getItem('id')}` , { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Mis-Suscripciones.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al generar el PDF.');
    }
  };

  return (
    <div className='container-sm'>
        <div className='tittle'>
          <h1>Suscripciones</h1>
        </div>
          <div>{loadingCategories ? (
          <p>Cargando categorías...</p>
          ) : (
            <form onSubmit={handleSubmit} className='d-flex justify-content-center align-items-center'>
              <div className='row'>
                
                <div className='col-sm-12 col-md-12 d-flex justify-content-center align-items-center' id='subscription'>
                  <div className='form-group row'>
                    <div className='col-md-6'>
                      {categories.slice(0, Math.ceil(categories.length / 2)).map((category) => (
                        <div className='form-check form-switch' key={category.id}>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id={`category-${category.id}`}
                            value={category.id}
                            checked={selectedCategories.includes(category.id) || subscribedCategories.includes(category.id)}
                            onChange={() => handleCategorySelect(category.id)}
                          />
                          <label className='form-check-label' htmlFor={`category-${category.id}`}>
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className='col-md-6'>
                      {categories.slice(Math.ceil(categories.length / 2)).map((category) => (
                        <div className='form-check form-switch' key={category.id}>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id={`category-${category.id}`}
                            value={category.id}
                            checked={selectedCategories.includes(category.id) || subscribedCategories.includes(category.id)}
                            onChange={() => handleCategorySelect(category.id)}
                          />
                          <label className='form-check-label' htmlFor={`category-${category.id}`}>
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                
                <div className='col-sm-12 col-md-12 d-flex justify-content-center align-items-center' id='subscription'>
                <div className='form-group d-flex justify-content-center align-items-center'>
                  <button type='submit' className='btn btn-primary'>
                    Guardar suscripciones
                  </button>
                </div>
                </div>

              </div>
            </form>
          )}
      </div>

      <div>
        <label className='form-check form-switch d-flex justify-content-center align-items-center' id='subscription'>
          <input
            className='form-check-input'
            type='checkbox'
            checked={subscriptionState}
            onChange={handleSwitchToggle}
          />
          Activar/desactivar suscripción
        </label>
      </div>

      <div className='d-flex justify-content-center align-items-center'>
        <button onClick={handleSavePDF} className='btn btn-secondary'>
          Descargar Mis Suscripciones
        </button>
      </div>

    </div>
  );
};

export default Subscriptions;
