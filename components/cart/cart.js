import { useContext, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { ProductsContext } from "../../context/productsContext";
import { userDetails } from "../../context/userDetailsContext";
import { MdPayment } from "react-icons/md";
import ProductCard from "../productCard/productCard.components";
import { Button } from "antd";
import classes from "./cart.module.scss";
import { removeAllItems } from "../../lib/gettingAndSetting";
import Link from "next/link";

const Cart = ({ session }) => {
  const productsContext = useContext(ProductsContext);
  const userDetailsContext = useContext(userDetails);
  const [amount, setAmount] = useState();
  useEffect(() => {
    let amount = 0;
    productsContext.products
      .filter((cartItem) => {
        return userDetailsContext.carts.includes(cartItem.id);
      })
      .map((cartItem) => {
        amount = amount + cartItem.price;
      });
    setAmount(amount);
  }, [userDetailsContext.carts]);
  const removeAllItemCart = () => {
    userDetailsContext.setCartsItems([]);
    const result = removeAllItems({
      userId: session.user.userID,
      operation: "cart",
    });
  };

  return (
    <>
      {session && (
        <>
          <div className={classes.userDetails}>
            <div className={classes.userName}>{session.user.name}</div>
            <div className={classes.userEmail}>{session.user.email}</div>
            <div className={classes.userAmount}>
              <NumberFormat
                value={amount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
              />
              <div>
                <Button
                  onClick={removeAllItemCart}
                  disabled={userDetailsContext.carts.length === 0}
                  danger
                >
                  Remove all items
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className={classes.cartItems}>
        {productsContext.products
          .filter((cartItem) => {
            return userDetailsContext.carts.includes(cartItem.id);
          })
          .map((CartItem) => {
            return (
              <ProductCard
                cardData={CartItem}
                key={CartItem.id}
                cartProducts="true"
              />
            );
          })}
      </div>
    </>
  );
};

export default Cart;
