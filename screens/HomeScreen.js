import { StyleSheet, Text, View,Style,TouchableOpacity } from 'react-native'
import React,{useEffect,useState} from 'react'
import { MMKV } from 'react-native-mmkv'

import {db} from '../firebase-config'
import  {collection, getDocs,setDoc, getDoc, addDoc, updateDoc, deleteDoc, doc} from 'firebase/firestore';
const storage = new MMKV()
const HomeScreen = ({ navigation,route}) => {
  if(route.params)console.log('route',route.params.data);
  const [campData,setCampData]  = useState([])
  useEffect(async()=>{
    const campCollectionRef = collection(db,'camp')
    const data = await getDocs(campCollectionRef);
    const response =  data.docs.map((doc)=> ({...doc.data(),id:doc.id}));
    setCampData(response)
  },[route])    //[route] to check if data change,if true it will rerender list

  storage.set('user.name', 'Marc')
  return (
    <View style={styles.container}>

      {/* Login page */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        >
          <Text style={{color:'red'}}>Login</Text>
      </TouchableOpacity>
    <Text>123</Text>
   
      {/* List camp */}
      {campData.map((data)=>{
        return (
          <View key={data.id}>
            <TouchableOpacity onPress={() => navigation.navigate('CampDetail',{data:data})}>
               <Text>{data.title}</Text>  
            </TouchableOpacity>
         </View>
        )
      })}

      {/* Create Camp */}
       <TouchableOpacity
        onPress={() => navigation.navigate('CampCreate')}
        >
          <Text>CreateCamp</Text>
        </TouchableOpacity>

    </View>
  )
}
// const styles = StyleSheet.create({})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
export default HomeScreen

