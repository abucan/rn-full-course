import { View, Text, FlatList } from 'react-native';
import React from 'react';
import OrderListItem from '@/components/OrderListItem';
import orders from '@/assets/data/orders';

const OrdersScreen = () => {
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
