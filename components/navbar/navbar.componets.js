import Link from "next/link";
import { Badge } from "antd";
import { Button } from "antd";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineFavorite } from "react-icons/md";
import { signOut } from "next-auth/client";
import { useSession } from "next-auth/client";
import { useContext, useEffect } from "react";
// import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
// import "@szhsin/react-menu/dist/index.css";
import classes from "./navbar.module.scss";
import { getUserDetails } from "../../lib/gettingAndSetting";

import { userDetails } from "../../context/userDetailsContext";

const Navbar = () => {
  const userDetailsContext = useContext(userDetails);
  const [session, loading] = useSession();
  useEffect(() => {
    (async () => {
      if (!loading && session) {
        const result = await getUserDetails(session.user.userID);

        userDetailsContext.setLikesItems(result?.data?.likes || []);
        userDetailsContext.setCartsItems(result?.data?.carts || []);
      }
    })();
  }, [loading]);

  const logoutHandler = () => {
    signOut();
  };

  return (
    <div className={classes.navbar}>
      <div className={classes.navbar_logo}>
        <Link href="/">
          <a>
            <img src="/images/logo.jpg" height="80px" />
          </a>
        </Link>
      </div>
      <div className={classes.navbar_links}>
        <Link href="/">
          <a>
            <div>Home</div>
          </a>
        </Link>
        {session ? (
          <>
            <Link href="/favorite">
              <a>
                <div>
                  <Badge
                    count={userDetailsContext?.like?.length || 0}
                    overflowCount={99}
                  >
                    <MdOutlineFavorite fontSize={25} />
                  </Badge>
                </div>
              </a>
            </Link>
            <Link href="/cart">
              <a>
                <div>
                  <Badge
                    count={userDetailsContext?.carts?.length || 0}
                    overflowCount={99}
                  >
                    <AiOutlineShoppingCart fontSize={25} />
                  </Badge>
                </div>
              </a>
            </Link>
            <div className={classes.logoutPC} onClick={logoutHandler}>
              <Button danger>
                <div className={classes.logout}>Logout</div>
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className={classes.navlinksPc}>
              <Link href="/auth/login">Login/signIn</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
