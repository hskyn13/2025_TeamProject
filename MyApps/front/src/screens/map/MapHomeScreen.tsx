import React, { useEffect, useRef, useState } from 'react';
import {SafeAreaView ,StyleSheet, Text, Button, Pressable, View } from 'react-native';
import useAuth from '@/hooks/queries/useAuth';
import MapView, {LatLng, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import { colors } from '@/constants';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import useUserLocation from '@/hooks/useUserLocation';


type Navigation =  CompositeNavigationProp<StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>>


function MapHomeScreen() {
  const {logoutMutation} = useAuth();
  const navigation = useNavigation<Navigation>();
  const mapRef = useRef<MapView | null>(null);
  const {userLocation, isUserLocationError} = useUserLocation();

  const handleLogout = () => {

    logoutMutation.mutate(null);

  };

  const handlePressUserLocation = () => {
    
    if (isUserLocationError) {
      // 에러메세지를 표시하기
      return;
  }

  mapRef.current?.animateToRegion({
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
};

  return (
    
      <>
      <MapView style = {styles.container} provider = {PROVIDER_GOOGLE} ref = {mapRef}
        showsUserLocation followsUserLocation showsMyLocationButton = {false} 
  
        />
        <Pressable style = {styles.drawerButton} onPress={() => navigation.openDrawer()}>

          <Text>서랍</Text>
        </Pressable>

        <View style = {styles.buttonList}>
          <Pressable style = {styles.mapButton} onPress={handlePressUserLocation}>
            <Text>내 위치</Text>
          </Pressable>
        </View>
      </> 
  );
} 

const styles = StyleSheet.create({

  container: {

    flex: 1,
  },

  drawerButton: {

    position: 'absolute',
    left: 0,
    top: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.Orange_600,
    shadowColor: colors.BLACK,
    shadowOffset:{width:1, height:1},
    elevation: 2,
    borderRadius: 30,
  },

  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 15,

  },

  mapButton: {
    backgroundColor: colors.Orange_600,
    marginVertical: 5,
    height: 48,
    width: 48,
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset:{width:1, height:2},
    elevation: 2,


  },



});

export default MapHomeScreen;