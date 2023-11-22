import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header></Header>
      <main style={{ minHeight: "75vh" }}>{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
