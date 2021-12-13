import './App.css';
import { Router } from '@reach/router';
import Form from './components/Form';
import DisplayAll from './components/DisplayAll';
import DisplayOne from './components/DisplayOne';
import EditRestaurant from './components/EditRestaurant';

function App() {
  return (
    <div className="App">
      <Router>
        <Form path="/new"/>
        <DisplayAll default path="/all"/>
        <DisplayOne path="/favrestaurant/:id" />
        <EditRestaurant path="/edit/:id" />
      </Router>
    </div>
  );
}

export default App;
