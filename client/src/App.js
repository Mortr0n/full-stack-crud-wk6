import './App.css';
import { Router } from '@reach/router';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
      <Router>
        <Form path="/new"/>
      </Router>
    </div>
  );
}

export default App;
