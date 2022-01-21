import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PhotosList from "./components/PhotosList/PhotosList";

function App() {
  return (
    <div className="App">
        <Header text="TEST APP"/>
        <PhotosList />
        <Footer text="© 2018-2019" />
    </div>
  );
}

export default App;
