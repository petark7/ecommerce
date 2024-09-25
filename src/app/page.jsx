import HomeCarousel from "../components/HomeCarousel";
import Section from "../components/Section";
import { fetchFeaturedProducts } from "../firebase/utils";
import FeaturedProducts from "../components/FeaturedProducts";
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
        <div className="flex flex-col gap-[50px] md:gap-[100px]">
          <div className="flex flex-col gap-5">
            <HomeCarousel />
            <SponsorsCarousel />
          </div>

          <Section title={"Featured Products"}>
            <FeaturedProducts products={products} />
          </Section>

          <Section title={"Choose your category"}>
            <CategoryPicker />
          </Section>
        </div>
      </div>
    </div>
  );
}
