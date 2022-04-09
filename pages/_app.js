import "antd/dist/antd.css";
import { Provider } from "next-auth/client";
import Layout from "../components/layout/layout.components";
// import "bootstrap/dist/css/bootstrap.min.css";
import { ProductsContextProvider } from "../context/productsContext";
import { UserDetailsContextProvider } from "../context/userDetailsContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <UserDetailsContextProvider>
        <ProductsContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ProductsContextProvider>
      </UserDetailsContextProvider>
    </Provider>
  );
}

export default MyApp;
