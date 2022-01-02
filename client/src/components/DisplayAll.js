import { useEffect, useState } from "react";
import axios from "axios";
import { Link, navigate } from '@reach/router';
import Header from "./Header";

const DisplayAll = (props) => {

    const [ restaurantsFromApi, setRestaurantsFromApi ] = useState([]);
    // below is another way to refresh the list of restaurants also need a
    // setTriggerRequest(!triggerRequest) in the handle function and also trigger
    // request in useEffect
    // const [ triggerRequest, setTriggerRequest ] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/favrestaurant')
            .then((res) => {
                // setting the axios get to our restaurantsFromAPI state
                console.log(res.data);
                setRestaurantsFromApi(res.data)
                console.log(...restaurantsFromApi);
            })
            .catch((err) => console.log(err.response.data));
    }, []);
    // triggerRequest would go in the array brackets above
    const handleDeleteRestaurant = (restaurantId) => {
        axios.delete(`http://localhost:8000/api/favrestaurant/${restaurantId}`)
            .then((res) => {
                console.log(res);
                // Filtering the restaurants array to remove the item from '
                // the array in state to refress the list since state changes
                setRestaurantsFromApi(
                    restaurantsFromApi.filter((restaurants) => {
                        return restaurants._id !== restaurantId;
                    })
                );
                // setTriggerRequest(!triggerRequest);
                
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }

    return(
        <div className="container">
            <Header />
            <h1>Favorite Restaurants</h1>
            
            <table className="table table-primary table-striped table-hover display-flex">
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
                        restaurantsFromApi.map((restaurant) => {
                            return(
                                <tr className="" key={restaurant._id}>
                                    <td>{restaurant.name}</td>
                                    <td>{restaurant.address}</td>
                                    <td>{restaurant.cuisineType}</td>
                                    {
                                        restaurant.delivery ?
                                        <td>Yes</td> :
                                        <td>No</td>
                                    }
                                    <td ><img className="foodImage" src={restaurant.dishImgUrl} alt="food from restaurant" /></td>
                                    <td className="" >
                                        <Link className="btn btn-primary mt-5 me-2" to={`/favrestaurant/${restaurant._id}`}>Details</Link>
                                        <Link className="btn btn-success mt-5 me-2" to={`/favrestaurant/edit/${restaurant._id}`} >Edit</Link>
                                        <button className="btn btn-danger mt-5 me-1"  onClick={() => handleDeleteRestaurant(restaurant._id)}>Delete</button>
                                    </td> 
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