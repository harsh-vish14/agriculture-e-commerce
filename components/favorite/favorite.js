import ProductCard from "../productCard/productCard.components";
import { Button } from "antd";
import classes from "./favorite.module.scss";
import { removeAllItems } from "../../lib/gettingAndSetting";
import { useSession } from "next-auth/client";
import { useContext } from "react";
import { userDetails } from "../../context/userDetailsContext";

const Favorite = ({ favorites }) => {
  const [session, loading] = useSession();
  const userDetailsContext = useContext(userDetails);
  const removeAllFavorites = async () => {
    userDetailsContext.setLikesItems([]);
    const result = await removeAllItems({
      userId: session.user.userID,
      operation: "like",
    });
  };
  return (
    <>
      <div style={{ marginLeft: "20px" }}>
        <Button
          onClick={removeAllFavorites}
          disabled={userDetailsContext.like.length === 0}
          danger
        >
          Remove all items
        </Button>
      </div>
      <div className={classes.Favorite}>
        {favorites.map((f) => {
          return <ProductCard cardData={f} key={f.id} />;
        })}
      </div>
    </>
  );
};

export default Favorite;
