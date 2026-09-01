import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";

function App () {
  return (
    <>
      <Navbar />
      <ProductCard name='Apple' price={2500} />
      <ProductCard name='Banana' price={1500} />
    </>
     
  )
}

export default App
