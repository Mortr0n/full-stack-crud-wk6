import './App.css';
import { Router } from '@reach/router';
import Form from './components/Form';
import DisplayAll from './components/DisplayAll';
import DisplayOne from './components/DisplayOne';
import Edit from './components/Edit';
import Login from './components/Login';
import Logreg from './views/LogReg';
import LogReg from './views/LogReg';

function App() {
  return (
    <div className="App">
      <Router>
        <LogReg path="/logreg" />
        <Login path='/login' />
        <Form path="/new"/>
        <DisplayAll default path="/all"/>
        <DisplayOne path="/favrestaurant/:id" />
        <Edit path="favrestaurant/edit/:id" />
      </Router>
    </div>
  );
}

export default App;
