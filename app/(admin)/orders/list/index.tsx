import { Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import OrderListItem from '@/components/OrderListItem';
import { useAdminOrdersList } from '@/api/orders';
import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useInsertOrderListener } from '@/api/orders/subscription';

const OrdersScreen = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrdersList({ archived: false });

  useInsertOrderListener();

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
