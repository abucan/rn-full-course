import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const OrdersLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{ headerTitle: 'Orders' }}
      />
    </Stack>
  );
};

export default OrdersLayout;
