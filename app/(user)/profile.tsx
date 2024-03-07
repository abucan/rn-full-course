import { View, Text } from 'react-native';
import React from 'react';
import Button from '@/components/Button';
import { supabase } from '@/lib/supabase';

const ProfileScreen = () => {
  return (
    <View>
      <Button
        text='Sign Out'
        onPress={async () => await supabase.auth.signOut()}
      />
    </View>
  );
};

export default ProfileScreen;
