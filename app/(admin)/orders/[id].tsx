import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import OrderListItem from '@/components/OrderListItem';
import OrderItemListItem from '@/components/OrderItemListItem';
import { OrderStatusList } from '@/types';
import Colors from '@/constants/Colors';
import { useOrderDetails, useUpdateOrder } from '@/api/orders';

const OrderDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrderDetails(id);
  const { mutate: updateOrder } = useUpdateOrder();

  if (isLoading) return <ActivityIndicator />;

  if (error || !order) return <Text>Failed to fetch.</Text>;

  const updateStatus = (status: string) => {
    updateOrder({ id: id, updatedFields: { status } });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order # + ${id}` }} />
      <OrderListItem order={order} />
      <FlatList
        data={order.order_items}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => {
          return <OrderItemListItem item={item} />;
        }}
        ListFooterComponent={() => {
          return (
            <>
              <Text style={{ fontWeight: 'bold' }}>Status</Text>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                {OrderStatusList.map((status) => (
                  <Pressable
                    key={status}
                    onPress={() => updateStatus(status)}
                    style={{
                      borderColor: Colors.light.tint,
                      borderWidth: 1,
                      padding: 10,
                      borderRadius: 5,
                      marginVertical: 10,
                      backgroundColor:
                        order.status === status
                          ? Colors.light.tint
                          : 'transparent',
                    }}
                  >
                    <Text
                      style={{
                        color:
                          order.status === status ? 'white' : Colors.light.tint,
                      }}
                    >
                      {status}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </>
          );
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
