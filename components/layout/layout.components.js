const { default: Head } = require("next/head");
const { Fragment } = require("react");
const { default: Navbar } = require("../navbar/navbar.componets");

const Layout = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Agriculture-e-commerce</title>
        <link rel="icon" type="image/svg" href="/images/favicon.png" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta
          name="description"
          content="A E-Commerce where u get every thing to your doorsteps"
        ></meta>
      </Head>
      <Navbar />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
