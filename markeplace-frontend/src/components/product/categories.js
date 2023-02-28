import React, { useEffect, useState } from "react";
import axios from "axios";

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/categories').then((response) => {
            setCategories(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    return (<div>
        <ul>
            {categories.map((category) => <li key={category.id}>{category.name}</li>)}
        </ul>
    </div>);

}

export default Categories;