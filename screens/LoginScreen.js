import React, {useState} from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Image, withTheme } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [passowrd, setPassword] = useState("")
    const signIn =()=>{

    }
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
             <StatusBar style="light"/>
            <Image 
            source={{
            uri: "http://assets.stickpng.com/thumbs/6002f8aa51c2ec00048c6c68.png",}}
            style={{width:200, height:200}}
            />

            <View style={styles.inputContainer}>
                <Input placeholder="Email" autoFocus 
                type="email" 
                value={email}
                onChangeText={(text) =>setEmail(text)}
                />
                <Input placeholder="Password" secureTextEntry type="password"
                value={passowrd}
                onChangeText={(text) =>setPassword(text)}
                />

            </View>

            <Button title="Login"  containerStyle={styles.button} onPress={signIn} />
            <Button onPress={() => navigation.navigate('Register')} title="Register" type="outline" containerStyle={styles.button}/>
            <View style={{height: 100}}/>
            
        </KeyboardAvoidingView>
        
    )
};

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding:10,
        backgroundColor: "white",


    },
    inputContainer: {
        width:300,
    },
    button: {
        width:200,
        marginTop:10
    },
    

    
});
