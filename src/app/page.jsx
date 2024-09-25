import HomeCarousel from "../components/HomeCarousel";
import Section from "../components/Section";
import { fetchFeaturedProducts } from "../firebase/utils";
import FeaturedProducts from "../components/ProductList";
import SponsorsCarousel from "../components/SponsorsCarousel";
import CategoryPicker from "../components/CategoryPicker";

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
          <SponsorsCarousel />
          <Section title={"Featured Products"}>
            <FeaturedProducts products={products} />
          </Section>

          <Section title={"Choose your category"}>
            {/* <FeaturedProducts products={products} /> */}
            <CategoryPicker />
          </Section>
        </div>
      </div>
    </div>
  );
}
