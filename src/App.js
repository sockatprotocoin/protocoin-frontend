import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import MainContent from './components/MainContent';

function App() {
    return (
        <Router>
            <Sidebar />
            <MainContent />
        </Router>
    );
}

export default App;
