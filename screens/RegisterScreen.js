import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Text, Image, withTheme } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../firebase';



const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [imageUrl, setimageUrl] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login",
        });
    }, [navigation]);

    const register = () => {
        auth .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: 
                    imageUrl ||
                    "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            })
        }).catch((error) => alert(error.message));
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />

            <Text h3 style={{ marginBottom: 50 }}>Create a Signal Account</Text>
            <View style={styles.inputContainer}>
                <Input placeholder="Full Name" autoFocus
                    type="text"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

                <Input placeholder="Email"
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <Input placeholder="Password"
                    type="password"
                    value={password}
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                />

                <Input placeholder="Profile Picture Url (Optional)"
                    type="text"
                    value={imageUrl}
                    onChangeText={(text) => setimageUrl(text)}
                    onSubmitEditing={register}
                />


            </View>
            <Button title="Register" raised containerStyle={styles.button} onPress={register} />

            <View style={{ height: 100 }} />

        </KeyboardAvoidingView>

    )
};

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",

    },
    button: {
        width: 200,
        marginTop: 10,
    },
    inputContainer: {
        width: 300
    },

});