import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import Button from '@/components/Button';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';
import { useProduct } from '@/api/products';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const { data: product, error, isLoading } = useProduct(id);

  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

  const { addItem } = useCart();

  const addToCart = () => {
    product && addItem(product, selectedSize);
    router.push('/cart');
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  if (error) {
    return <Text>Failed to fetch the product.</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{
          uri:
            product.image ||
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png',
        }}
        style={styles.image}
      />

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
