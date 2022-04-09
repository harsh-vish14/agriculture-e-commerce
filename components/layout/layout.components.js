const { default: Head } = require("next/head");
const { Fragment } = require("react");
const { default: Navbar } = require("../navbar/navbar.componets");

const Layout = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Layout</title>
      </Head>
      <Navbar />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
