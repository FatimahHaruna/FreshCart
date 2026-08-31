import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";

function App () {
  return (
    <div>
      <Navbar />
      <ProductCard name='Apple' price={2500} />
      <ProductCard name='Banana' price={1500} />
    </div>
     
  )
}

export default App
