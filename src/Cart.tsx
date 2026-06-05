import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "./redux/slices/cartSlice";

export default function Cart() {
    const dispatch = useDispatch();

    const cartItems = useSelector(
        (state: any) => state.cart.items
    );

    const total = cartItems.reduce(
        (sum: number, item: any) => sum + item.price,
        0
    );

    return (
        <div className="min-h-screen bg-[#ece8e1] p-12">

            <h1
                style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "3rem",
                    fontWeight: 200,
                }}
            >
                Collection Cart
            </h1>

            <div className="mt-12 space-y-6">
                {cartItems.map((item: any) => (
                    <div
                        key={item.id}
                        className="border border-black/10 p-6 flex justify-between"
                    >
                        <div>
                            <h2>{item.title}</h2>
                            <p>{item.size}</p>
                        </div>

                        <div>
                            <div>
                                ${item.price.toLocaleString()}
                            </div>

                            <button
                                onClick={() =>
                                    dispatch(removeFromCart(item.id))
                                }
                                className="mt-2 underline"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-xl">
                Total: ${total.toLocaleString()}
            </div>
        </div>
    );
}