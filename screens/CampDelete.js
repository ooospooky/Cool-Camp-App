import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import { db } from '../firebase-config'
import { deleteDoc, doc } from 'firebase/firestore';


const CampDelete = ({ route, navigation }) => {
  let userInfo;
  let accessToken;

  if (route.params) {
    if (route.params.userInfo) {
      userInfo = route.params.userInfo;
      accessToken = route.params.accessToken;
    }
  }
  const deleteCamp = async () => {
    const campDoc = doc(db, "camp", route.params.data.id);
    await deleteDoc(campDoc);
    navigation.navigate('Home', { data: route.params.data, userInfo: userInfo, accessToken: accessToken }); //Go HomeScreen for reload camp data

  }
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, paddingBottom: 5 }}>確定要刪除</Text>
      <Text style={{ fontSize: 20 }}>"{route.params.data.title}" 嗎</Text>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={styles.redBtn} onPress={() => deleteCamp()}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>刪除</Text>
          {/* 刪除 */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.greyBtn} onPress={navigation.goBack}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>取消</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CampDelete

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redBtn: {
    height: 55,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: "red",
    marginHorizontal: 20,
    borderRadius: 10
  },
  greyBtn: {
    height: 55,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: "grey",
    marginHorizontal: 20,
    borderRadius: 10
  },
})