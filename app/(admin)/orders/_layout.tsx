import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const OrdersLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='list' options={{ headerShown: false }} />
    </Stack>
  );
};

export default OrdersLayout;
