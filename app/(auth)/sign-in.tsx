import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, Stack } from 'expo-router';
import Button from '@/components/Button';
import Colors from '@/constants/Colors';
import { supabase } from '@/lib/supabase';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: 'Sign in' }} />
      <View>
        <Text style={styles.inputText}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder='john@gmail.com'
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder='john@gmail.com'
          value={password}
          onChangeText={setPassword}
        />
        <Button
          text={loading ? 'Signing in...' : 'Sign in'}
          onPress={signInWithEmail}
          disabled={loading}
        />
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
