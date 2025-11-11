import "./App.css";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="head">
        <h1>Products Gallery</h1>
      </div>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="*" element={<ProductList />} />
      </Routes>
    </div >
  );
}

export default App;
