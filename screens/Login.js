import { StyleSheet, Text, View,TouchableOpacity, Button,Image} from 'react-native'
import React,{useState,useEffect} from 'react'

import {signInWithGoogle} from '../firebase-config'

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "531290340545-p8n9krb5iqeqhja8hmhvf1lu9o292ko7.apps.googleusercontent.com"
    ,useProxy: true
  });

  useEffect(()=>{
    if(response?.type === "success"){
      setAccessToken(response.authentication.accessToken)
    }
  },[response])

  async function getUserData(){
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}`}
    });
    userInfoResponse.json().then(data => {
      setUserInfo(data);
    });
  }
  function showUserInfo() {
    if(accessToken){
        getUserData()
      if (userInfo) {
        localStorage.setItem('name',userInfo.name)
        return (
          <View style={styles.userInfo}>
            <Image source={{uri: userInfo.picture}} style={styles.profilePic} />
            <Text>Welcome {userInfo.name}</Text>
            <Text>Welcome {userInfo.id}</Text>
            <Text>{userInfo.email}</Text>
          </View>
        );
      }
    }
  }
  function logout() {
    setUserInfo('')
    setAccessToken('')
  }
  return (
    <View>
      <Text>Login</Text>
      {showUserInfo()}
      {/* <Button 
        title={accessToken ? "Get User Data" : "Login"}
        onPress={accessToken ? getUserData : () => { promptAsync({showInRecents: true}) }}
      />
      */}
     <Button 
        title={accessToken ? "Logout" : "Login"}
        onPress={accessToken ? logout : () => { promptAsync({showInRecents: true}) }}
      />
     


      {/* <TouchableOpacity
        onPress={() => signInWithGoogle()}
        >
          <Text>Login</Text>
        </TouchableOpacity> */}


    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 50,
    height: 50
  }
})