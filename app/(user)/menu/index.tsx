import ProductListItem from '@/components/ProductListItem';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import { useProductList } from '@/api/products';

export default function MenuScreen() {
  const { error, data: products, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch the products.</Text>;
  }

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
