import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import BlogsDetails from './pages/BlogsDetails';
import PlacesRoute from './pages/PlacesRoute';
import About from './pages/About';
import NoPage from './pages/NoPage';

const App = () => {
  return (
    <>
   
     <BrowserRouter>
     <Routes>
     <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/:id" element={<BlogsDetails />} />
        <Route path="best-places" element={<PlacesRoute />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NoPage />} />
     </Route>
     </Routes>
     </BrowserRouter> 
    </>
  )
}

export default App
