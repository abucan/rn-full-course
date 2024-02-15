import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import products from '@/assets/data/products';
import Button from '@/components/Button';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

  const { addItem } = useCart();

  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    product && addItem(product, selectedSize);
    router.push('/cart');
  };

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image }} style={styles.image} />

      <Text>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((item, index) => {
          return (
            <Pressable
              style={[
                styles.size,
                item === selectedSize
                  ? { backgroundColor: 'gainsboro' }
                  : { backgroundColor: 'white' },
              ]}
              key={index}
              onPress={() => setSelectedSize(item)}
            >
              <Text
                style={[
                  styles.sizeText,
                  { color: selectedSize === item ? 'black' : 'gray' },
                ]}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button text='Add to cart' onPress={addToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    objectFit: 'contain',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    flex: 1,
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
  },
});

export default ProductDetailsScreen;
