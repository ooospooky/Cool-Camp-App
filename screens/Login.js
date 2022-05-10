import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

import Icon from 'react-native-vector-icons/AntDesign';

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation, route }) => {
  const [accessToken, setAccessToken] = useState(route.params.accessToken);
  const [userInfo, setUserInfo] = useState(route.params.userInfo);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "531290340545-p8n9krb5iqeqhja8hmhvf1lu9o292ko7.apps.googleusercontent.com",
    iosClientId:"531290340545-f1l2kl7vcmsg9p3bh89pdihrme3ph183.apps.googleusercontent.com"
    , useProxy: true
  });

  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken)
    }

  }, [response])

  async function getUserData() {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    userInfoResponse.json().then(data => {
      setUserInfo(data);
    });

  }
  // userInfo:
  // Object {
  //   "email": "bm414148@gmail.com",
  //   "family_name": "戴",
  //   "given_name": "梓育",
  //   "id": "114821509260256156621",
  //   "locale": "zh-TW",
  //   "name": "戴梓育",
  //   "picture": "https://lh3.googleusercontent.com/a-/AOh14GjAsH0iUufyLRWc5-u6lWW8goMQwC445hiVDIwUrQ=s96-c",
  //   "verified_email": true,
  // }
  function showUserInfo() {
    if (accessToken) {
      getUserData()
      if (userInfo) {
        return (
          <View style={styles.userInfo}>
            <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
            <Text style={{ margin: 10, fontSize: 30 }}>Welcome! {userInfo.name}</Text>
            <Text>Email: {userInfo.email}</Text>
          </View>
        );
      }
    }
  }
  function logout() {
    setUserInfo({});
    setAccessToken('');
  }

  return (
    <View style={styles.container}>
      {showUserInfo()}
      <TouchableOpacity
        onPress={accessToken ? () => { logout() } : () => { promptAsync({ showInRecents: true }) }}>
        <View style={styles.googleBtn}  >
          {accessToken ?
            <Text style={{ color: '#fff', fontWeight: "bold" }}> <Icon name="google" size={20} /><Text style={{ fontSize: 20 }} >  登出</Text> </Text>
            : <Text style={{ color: '#fff', fontWeight: "bold" }}> <Icon name="google" size={20} /><Text style={{ fontSize: 20 }} >  登入</Text> </Text>}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.Btn}
        onPress={accessToken ? () => navigation.navigate('Home', { userInfo: userInfo, accessToken: accessToken }) : () => { navigation.navigate('Home', { userInfo: '', accessToken: '' }) }}
      >
        <Text style={{ fontSize: 20, color: '#fff' }}><Icon name="home" size={20} /> 回到主頁面 </Text>
      </TouchableOpacity>
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
    width: 130,
    height: 130,
    top: -50
  },
  googleBtn: {
    padding: 15,
    paddingHorizontal: 35,
    backgroundColor: 'red',
    borderRadius: 10,
    marginTop: 20,
  },
  Btn: {
    height: 55,
    width: '40%',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#52c0b4',
    marginHorizontal: 20,
    borderRadius: 10,
    margin: 10
  },
})