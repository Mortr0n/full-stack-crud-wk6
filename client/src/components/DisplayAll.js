import { useEffect, useState } from "react";
import axios from "axios";

const DisplayAll = (props) => {

    const [ restaurantsFromApi, setRestaurantsFromApi ] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/favrestaurant')
            .then((res) => {
                console.log(res.data);
                setRestaurantsFromApi(res.data)
                console.log(...restaurantsFromApi);
            })
            .catch((err) => console.log(err.response.data));
    }, []);

    return(
        <div className="container">
            <h1>Favorite Restaurants</h1>
            <table className="table table-success table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Cuisine</th>
                        <th>Delivery</th>
                        <th>Dish Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        restaurantsFromApi.map((restaurant, index) => {
                            return(
                                <tr>
                                    <td>{restaurant.name}</td>
                                    <td>{restaurant.address}</td>
                                    <td>{restaurant.cuisineType}</td>
                                    <td>{restaurant.delivery}</td>
                                    <td className="container-sm">{restaurant.dishImgUrl}</td>
                                    <td className="container-md">Add Edit Delete</td> 
                                </tr>
                            )
                        })
                    }                    
                </tbody>
            </table>
        </div>
    )

}

export default DisplayAll;