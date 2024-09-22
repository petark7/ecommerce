import HomeCarousel from "../components/HomeCarousel/HomeCarousel";
import Section from "../components/Section";
import { fetchFeaturedProducts } from "../firebase/utils";
import ProductList from "../components/ProductList";

export const dynamicParams = true;
export const revalidate = 60;

export default async function Page() {
  async function getProducts() {
    const products = await fetchFeaturedProducts(8);
    return products;
  }

  const products = await getProducts();
  return (
    <div className="py-16 md:mx-10">
      <div className="container mx-auto ">
        <div className="flex flex-col gap-10">
          <HomeCarousel />
          <Section title={"Featured Products"}>
            <ProductList products={products} />
          </Section>
        </div>
      </div>
    </div>
  );
}
