import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Order } from '@/types';
import dayjs from 'dayjs';
import { Link, useSegments } from 'expo-router';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

type OrderListItem = {
  order: Order;
};

const OrderListItem = ({ order }: OrderListItem) => {
  const segments = useSegments();
  const user = segments[0] === '(user)' ? '(user)' : '(admin)';
  const parsedDate = dayjs(order.created_at).fromNow();
  return (
    <Link href={`/${user}/orders/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.leftSide}>
          <Text style={styles.orderNumText}>Order #{order.id}</Text>
          <Text style={styles.dateText}>{parsedDate}</Text>
        </View>
        <Text style={styles.statusText}>{order.status}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  leftSide: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 2,
  },
  orderNumText: {
    fontWeight: '700',
    color: 'black',
    fontSize: 18,
  },
  dateText: {
    color: 'gray',
  },
  statusText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OrderListItem;
