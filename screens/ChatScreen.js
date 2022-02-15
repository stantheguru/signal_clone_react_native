import { SafeAreaView, TextInput, ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, SnapshotViewIOSBase } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { AntDesign, SimpleLineIcons, FontAwesome, Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { Keyboard } from 'react-native';
import { db, auth } from '../firebase';
import * as firebase from 'firebase';





const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: true,
      headerTitleAlign: "Left",
      headerTitle: () => {
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            rounded
            source={{
              uri: messages[0]?.data.photoURL ||
              "http://assets.stickpng.com/thumbs/6002f8aa51c2ec00048c6c68.png",
            }} />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {route.params.chatName}
          </Text>
        </View>
      },
      headerLeft: () => {


        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <AntDesign name="arrowLeft" size={24} color="white" />
        </TouchableOpacity>
      },
      headerRight: () => {
        <View>
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity>
            <FontAwesome name="call" size={24} color="white" />
          </TouchableOpacity>

        </View>

      }
    })

  }, [navigation, messages]);
  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection('chats').doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setInput('');

  };

  useLayoutEffect(() => {
    const unsubscribe = db.collection('chats').doc(route.params.id).
      collection('messages').orderBy('timestamp', 'asc').onSnapshot((snapshot) => setMessages(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
      ));
    return unsubscribe;
  }, [route])

  return (
    <SafeAreaView style={{
      flex: 1, backgroundColor: "white"
    }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>


          <>
            <Text>{route.params.chatName}</Text>

            <ScrollView contentContainerStyle={{ paddingTop: 15}}>
              {messages.map(({ id, data }) => (
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.receiver}>
                    <Avatar

                      rounded
                      //WEB
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5
                      }}
                      position="absolute"
                      bottom={-15}
                      size={30}
                      source={{
                        uri: data.photoURL
                      }}
                    />
                    <Text style={styles.receiverText}>
                      {data.message}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.sender}>
                    <Avatar
                      rounded
                      //WEB
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5
                      }}
                      position="absolute"
                      bottom={-15}
                      size={30}
                      source={{
                        uri: data.photoURL
                      }} />

                    <Text style={styles.senderText}>
                      {data.message}
                    </Text>
                    <Text style={styles.senderName}>
                      {data.displayName}
                    </Text>


                  </View>

                )
              ))}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput style={styles.textInput} value={input}
                onSubmitEditing={sendMessage}
                onChangeText={(text) => setInput(text)} placeholder='Signal Message' />

              <TouchableOpacity onPress={sendMessage}
                activeOpacity={0.5}>

                <Ionicons name="send" size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 38,
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    margin: 15,
    maxWidth: "80%",
    position: "relative",
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  receiver: {
    padding: 15,
    backgroundColor: "#ECECEC",
    marginBottom: 20,
    marginRight: 15,
    maxWidth: "80%",
    position: "relative",
    borderRadius: 20,
    alignSelf: "flex-end",

  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  receiverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,

  }

});
