import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useProduct } from '@/api/products';
import RemoteImage from '@/components/RemoteImage';

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const { data: product, error, isLoading } = useProduct(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  if (error) {
    return <Text>Failed to fetch the product.</Text>;
  }

  const imgDefault =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png';

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Menu',
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name='pencil'
                    size={25}
                    color={Colors.light.tint}
                    style={{
                      marginRight: 15,
                      opacity: pressed ? 0.5 : 1,
                    }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen options={{ title: product.name }} />
      <RemoteImage
        path={product.image}
        fallback={imgDefault}
        style={styles.image}
      />
      <Text style={styles.price}>${product.price}</Text>
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
});

export default ProductDetailsScreen;
