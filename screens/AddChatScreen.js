import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { Input } from 'react-native-elements/dist/input/Input';
import { Icon } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { db } from '../firebase';

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add a New Chat',
            headerBackTitle: 'Chats',

        });

    }, [navigation])

    const createChat = async () => {
        await db.collection("chats")
        .add({
            chatName: input,
        })
        .then(() => {
            navigation.goBack();
        })
        .catch((error) => alert(error));
    }
    return (
        <View style={styles.container}>
            <Input
                placeholder='Enter a chat name'
                value={input}
                onChangeText={(text) => setInput(text)}
                leftIcon={
                    <Icon name="wechat" type="antdesign" 
                    size={24} color="black"/>
                }
                onSubmitEditing={createChat}
            />
            <Button onPress={createChat} 
            title='CreateNew Chat' color="black"
            />
        </View>
    );
};

export default AddChatScreen;

const styles = StyleSheet.create({
    container :{
        backgroundColor: "#f6f6f6",
        padding: 30,
        height: '100%'
    }
});
