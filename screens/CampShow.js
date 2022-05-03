import {Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useForm, Controller } from "react-hook-form";

const CampShow = ({route,navigation }) => {
  console.log('camp userInfo ',route.params.userInfo)
  let userInfo;
  let accessToken;

  if(route.params){
    if(route.params.userInfo){
      userInfo = route.params.userInfo;
      accessToken = route.params.accessToken;
    }
  }
  return (
    <View>
      <Text>CampShow:{route.params.data.title}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('CampEdit',{data:route.params.data, userInfo:userInfo, accessToken:accessToken})}
        >
          <Text>EditCamp</Text>
        </TouchableOpacity>

    </View>
  )
}

export default CampShow

const styles = StyleSheet.create({})