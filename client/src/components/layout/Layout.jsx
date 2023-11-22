import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header></Header>
      <main style={{ minHeight: "75vh" }}>{children}</main>
      <Footer></Footer>
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app -shop now",
  description: "mern stack developer",
  keywords: "mern,react,ecommerce,node,mongodb",
  author: "harshit",
};

export default Layout;
