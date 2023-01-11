import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calcTotal } from "../features/cart/cartSlice";
import { openModal } from "../features/modal/modalSlice";
import CartItem from "./CartItem";

const CartContainer = () => {
  let { amount, cartItems, total, isLoading, error } = useSelector(
    (state) => state.cart
  );
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(calcTotal());
  }, [cartItems]);

  if (isLoading) {
    return (
      <div className="loading">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h3>{error}</h3>
      </div>
    );
  }

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cartItems?.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button
          className="btn clear-btn"
          onClick={() => {
            dispatch(openModal());
          }}
        >
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
