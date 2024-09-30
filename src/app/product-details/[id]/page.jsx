import ClientComponent from "./ClientComponent";
import { fetchProducts } from "../../../firebase/utils";

const Page = async ({ params }) => {
  const { id } = params;

  // Fetch product data at runtime
  const products = await fetchProducts();

  // Find the product based on the ID
  const product = products.find((product) => product.id.toString() === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <section className="py-20 min-h-screen flex">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center">
        <img
          className="mb-8 lg:mb-0 pb-4 max-w-[200px] lg:max-w-sm lg:mr-20"
          src={product?.main_image}
          alt={product?.name}
        />
        <ClientComponent product={product} />
      </div>
    </section>
  );
};

export default Page;
