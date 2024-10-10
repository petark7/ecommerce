import dynamic from "next/dynamic";
import { Suspense } from "react";
import Section from "../components/Section";
import { fetchFeaturedProducts } from "../firebase/utils";
import FeaturedProducts from "../components/FeaturedProducts";
import CategoryPicker from "../components/CategoryPicker";

const HomeCarousel = dynamic(() => import("../components/Home/HomeCarousel"), {
  loading: () => <p>Loading...</p>,
});
const SponsorsCarousel = dynamic(
  () => import("../components/SponsorsCarousel"),
  { loading: () => <p>Loading...</p> }
);

export const dynamicParams = true;
export const revalidate = 60;

export default async function Page() {
  const products = await fetchFeaturedProducts(8);

  return (
    <div className="py-16 md:mx-10">
      <div className="container mx-auto ">
        <div className="flex flex-col gap-[50px] md:gap-[100px]">
          <div className="flex flex-col gap-5">
            <Suspense fallback={<p>Loading carousel...</p>}>
              <HomeCarousel />
            </Suspense>
            <Suspense fallback={<p>Loading sponsors...</p>}>
              <SponsorsCarousel />
            </Suspense>
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
