import useAuth from '@/hooks/queries/useAuth';
import React from 'react';
import {StyleSheet, View, Text, SafeAreaView, Button} from 'react-native';



function FeedHomeScreen() {
  const {logoutMutation} = useAuth();
  const handleLogout = () => {

    logoutMutation.mutate(null);

  };

  return (
    <SafeAreaView>
      <Text>피드 화면면</Text>
      <Button title="로그아웃" onPress={handleLogout} />
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({});

export default FeedHomeScreen;