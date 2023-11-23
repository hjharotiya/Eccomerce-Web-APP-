import { useAuth } from "../components/context/auth";
import Layout from "../components/layout/Layout";

const Home = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <Layout title={"Best offers"}>
        <h1>Home is here</h1>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
      </Layout>
    </>
  );
};

export default Home;
