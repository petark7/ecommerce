import ClientComponent from "./ClientComponent"; // Import the client-side component
import { fetchProducts } from "../../../firebase/utils";

// export async function generateStaticParams() {
//   const products = await fetch("https://fakestoreapi.com/products").then(
//     (res) => res.json()
//   );

//   return products.map((product) => ({
//     id: product.id.toString(),
//   }));
// }

const Page = async ({ params }) => {
  const { id } = params;

  // Fetch product data at runtime
  const products = await fetchProducts();

  // Find the product based on   the ID
  const product = products.find((product) => product.id.toString() === id);

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <section className="py-20 min-h-screen flex">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center">
        <img
          className="mb-8 lb:mb-0 pb-4 max-w-[200px] lg:max-w-sm lg:mr-20"
          src={product?.main_image}
          alt={product?.name}
        />
        {/* Render client-side component */}
        <ClientComponent product={product} />
      </div>
    </section>
  );
};

export default Page;
