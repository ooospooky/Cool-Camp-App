import { StyleSheet, Text, View, TextInput, Button, Alert,ScrollView ,KeyboardAvoidingView, TouchableWithoutFeedback,Keyboard,Platform} from 'react-native'
import { useForm, Controller } from "react-hook-form";
import React,{useState} from 'react'
import {Picker} from '@react-native-picker/picker';
import {db} from '../firebase-config'
import  {collection, getDocs,setDoc, getDoc, addDoc, updateDoc, deleteDoc, doc} from 'firebase/firestore';

// import RNPickerSelect from 'react-native-picker-select';
const CampEdit = ({route,navigation}) => {
  console.log('editpage Info',route.params.userInfo)

  let userInfo;
  let accessToken;

  if(route.params){
    if(route.params.userInfo){
      userInfo = route.params.userInfo;
      accessToken = route.params.accessToken;
    }
  }

  const campData = route.params.data
  const [selectedLocationTag, setSelectedLocationTag] = useState(campData.locationTag);  //useState() put in value will be default
  const [selectedAdvantageTag, setSelectedAdvantageTag] = useState(campData.advantageTag);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: campData.title,  //if here doesn't set value,when uesr come edit page and do notthnig and then press submit,even thought there are default value set in textinput,it will still consider there are no value
      description: campData.description,
      location: campData.location,
      notes:campData.notes,
      locationTag: campData.locationTag,
      advantageTag: campData.advantageTag
    }
  });
  const onSubmit = async(editdata) => {
    const campDoc = doc(db,'camp',route.params.data.id);
    await updateDoc(campDoc, editdata);

    let getData = await getDoc(doc(db,"camp",campData.id))
    navigation.navigate('Home',{data:editdata, userInfo:userInfo, accessToken:accessToken}); //Go HomeScreen for reload camp data
    navigation.navigate('CampDetail',{data:getData.data(), userInfo:userInfo, accessToken:accessToken}); //after reload data, go campShow to let user check what he/she update
  }
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}
  >
    <TouchableWithoutFeedback onPress={Platform.OS === "ios" ? Keyboard.dismiss : null}  >
      {/* keyboard.dissmiss : when you click outside keyboard, keyboard will dismiss */}
    <View style={styles.container}>
 

                    {/* 營地名稱 */}
      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
           defaultValue={campData.title}
            placeholder='營地名稱'
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
        name="title"
      />
      {errors.title && <Text>This is required.</Text>}

              {/* 營地描述 */}
      <Controller
        control={control}
        rules={{
         maxLength: 100,
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="營地描述"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            defaultValue={campData.description}
          />
        )}
        name="description"
      />
      {errors.description && <Text>This is required.</Text>}

      
        {/* 營地位置 */}
        <Controller
        control={control}
        rules={{
         maxLength: 100,
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="營地位置"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            defaultValue={campData.location}
          />
        )}
        name="location"
      />
      {errors.location && <Text>This is required.</Text>}



       {/* 營地須知 */}
       <Controller
        control={control}
        rules={{
         maxLength: 100,
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="營地須知"
            style={styles.textarea} 
            onBlur={onBlur}
            multiline={true}
            numberOfLines={10}
            onChangeText={onChange}
            defaultValue={campData.notes}
          />
        )}
        name="notes"
      />
      {errors.notes && <Text>This is required.</Text>}

          {/* 營地位置標籤 */}
      <Controller
        control={control}
        rules={{
         required: false,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Picker
          selectedValue={selectedLocationTag}
          itemStyle={{height:44}}
          style={{ height: 44, width: 250,}}
          onValueChange={(itemValue, itemIndex) =>{
            setSelectedLocationTag(itemValue)
             onChange(itemValue)}
          }
          
        >
          <Picker.Item  label="選擇露營地位置" value="" />
          <Picker.Item  label="北部" value="北部" />
          <Picker.Item label="南部" value="南部" />
          <Picker.Item label="東部" value="東部" />
          <Picker.Item label="中部" value="中部" />
        </Picker>   
        )}
        name="locationTag"
      />
            {/* 營地優勢標籤 */}
      <Controller
        control={control}
        rules={{
         required: false,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Picker
          selectedValue={selectedAdvantageTag}
          itemStyle={{height:44}}
          style={{ height: 44, width: 250,margin:13}}
          onValueChange={(itemValue, itemIndex) =>{
            setSelectedAdvantageTag(itemValue)
             onChange(itemValue)}
          }
          
        >
          <Picker.Item  label="選擇露營地優勢" value="" />
          <Picker.Item  label="景觀" value="景觀" />
          <Picker.Item label="湖畔" value="湖畔" />
          <Picker.Item label="小溪/河流" value="小溪/河流" />
          <Picker.Item label="登山步道" value="登山" />
        </Picker>   
        )}
        name="advantageTag"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default CampEdit
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker:{
    paddingRight:2,
  },
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   paddingTop: Constants.statusBarHeight,
  //   padding: 8,
  //   backgroundColor: '#0e101c',
  // },
  input: {
    backgroundColor: 'white',
    // border: '1px solid black',
    // borderColor: 'red',
    borderWidth:2,
    borderColor: 'black',
    width:200,
    height: 40,
    margin:10,
    padding: 10,
    borderRadius: 4,
  },
  textarea: {
    backgroundColor: 'white',
    // border: '1px solid black',
    // borderColor: 'red',
    borderWidth:2,
    borderColor: 'black',
    textAlignVertical: 'top',
    width:200,
    height: 200,
    margin:10,
    padding: 10,
    borderRadius: 4,
  }
})
