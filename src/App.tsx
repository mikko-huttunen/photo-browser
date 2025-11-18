import React from 'react';
import './App.css';
import {NavigationToolbar} from "./components/toolbar/navigation-toolbar";
import {PhotoList} from "./views/photo-list/photo-list";
import {Navigate, Route, Routes} from "react-router-dom";
import {ViewPhoto} from "./views/view-photo/view-photo";

function App() {
  return (
    <div className="App">
        <NavigationToolbar/>
        <Routes>
            <Route path="/" element={<Navigate to="/images" replace={true}/>} />
            <Route path="/images" element={<PhotoList/>} />
            <Route path="/images/:id" element={<ViewPhoto/>}/>
        </Routes>
    </div>
  );
}

export default App;
