import React, {useState, useEffect} from 'react';
import { View, Image } from 'react-native';
import styles from './style.js';
import Logo from '../assets/logo.png';
import MapView, {Marker, Callout} from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

export default function Home(){
    const[currentRegion, setCurrentRegion] = useState(null);
    useEffect(()=>{
        async function loadInitialPosition(){
            const {granted} = await requestPermissionsAsync();
            if(granted){
                const{coords} = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });
                const {latitute, longitude} = coords;

                setCurrentRegion({
                    latitute,
                    longitude,
                    latitudeDelta: 10.0,
                    longitudeDelta: 15.0,
                })
            }

        }
        loadInitialPosition();
    }, []);

    async function loadPersonPosition(){
        const{latitute, longitude} = currentRegion;                
    }

    function handleRegionChange(Region){
        setCurrentRegion(Region);
    }

    if(!currentRegion){
        return null;
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={Logo}></Image>
            </View>
            <MapView
                onRegionChangeComplete = {handleRegionChange}
                initialRegion = {currentRegion}
                style = {styles.map}
            >
            </MapView>
        </View>
    );
}