import HomeCarousel from "../components/HomeCarousel/HomeCarousel";
import Section from "../components/Section";
import Product from "../components/Product";
import { fetchProducts } from "../firebase/utils";

export const dynamicParams = true;
export const revalidate = 60;

export default async function Page() {
  async function getProducts() {
    const products = await fetchProducts();
    return products;
  }

  const products = await getProducts();
  return (
    <div className="py-16 md:mx-10">
      <div className="container mx-auto ">
        <div className="flex flex-col gap-10">
          <HomeCarousel />
          <Section title={"Featured Products"}>
            <div
              className="grid grid-cols-1 md:grid-cols-2
				lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto
				md:max-w-none"
            >
              {products && products.length > 0 ? (
                products.map((product) => (
                  <Product key={product.id} product={product} />
                ))
              ) : (
                <p>Loading products...</p>
              )}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
