import { useState, useEffect } from "react";


function ProductInser() {

    const Valores = {
            name: "",
            price: "",
            description: "",
            categoryIdFk: "",
            status: "Nuevo", // Agregar el status por defecto
            photos: [], // Agregar el array de photos
          };
          const [formValues, setFormValues] = useState(Valores);
          const [formError, setFormError] = useState({});
          const [isSubmit, setIsSubmit] = useState(false);
        
          const handleChange = (e) => {
            const { name, value } = e.target;
            setFormValues({ ...formValues, [name]: value });
          };
        
          const handleSubmit = (e) => {
            e.preventDefault();
            setFormError(validate(formValues));
            setIsSubmit(true);
          };
        
          const handleFileChange = (e) => {
            const files = Array.from(e.target.files);
            if (files.length > 6) { // Verificar que no se suban más de 6 photos
              alert("Solo se permiten un máximo de 6 photos.");
              return;
            }
            setFormValues({ ...formValues, photos: files }); // Actualizar el status con las photos seleccionadas
          };
        
          //Efecto
          useEffect(() => {
            console.log(formError);
            if (Object.keys(formError).length === 0 && isSubmit) {
              console.log(formValues);
            }
          }, [formError]);
        
          //Validar Formulario
          const validate = (values) => {
            const errors = {};
            const regex = /^\d+(\.\d{1,2})?$/; // validar formato de número con máximo 2 decimales
            if (!values.name) {
              errors.name = "name es requerido";
            }
            if (!values.price) {
              errors.price = "price es requerido";
            } else if (!regex.test(values.price)) {
              errors.price = "price debe ser un número con máximo 2 decimales";
            }
            if (!values.description) {
              errors.description = "description es requerido";
            }
            if (!values.categoryIdFk) {
              errors.categoryIdFk = "Seleccione una categoría";
            }
            return errors;
          };
        
          return (
            <div className="container">
              <form>
                <h1>Registro</h1>
        
                <div className="field">
                  <label>Foto</label>
                  <input type="file" name="photos" multiple onChange={handleFileChange} />
                </div>
        
                <div className="field">
                  <label>Nombre</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Ingrese el name"
                    value={formValues.name}
                    onChange={handleChange}
                  />
                  {formError.name && <p className="error">{formError.name}</p>}
                </div>
        
                <div className="field">
                  <label>Precio</label>
                  <input
                    type="text"
                    name="price"
                    placeholder="Ingrese el price"
                    value={formValues.price}
                    onChange={handleChange}
                  />
                  {formError.price && <p className="error">{formError.price}</p>}
                </div>
                <div className="field">
                    <label>Descripcion</label>
                    <input
                        type="text"
                        name="description"
                        placeholder="Ingrese el description"
                        value={formValues.description}
                        onChange={handleChange}
                    />
                    {formError.description && (
                        <p className="error">{formError.description}</p>
                    )}
                </div>
                <div className="field">
                    <label>Categoría</label>
                    <select
                        name="categoryIdFk"
                        value={formValues.categoryIdFk}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione una categoría</option>
                        <option value="electrónica">Electrónica</option>
                        <option value="ropa">Ropa</option>
                        <option value="hogar">Hogar</option>
                    </select>
                    {formError.categoryIdFk && (
                        <p className="error">{formError.categoryIdFk}</p>
                    )}
                </div>

                <div className="field">
                    <label>Estado</label>
                    <select
                        name="status"
                        value={formValues.status}
                        onChange={handleChange}
                    >
                        <option value="Nuevo">Nuevo</option>
                        <option value="Usado">Usado</option>
                    </select>
                </div>



                <button
                    className="fluid ui button blue"
                    onClick={handleSubmit} // Agregar la función handleSubmit
                >
                    Agregar
                </button>


            </form>

        </div>
    );

    //<p>{formError.name}</p>

}
export default ProductInser;