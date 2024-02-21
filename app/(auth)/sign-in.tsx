import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';
import Button from '@/components/Button';
import Colors from '@/constants/Colors';

const SignInScreen = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: 'Sign in' }} />
      <View>
        <Text style={styles.inputText}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder='john@gmail.com'
        />
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder='john@gmail.com'
        />
        <Button text='Sign in' />
        <Link href={'/(auth)/sign-up'} asChild>
          <Text
            style={{
              alignSelf: 'center',
              color: Colors.light.tint,
              fontWeight: '600',
              fontSize: 14,
            }}
          >
            Create an account
          </Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  inputText: {
    color: 'gray',
    marginVertical: 5,
  },
});

export default SignInScreen;
