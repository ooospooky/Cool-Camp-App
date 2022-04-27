import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'

import {signInWithGoogle} from '../firebase-config'
const Login = () => {
  
  return (
    <View>
      <Text>Login</Text>
      <TouchableOpacity
        onPress={() => signInWithGoogle()}
        >
          <Text>Login</Text>
        </TouchableOpacity>


    </View>
  )
}

export default Login

const styles = StyleSheet.create({})