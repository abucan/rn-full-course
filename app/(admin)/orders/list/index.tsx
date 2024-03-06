import { Text, FlatList, ActivityIndicator } from 'react-native';
import React from 'react';
import OrderListItem from '@/components/OrderListItem';
import { useAdminOrdersList } from '@/api/orders';

const OrdersScreen = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrdersList({ archived: false });

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
