import { Tables } from '@/database.types';
import { Link, useSegments } from 'expo-router';
import { Text, Image, StyleSheet, Pressable } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import RemoteImage from './RemoteImage';

type ProductListItemProps = {
  product: Tables<'products'>;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();
  const user = segments[0] === '(user)' ? '(user)' : '(admin)';

  const imgDefault =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png';

  return (
    <Link href={`/${user}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          path={product.image}
          style={styles.image}
          fallback={imgDefault}
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: '50%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
});
