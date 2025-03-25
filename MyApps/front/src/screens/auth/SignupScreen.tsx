import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '../../components/inputField';
import useForm from '../../hooks/useForm';
import CustomButton from '../../components/CustomButton';
import { validateSigngup } from '../../utils';


function SignupScreen() {

  const signup = useForm({
    initialValue: {email: '', password: '', passwordConfirm: ''},
    validate: validateSigngup

  });

  return (
   <SafeAreaView style = {styles.container}>
      <View style = {styles.inputContainer}>

        <InputField
          placeholder="이메일"
          error={signup.errors.email}
          touched={signup.touched.email}
          inputMode="email"
          // value={values.email}
          // onChangeText={text => handleChangeText('email', text)}
          // onBlur={() => handleBlur('email')}
          {...signup.getTextInputProps('email')}
        />
        <InputField
          placeholder="비밀번호"
          error={signup.errors.password}
          touched={signup.touched.password}
          secureTextEntry
          // value={login.values.password}
          // onChangeText={text => handleChangeText('password', text)}
          // onBlur={() => handleBlur('password')}
          {...signup.getTextInputProps('password')}
        />

        <InputField
          placeholder="비밀번호 확인"
          error={signup.errors.passwordConfirm}
          touched={signup.touched.passwordConfirm}
          secureTextEntry
          // value={values.email}
          // onChangeText={text => handleChangeText('email', text)}
          // onBlur={() => handleBlur('email')}
          {...signup.getTextInputProps('passwordConfirm')}
        />

      </View>
      <CustomButton
      label='회원가입'   
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