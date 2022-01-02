import { useEffect, useState } from "react";
import axios from 'axios';
import { navigate } from "@reach/router";
import Header from './Header';

const Edit = (props) => {
    const [ name, setName ] = useState("");
    const [ address, setAddress ] = useState("");
    const [ cuisineType, setCuisineType ] = useState("");
    const [ dishImgUrl, setDishImgUrl ] = useState("");
    const [ delivery, setDelivery ] = useState(false);
    const [ errors, setErrors ] = useState({})
    const allCuisines = [
        "Mexican",
        "American",
        "Chinese",
    ]
    const { id } = props;

    useEffect(() => {
        axios.get(`http://localhost:8000/api/favrestaurant/${id}`)
            .then((res) => {
                console.log(res.data);
                setName(res.data.name);
                setAddress(res.data.address);
                setCuisineType(res.data.cuisineType);
                setDishImgUrl(res.data.dishImgUrl);
                setDelivery(res.data.delivery);
            })
            .catch((err) => console.log(err.response.data));
    }, [])

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
        console.log(postData);
        // 2. axios.post
        axios.put(`http://localhost:8000/api/favrestaurant/${id}`, postData)
            .then((res) => {
                console.log("Success", res);
                navigate('/all');
            })
            .catch((err)=> {
                console.log(err.response);
                // Check for validation errors and setErrors equal to the object
                if(err.response.data.errors) {
                    setErrors(err.response.data.data.message);
                }
            });
    }

    return(
        <div className="container offset-4" >
            <Header />
            <h1 className="d-flex text-success">New Favorite Restaurant!</h1>

            <form onSubmit={handleFormSubmit} className="d-flex justify-content-center flex-column">
                <div className="form-floating col-5 mb-4">
                    <input 
                    type="text" 
                    id="name" 
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                    {/* Each of these errors lines checks for validation errors and changes the label based on the error */}
                    {/* kind of proud how these work :) */}
                    {
                        errors.name ?
                        <label htmlFor="name" className="form-label text-danger fs-5">{errors.name.message}</label>:
                        <label htmlFor="name" className="form-label fs-5">Name</label>
                    }
                </div>
                <div className="form-floating col-5 mb-4">                    
                    <input 
                    type="text" 
                    id="address" 
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    />
                    {
                        errors.address ?
                        <label htmlFor="address" className="form-label text-danger fs-5">{errors.address.message}</label> :
                        <label htmlFor="address" className="form-label fs-5">Address</label>                        
                    }
                </div>
                <div className="form-floating col-5 mb-4">
                    <select 
                    id="cuisineType" 
                    className="form-select"
                    value={cuisineType}
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
                    {
                        errors.cuisineType ?
                        <label htmlFor="cuisineType" className="form-label text-danger fs-5">{errors.cuisineType.message}</label> :
                        <label htmlFor="cuisineType" className="form-label fs-5">Cuisine Type</label>
                    }
                </div>
                <div className="form-check col-5 mb-4">
                    <input 
                    className="form-check-input mt-2 ms-5" 
                    type="checkbox" 
                    id="delivery"
                    // could also setDelivery(!hasDelivery)
                    onChange={(e) => setDelivery(e.target.checked)}
                    checked={delivery}
                    />
                    {/* {
                        delivery ?
                            <input 
                            className="form-check-input mt-2 ms-5" 
                            type="checkbox" 
                            id="delivery"
                            // could also setDelivery(!hasDelivery)
                            checked        
                            onChange={(e) => setDelivery(e.target.checked)}
                            /> :
                            <input 
                                className="form-check-input mt-2 ms-5" 
                                type="checkbox" 
                                id="delivery"
                                // could also setDelivery(!hasDelivery)      
                                onChange={(e) => setDelivery(e.target.checked)}
                                />
                    } */}
                    <label className="form-check-label fs-5 me-5" htmlFor="delivery">Delivery?</label>
                </div>
                <div className="form-floating col-5 mb-4">
                    <input 
                    type="text" 
                    id="dishImgUrl" 
                    className="form-control"
                    value={dishImgUrl}
                    onChange={(e) => setDishImgUrl(e.target.value)}
                    />
                    {
                    errors.dishImgUrl ?
                        <label className="form-label text-danger fs-5 text-nowrap" htmlFor="dishImgUrl">{errors.dishImgUrl.message}</label> :
                        <label className="form-label fs-5" htmlFor="dishImgUrl">Dish Image URL</label>
                    }
                </div>

                <div className="form-floating col-5 mb-4 d-flex justify-content-start">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                
            </form>
        </div>
    )
}

export default Edit;