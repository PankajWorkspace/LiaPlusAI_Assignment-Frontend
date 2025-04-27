import './App.css';
import Feedback from './component/feedBack';
import Dashboard from './component/dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Feedback />
      <hr />
      <Dashboard />
    </div>
  );
}

export default App;