import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from "../firebase";

const HomeScreen = ({ navigation }) => {
    const [chats, setChats] = useState([]);
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        });
    };

    useEffect(() => {
        const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
            setChats(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                })
                )
            ));
        return unsubscribe;
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: '#fff' },
            headerTitleStyle: { color: "black" },
            headerTintColor: 'black',
            headerLeft: () => {
                <View style={{ margiLeft: 20 }}>

                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>

                        <Avatar rounded source={{
                            uri: auth?.currentUser?.photoUrl
                        }} />
                    </TouchableOpacity>

                </View>
            },
            headerRight: () => {
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 80,
                        marginRight: 20,
                    }}
                >
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} colors="black" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}>
                        <SimpleLineIcons name="pencil" size={24} colors="black" />
                    </TouchableOpacity>
                </View>
            }
        });
    }, [navigation]);

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {
                id,
                chatName,
        });
    };

    return (
        <SafeAreaView>
            <Button title="Logout" style={styles.button} onPress={signOutUser} />
            <Button title="New Chat" style={styles.button} onPress={() => navigation.navigate('AddChat')} />

            <ScrollView style={styles.container}>
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem
                        key={id}
                        id={id}
                        chatName={chatName}
                    enterChat={enterChat} />
                ))}

            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    button: {
        width: 200,
        marginTop: 10,
        color: '#000',
        backgroundColor: '#000'
    },
})
