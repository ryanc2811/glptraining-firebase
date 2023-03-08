import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import * as Login from './Login.js';
function App() {
  return (
    <div className="app">
      <Router>
    <Routes>
      <Route exact path="/" component={Login} />
    </Routes>
  </Router>

    </div>
  );
}
export default App;