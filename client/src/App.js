import { BrowserRouter, Navigate, Routes, Route} from  'react-router-dom';
import homePage from 'scenes/homePage';
import loginPage from 'scenes/loginPage';
import profilePage from 'scenes/profilePage';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<loginPage />} />
      <Route path="/home" element={<homePage />} />
      <Route path="/profile/:userId" element={<profilePage />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
