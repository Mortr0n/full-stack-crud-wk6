import { useState } from "react";
import axios from 'axios';

const Form = (props) => {
    const [ name, setName ] = useState("");
    const [ address, setAddress ] = useState("");
    const [ cuisineType, setCuisineType ] = useState("");
    const [ dishImgUrl, setDishImgUrl ] = useState("");
    const [ delivery, setDelivery ] = useState(false);
    const allCuisines = [
        "Mexican",
        "American",
        "Chinese",
    ]

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("inside form handler");
        // 1. pack data object which will be form obj sent to server
        const postData = {
            name, 
            address, 
            cuisineType, 
            delivery, 
            dishImgUrl, 
        };
        // 2. axios.post
        axios.post('localhost:8000/api/favrestaurant', postData)
            .then((res) => console.log("Success", res))
            .catch((err)=> console.log(err));
    }

    return(
        <div className="container offset-4" >
            
            <h1 className="d-flex text-primary">New Favorite Restaurant!</h1>

            <form onSubmit={handleFormSubmit} className="d-flex justify-content-center flex-column">
                <div className="form-floating col-5 mb-4">
                    <input 
                    type="text" 
                    id="name" 
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="name" className="form-label">Name</label>
                </div>
                <div className="form-floating col-5 mb-4">                    
                    <input 
                    type="text" 
                    id="address" 
                    className="form-control"
                    onChange={(e) => setAddress(e.target.value)}
                    />
                    <label htmlFor="address" className="form-label">Address</label>
                </div>
                <div className="form-floating col-5 mb-4">
                    <select 
                    id="cuisineType" 
                    className="form-select"
                    onChange={(e) => setCuisineType(e.target.value)}
                    >
                        <option value={""}>Select an option!</option>
                        {
                            allCuisines.map((cuisine, index)=> {
                                return(
                                    <option key={index} value={cuisine}>{cuisine}</option>
                                )
                            })
                        }               
                    </select>
                    <label htmlFor="cuisineType" className="form-label">Cuisine Type</label>
                </div>
                <div className="form-check col-5 mb-4">
                    <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="delivery"
                    // could also setDelivery(!hasDelivery)
                    onChange={(e) => setDelivery(e.target.checked)}
                    checked={delivery}
                    />
                    <label className="form-check-label" htmlFor="delivery">Delivery?</label>
                </div>
                <div className="form-floating col-5 mb-4">
                    <input 
                    type="text" 
                    id="dishImgUrl" 
                    className="form-control"
                    onChange={(e) => setDishImgUrl(e.target.value)}
                    />
                    <label className="form-label" htmlFor="dishImgUrl">Dish Image URL</label>
                </div>

                <div className="form-floating col-5 mb-4 d-flex justify-content-start">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                
            </form>
        </div>
    )
}

export default Form;