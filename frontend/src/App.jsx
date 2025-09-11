import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import LoginPage from './Pages/LoginPage/LoginPage';
import './index.css';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { HeaderMegaMenu } from './Components/Navbar/HeaderMegaMenu';
import Profile from './Pages/Profile';
// import Urlform from './Pages/Urlform/Urlform';
import UrlShortener from './Pages/Urlform/UrlShortener';
import MyUrls from "./Pages/MyUrl";
import UrlsTable from './Components/UrlsTable.jsx';
import MyUrl from './Pages/MyUrl.jsx';


function App() {
  return (
    <Router>
        <HeaderMegaMenu/>
        <Routes>
            <Route path='/' element={<Home/>}/>
           <Route path='/profile' element={<Profile/>}/>
           <Route path='/url/shortener' element={<UrlShortener/>}/>
           <Route path='/login' element={<LoginPage/>} />
            <Route path='/url/myurl' element={<MyUrl/>}/>      
           <Route element={<PrivateRoute/>}> </Route>
        </Routes>
    </Router>
  )
}

export default App
