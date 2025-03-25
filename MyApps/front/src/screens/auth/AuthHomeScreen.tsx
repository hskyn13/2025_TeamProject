import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthStackParamList } from '../../navigations/stack/AuthStackNavigator';
import { authNavigations } from '../../constants/navigations';
import CustomButton from '../../components/CustomButton';



type AuthHomeScreenProps = StackScreenProps<

  AuthStackParamList,
  typeof authNavigations.AUTH_HOME

>; 

function AuthHomeScreen({ navigation }: AuthHomeScreenProps) {
 

  console.log('✅ AuthHomeScreen 보여지는 중');


  return ( 

    <SafeAreaView style = {styles.container}>
      <View style = {styles.imageContainer}> 
        <Image
          resizeMode='contain'  
          style={styles.image} 
          source={require('../../assets/OIP.jpg')} />
      </View>

      <View style = {styles.buttonContainer}>

        <CustomButton 

          label="로그인 하기"
          variant='filled'
          onPress={() => navigation.navigate(authNavigations.LOGIN)}
        />
 
        <CustomButton 
          label="회원가입 하기"
          variant='outlined'
          onPress={() => navigation.navigate(authNavigations.SIGNUP)}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer:{
    flex: 1,
    gap : 10,
  },

  container:{
    flex: 1,
    margin: 30,
    alignItems: 'center',

  },
  imageContainer:{
    flex:3,
    width: Dimensions.get('screen').width/2

  },
  image:{
    width:'100%',
    height: '100%',
  }
});

export default AuthHomeScreen;
