import { StyleSheet, Text, View,TouchableOpacity, Button,Image} from 'react-native'
import React,{useState,useEffect} from 'react'


import {signInWithGoogle} from '../firebase-config'

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession();

const Login = ({navigation,route}) => {
  // if(route.params) console.log('Login page',route.params.accessToken)
  const [accessToken, setAccessToken] = useState(route.params.accessToken);
  const [userInfo, setUserInfo] = useState(route.params.userInfo);
  // const [accessToken, setAccessToken] = useState();
  // const [userInfo, setUserInfo] = useState();
  let log = false;
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
    if(accessToken){
        getUserData()
      if (userInfo) {
        return (
          <View style={styles.userInfo}>
            <Image source={{uri: userInfo.picture}} style={styles.profilePic} />
            <Text style={{margin:10,fontSize:30}}>Welcome! {userInfo.name}</Text>
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
  // const RenderHomeButton = () =>{
  //   if(accessToken){
  //     return(
  //       <Button 
  //       title="Back Home Page"
  //       // onPress={()=>navigation.navigate('Home',{userInfo:userInfo,accessToken:accessToken})}
  //       onPress={()=>console.log(123)}
  //     />
  //     )
  //   }
  //   if(!accessToken){
  //     return(
  //     <Button 
  //       title="back home with no data"
  //       onPress={()=>navigation.navigate('Home',{userInfo:'',accessToken:''})}
  //     />
  //     )
  //   }
  // }
  return (
    <View style={styles.container}>
      {showUserInfo()}
      {/* <Button 
        title={accessToken ? "Get User Data" : "Login"}
        onPress={accessToken ? getUserData : () => { promptAsync({showInRecents: true}) }}
      />
      */}
     <Button 
        title={accessToken ? "Logout" : "Login"}
        onPress={accessToken ? ()=>{logout()} : () => { promptAsync({showInRecents: true}) }}
      />
     
      {/* <RenderHomeButton /> */}
      <Button 
        title={accessToken ? "Back Home Page" : "Back Home Page"}
        onPress={accessToken ?()=>navigation.navigate('Home',{userInfo:userInfo,accessToken:accessToken}):()=>{navigation.navigate('Home',{userInfo:'',accessToken:''})}}
      />
     {/* <Button 
        title="Back Home Page"
        onPress={()=>navigation.navigate('Home',{userInfo:userInfo,accessToken:accessToken})}
      />
      <Button 
        title={accessToken ? "try Logout home" : "Login"}
        onPress={()=>navigation.navigate('Home',{userInfo:'',accessToken:''})}
      /> */}
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
    width: 130,
    height: 130,
    top:-80
  }
})