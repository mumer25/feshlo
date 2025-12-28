import HeroSlider from '../components/HeroSlider';
import Collections from '../components/Collections';
import ProductList from '../components/ProductList';
import GreetingOverlay from '../components/GreetingOverlay';

export default function Home(){
  return (
    <>
      <HeroSlider />
      <Collections />
      <ProductList />

      <GreetingOverlay/>
    </>
  );
}
