import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import OrderListItem from '@/components/OrderListItem';
import OrderItemListItem from '@/components/OrderItemListItem';
import { useOrderDetails } from '@/api/orders';

const OrderDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(
    typeof idString === 'string' ? idString : idString[0],
  );

  const { data: order, isLoading, error } = useOrderDetails(id);

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Failed to fetch.</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: 'Order #' + order?.id.toString() }}
      />
      <OrderListItem order={order} />
      <FlatList
        data={order.order_items}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => {
          return <OrderItemListItem item={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 20,
  },
});

export default OrderDetailsScreen;
