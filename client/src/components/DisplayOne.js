import axios from "axios";
import { useEffect, useState } from "react";
import { navigate } from "@reach/router";

const DisplayOne = (props) => {
    console.log(props);
    const { id } = props;
    const [ restaurant, setRestaurant ] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/favrestaurant/${id}`)
            .then((res) => {
                console.log(res.data);
                setRestaurant(res.data);
                console.log(restaurant);
            })
            .catch((err) => console.log(err.response.data));
    }, [])

    const handleDeleteRestaurant = (restaurantId) => {
        axios.delete(`http://localhost:8000/api/favrestaurant/${restaurantId}`)
            .then((res) => {
                navigate('/all');
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }

    return(
        <div className="container">
            <h1>Details for  </h1>
                {
                restaurant && (
            <>
                <h2>{restaurant.name}</h2>
            <table className="table table-info table-striped table-hover display-flex">
                <thead>
                    <tr>
                        <th></th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">Restaurant Name</th> 
                    <td>{restaurant.name}</td>
                </tr>
                <tr>
                    <th scope="row">Restaurant Address</th> 
                    <td>{restaurant.address}</td>
                </tr>
                <tr>
                    <th scope="row">Cuisine Type</th> 
                    <td>{restaurant.cuisineType}</td>
                </tr>
                <tr>
                    <th scope="row">Delivery?</th> 
                    {
                        restaurant.delivery ?
                        <td>Yes</td> :
                        <td>No</td>
                    }
                </tr>
                <tr>
                    <th scope="row">Restaurant Food Picture</th> 
                    <td><img className="foodImage" src={restaurant.dishImgUrl} alt="food from restaurant" /></td>
                </tr>
                <tr>
                    <p><button  className="btn btn-danger" onClick={() => handleDeleteRestaurant(restaurant._id)}>Delete</button></p>
                </tr>
                <tr></tr>
                </tbody>
            </table>
            </>
            )}
                

        </div>
    )
}

export default DisplayOne;