import React, { useRef } from 'react';
import {StyleSheet, View, TextInput, TextInputProps, Text, Pressable} from 'react-native';

import { colors } from '../constants';

interface inputFieldProps extends TextInputProps{
    disabled? : boolean;
    error? : string;
    touched? : boolean;
}

function inputField({disabled = false,error,touched,...props}: inputFieldProps) {
    const innerRef = useRef<TextInput | null>(null);
    const handlePressInput = () =>{
        innerRef.current?.focus()

    }
  return (

    <Pressable onPress={handlePressInput}>
        <View style = {[
            styles.container, 
            disabled && styles.disabled,
            touched && Boolean(error) && styles.inputError
            
            ]}>
            <TextInput 
                ref={innerRef}
                editable = {!disabled}
                placeholderTextColor={ colors.GRAY_500 } 
                style = {[styles.input, disabled && styles.disabled]}
                autoCapitalize='none'
                spellCheck={false}
                autoCorrect = {false} 
                {...props}/>

        {touched && Boolean(error) && <Text style={styles.error}>{error}</Text>}
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({

    container : {
        borderWidth : 1,
        borderColor : colors.GRAY_200,
        padding : 15,

    },

    input:{ 
        fontSize:16,
        color: colors.BLACK,
        padding : 0,

    },

    disabled:{

         backgroundColor: colors.GRAY_200,
         color: colors.GRAY_700,
 
    },

    inputError:{

        borderWidth:1,
        borderColor: colors.RED_300,
    },

    error:{

        color: colors.RED_500,
        fontSize: 12,
        paddingTop: 5,

    }

});

export default inputField;