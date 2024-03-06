import { Text, FlatList, ActivityIndicator } from 'react-native';
import React from 'react';
import OrderListItem from '@/components/OrderListItem';
import { useMyOrdersList } from '@/api/orders';

const OrdersScreen = () => {
  const { data: orders, isLoading, error } = useMyOrdersList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products.</Text>;
  }
  return (
    <FlatList
      data={orders}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      renderItem={({ item }) => {
        return <OrderListItem order={item} />;
      }}
    />
  );
};

export default OrdersScreen;
