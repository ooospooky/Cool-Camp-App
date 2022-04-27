import {Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useForm, Controller } from "react-hook-form";

const CampShow = ({route,navigation }) => {
  console.log(route.params.data)
  return (
    <View>
      <Text>CampShow:{route.params.data.title}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('CampEdit',{data:route.params.data})}
        >
          <Text>EditCamp</Text>
        </TouchableOpacity>

    </View>
  )
}

export default CampShow

const styles = StyleSheet.create({})