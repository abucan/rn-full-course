import ProductListItem from '@/components/ProductListItem';
import products from '@/assets/data/products';
import { FlatList } from 'react-native';

export default function MenuScreen() {
  return (
    <FlatList
      data={products}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
      renderItem={({ item }) => {
        return <ProductListItem product={item} />;
      }}
    />
  );
}
