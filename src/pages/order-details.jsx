import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

const OrderDetails = () => {
    const {id} = useParams();
  return (
    <Layout>
        <h1>id: {id}</h1>
    </Layout>
  )
}

export default OrderDetails;
