import { CartItem } from '@/types';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';
import { randomUUID } from 'expo-crypto';
import { Tables } from '@/database.types';
import { useInsertOrder } from '@/api/orders';
import { useRouter } from 'expo-router';
import { useInsertOrderItems } from '@/api/order_items';

type CartType = {
  items: CartItem[];
  addItem: (
    product: Tables<'products'>,
    size: CartItem['size'],
  ) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItem } = useInsertOrderItems();
  const router = useRouter();

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItems = items
      .map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: item.quantity + amount },
      )
      .filter((item) => item.quantity > 0);
    setItems(updatedItems);
  };

  const addItem = (
    product: Tables<'products'>,
    size: CartItem['size'],
  ) => {
    const existingItem = items.find(
      (item) => item.product === product && item.size === size,
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      product,
      product_id: product.id,
      size,
      quantity: 1,
      id: randomUUID(),
    };

    setItems([newCartItem, ...items]);
  };

  const total = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0,
  );

  const clearCart = () => {
    setItems([]);
  };

  const checkout = () => {
    insertOrder(
      {
        total,
      },
      {
        onSuccess: saveOrderItems,
      },
    );
  };

  const saveOrderItems = (data: Tables<'orders'>) => {
    // insertOrderItem({
    //   order_id: data.id,
    //   product_id:
    // })

    clearCart();
    router.push(`/(user)/orders/${data.id}`);
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
