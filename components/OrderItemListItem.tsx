import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import { OrderItem } from '../types';

type OrderItemListItemProps = {
  item: OrderItem;
};

const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSide}>
        <Image
          source={{ uri: item.products.image || '' }}
          style={styles.image}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.orderNumText}>
            {item.products.name}
          </Text>
          <View style={styles.subTitleContainer}>
            <Text style={styles.priceText}>
              ${item.products.price.toFixed(2)}
            </Text>
            <Text style={styles.sizeText}>Size: {item.size}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.quantity}>{item.quantity}</Text>
    </View>
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
  image: {
    width: 75,
    aspectRatio: 1,
    objectFit: 'contain',
  },
  leftSide: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  orderNumText: {
    fontWeight: '700',
    color: 'black',
    fontSize: 18,
  },
  priceText: {
    color: Colors.light.tint,
    fontWeight: '700',
    fontSize: 16,
  },
  quantity: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  subTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  sizeText: {
    fontSize: 16,
  },
  titleContainer: {
    gap: 5,
  },
});
export default OrderItemListItem;
