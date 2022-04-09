import Hero from "../components/hero/hero.components";
import Products from "../components/products/products.components";

export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <Products />
    </div>
  );
}
