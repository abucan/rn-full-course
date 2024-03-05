import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, Stack } from 'expo-router';
import Button from '@/components/Button';
import Colors from '@/constants/Colors';
import { supabase } from '@/lib/supabase';
import { isLoading } from 'expo-font';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: 'Sign up' }} />
      <View>
        <Text style={styles.inputText}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder='john@gmail.com'
        />
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder='john@gmail.com'
        />
        <Button
          text={loading ? 'Creating a account...' : 'Create account'}
          onPress={signUpWithEmail}
          disabled={loading}
        />
        <Link href={'/(auth)/sign-in'} asChild>
          <Text
            style={{
              alignSelf: 'center',
              color: Colors.light.tint,
              fontWeight: '600',
              fontSize: 14,
            }}
          >
            Sign in
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

export default SignUpScreen;
