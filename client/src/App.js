import './App.css';
import { Router } from '@reach/router';
import Form from './components/Form';
import DisplayAll from './components/DisplayAll';
import DisplayOne from './components/DisplayOne';
import EditRestaurant from './components/EditRestaurant';
import Edit from './components/Edit';

function App() {
  return (
    <div className="App">
      <Router>
        <Form path="/new"/>
        <DisplayAll default path="/all"/>
        <DisplayOne path="/favrestaurant/:id" />
        <Edit path="favrestaurant/edit/:id" />
      </Router>
    </div>
  );
}

export default App;
