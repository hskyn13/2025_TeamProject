import React from 'react';
import {Pressable, StyleSheet, Text, PressableProps, View, Dimensions} from 'react-native';
import {colors} from '../constants';

interface CustomButtonProps extends PressableProps{
    label: string;
    variant?: 'filled' | 'outlined';
    size?: 'large' | 'medium';
    inValid?: boolean;  

}

const deviceHeight = Dimensions.get('screen').height;

function CustomButton(
    {
        label,
        variant = 'filled',
        size = 'large',
        inValid = false,
        ...props //props 일일이 추가 없이 한번에 넘겨주기
         
        
    }: CustomButtonProps) {
  return (
    <Pressable 
        disabled={inValid}
        style = {({pressed})=>
            
            [styles.container,
             
             pressed ? styles[`${variant}Pressed`]: styles[variant], 
             inValid && styles.inValid

            ]}
            {...props}>
        <View style ={styles[size]}>   
            <Text 
            style={[
                styles.text,
                styles[`${variant}Text`]]}>{label}</Text>

        </View> 
    </Pressable> 
  ) 
}

const styles = StyleSheet.create({


    filledPressed:{
        backgroundColor: colors.Orange_400,

    },

    outlinedPressed:{
        backgroundColor: colors.Orange_400,
        borderWidth: 1,
        opacity: 0.5,

    },
    inValid:{
        opacity: 0.5,

    },

    container:{
        borderRadius: 3,
        justifyContent: 'center',
        flexDirection: 'row',

    },

    filled: {

        backgroundColor: colors.Orange_600,
    },

    outlined: {

        borderColor: colors.Orange_600,
        borderWidth: 1,

    },

    large:{

        width: '100%', 
        paddingVertical: 15,
        alignItems:'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    medium:{

        width: '50%',
        paddingVertical: 12,
        alignItems:'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    text:{

        fontSize: 16,
        fontWeight: "700",

    },

    filledText:{

        color: 'white',

    },

    outlinedText:{

        color: '#D35400'
    }

});

export default CustomButton;