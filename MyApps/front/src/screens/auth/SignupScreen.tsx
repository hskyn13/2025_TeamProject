import React, { useRef } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '@/components/inputField';
import useForm from '@/hooks/useForm';
import CustomButton from '@/components/CustomButton';
import { validateSigngup } from '@/utils';
import { TextInput } from 'react-native-gesture-handler';
import useAuth from '@/hooks/queries/useAuth';


function SignupScreen() {

  const {signupMutation, loginMutation} = useAuth()
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  
  const signup = useForm({
    initialValue: {email: '', password: '', passwordConfirm: ''},
    validate: validateSigngup,

  });

  const handleSubmit = () => {
    const {email, password} = signup.values;

    signupMutation.mutate({email, password},
      {
        onSuccess: () => loginMutation.mutate({email, password}), 
    });

  };

  return (
   <SafeAreaView style = {styles.container}>
      <View style = {styles.inputContainer}>

        <InputField
          autoFocus
          placeholder="이메일"
          error={signup.errors.email}
          touched={signup.touched.email}
          inputMode="email"
          returnKeyType='next'
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          // value={values.email}
          // onChangeText={text => handleChangeText('email', text)}
          // onBlur={() => handleBlur('email')}
          {...signup.getTextInputProps('email')}
        />
        <InputField
          ref = {passwordRef}
          placeholder="비밀번호"
          error={signup.errors.password}
          touched={signup.touched.password}
          secureTextEntry
          returnKeyType='next'
          blurOnSubmit={false}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          // value={login.values.password}
          // onChangeText={text => handleChangeText('password', text)}
          // onBlur={() => handleBlur('password')}
          {...signup.getTextInputProps('password')}
        />

        <InputField
          ref = {passwordConfirmRef}
          placeholder="비밀번호 확인"
          error={signup.errors.passwordConfirm}
          touched={signup.touched.passwordConfirm}
          secureTextEntry
          returnKeyType='join'
          onSubmitEditing={handleSubmit}
          // value={values.email}
          // onChangeText={text => handleChangeText('email', text)}
          // onBlur={() => handleBlur('email')}
          {...signup.getTextInputProps('passwordConfirm')}
        />

      </View>
      <CustomButton
      label='회원가입' onPress = {handleSubmit}   
      />
    </SafeAreaView> 
  )
}

const styles = StyleSheet.create({

  container:{

    flex:1,
    margin:30
  },

  inputContainer:{

    gap: 20,
    marginBottom: 30,
  }

});

export default SignupScreen;