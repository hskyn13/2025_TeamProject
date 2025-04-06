import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import InputField from '@/components/inputField';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/CustomButton';
import useForm from '@/hooks/useForm';
import { validateLogin } from '@/utils';
import useAuth from '@/hooks/queries/useAuth';

function LoginScreen() {
  const passwordRef = useRef<TextInput|null>(null);
  const {loginMutation} = useAuth();

  const login = useForm({
    
    initialValue: {    
      email: '',
      password: '',
 },
    validate: validateLogin

});

  console.log(login.getTextInputProps('email'));

  const handleSubmit = () => {

    loginMutation.mutate(login.values);
  };

  return (

    <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={login.errors.email}
          touched={login.touched.email}
          inputMode="email"
          blurOnSubmit = {false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          returnKeyType='next'
          // value={values.email}
          // onChangeText={text => handleChangeText('email', text)}
          // onBlur={() => handleBlur('email')}
          {...login.getTextInputProps('email')}
        />
        <InputField
          ref = {passwordRef}
          placeholder="비밀번호"
          error={login.errors.password}
          touched={login.touched.password}
          secureTextEntry
          onSubmitEditing= {handleSubmit}
          returnKeyType='join'
          // value={login.values.password}
          // onChangeText={text => handleChangeText('password', text)}
          // onBlur={() => handleBlur('password')}
          {...login.getTextInputProps('password')}
        />
        </View>

        <CustomButton
          label = '로그인'
          variant='filled'
          size='large'
          onPress={handleSubmit}

          />
    </SafeAreaView>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    margin: 30,
   
  },

  inputContainer:{

    gap: 20,
    marginBottom: 30,
  }
});

export default LoginScreen;
