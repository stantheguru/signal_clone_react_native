import React, {useLayoutEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from "../firebase"; 

const HomeScreen = ({navigation}) => {
    const signOutUser = () =>{
auth.signOut().then(() =>{
    navigation.replace("Login");
});
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: '#fff'},
            headerTitleStyle: { color: "black" },
            headerTintColor: 'black',
            headerLeft: () =>{
                <View style={{ margiLeft: 20}}>
                    
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                        
                    <Avatar rounded source={{
                        uri: auth?.currentUser?.photoUrl
                    }}/>
                    </TouchableOpacity>
                   
                </View>
            },
            headerRight: () =>{
                <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}
                >
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} colors="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}>
                        <SimpleLineIcons name="pencil" size={24} colors="black"/>
                    </TouchableOpacity>
                </View>
            } 
        });
    }, [])

    return (
        <SafeAreaView>
             <Button title="Logout" onPress={signOutUser}/>
            <ScrollView>
                <CustomListItem/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
