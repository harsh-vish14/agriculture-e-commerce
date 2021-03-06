import { getSession } from "next-auth/client";
import Login from "../../components/auth/login.components.js";

const LoginPage = () => {
  return <Login />;
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default LoginPage;
