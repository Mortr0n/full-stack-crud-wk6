import './App.css';
import { Router } from '@reach/router';
import Form from './components/Form';
import DisplayAll from './components/DisplayAll';

function App() {
  return (
    <div className="App">
      <Router>
        <Form path="/new"/>
        <DisplayAll path="/all"/>
      </Router>
    </div>
  );
}

export default App;
