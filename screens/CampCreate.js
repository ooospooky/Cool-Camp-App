import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
import { useForm, Controller } from "react-hook-form";

import { Picker } from '@react-native-picker/picker';
import { db } from '../firebase-config'
import { collection, setDoc, getDoc, addDoc, doc } from 'firebase/firestore';


const CampCreate = ({ navigation, route }) => {
  let userInfo;
  let accessToken;

  if (route.params) {
    if (route.params.userInfo) {
      userInfo = route.params.userInfo;
      accessToken = route.params.accessToken;
    }
  }
  const [selectedLocationTag, setSelectedLocationTag] = useState('');  //useState() put in value will be default
  const [selectedAdvantageTag, setSelectedAdvantageTag] = useState('');
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: '',  //if here doesn't set value,when uesr come edit page and do notthnig and then press submit,even thought there are default value set in textinput,it will still consider there are noe
      description: '',
      location: '',
      notes: '',
      locationTag: '',
      advantageTag: ''
    }
  });
  const onSubmit = async (createdata) => {
    const campCollectionRef = collection(db, 'camp')
    let campId = ''
    await addDoc(campCollectionRef, { ...createdata, "comment": [], "imageData": [], userId: route.params.userInfo.id })
      .then((e) => {
        campId = e.id
      })
    await setDoc(doc(db, 'camp', campId), { id: campId }, { merge: true })
    let getData = await getDoc(doc(db, "camp", campId))
    navigation.navigate('Home', { data: createdata, userInfo: userInfo, accessToken: accessToken }); //Go HomeScreen for reload camp data
    navigation.navigate('CampDetail', { data: getData.data(), userInfo: userInfo, accessToken: accessToken }); //after reload data, go campShow to let user check what he/she update

  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Platform.OS === "ios" ? Keyboard.dismiss : null}  >
          {/* keyboard.dissmiss : when you click outside keyboard, keyboard will dismiss */}
          <View style={styles.container}>

            {/* ???????????? */}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder='????????????'
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
              name="title"
            />
            {errors.title && <Text>This is required.</Text>}

            {/* ???????????? */}
            <Controller
              control={control}
              rules={{
                maxLength: 100,
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="????????????"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
              name="description"
            />
            {errors.description && <Text>This is required.</Text>}


            {/* ???????????? */}
            <Controller
              control={control}
              rules={{
                maxLength: 100,
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="????????????"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
              name="location"
            />
            {errors.location && <Text>This is required.</Text>}

            {/* ???????????? */}
            <Controller
              control={control}
              rules={{
                maxLength: 5000,
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="????????????"
                  style={styles.textarea}
                  onBlur={onBlur}
                  multiline={true}
                  numberOfLines={10}
                  onChangeText={onChange}
                />
              )}
              name="notes"
            />
            {errors.notes && <Text>This is required.</Text>}

            {/* ?????????????????? */}
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  selectedValue={selectedLocationTag}
                  itemStyle={{ height: 44 }}
                  style={{ height: 44, width: 250, }}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedLocationTag(itemValue)
                    onChange(itemValue)
                  }
                  }

                >
                  <Picker.Item label="?????????????????????" value="" />
                  <Picker.Item label="??????" value="??????" />
                  <Picker.Item label="??????" value="??????" />
                  <Picker.Item label="??????" value="??????" />
                  <Picker.Item label="??????" value="??????" />
                </Picker>
              )}
              name="locationTag"
            />
            {/* ?????????????????? */}
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  selectedValue={selectedAdvantageTag}
                  itemStyle={{ height: 44 }}
                  style={{ height: 44, width: 250, margin: 13 }}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedAdvantageTag(itemValue)
                    onChange(itemValue)
                  }
                  }

                >
                  <Picker.Item label="?????????????????????" value="" />
                  <Picker.Item label="??????" value="??????" />
                  <Picker.Item label="??????" value="??????" />
                  <Picker.Item label="??????/??????" value="??????/??????" />
                  <Picker.Item label="????????????" value="??????" />
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

export default CampCreate

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    paddingRight: 2,
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
  input: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    width: 200,
    height: 40,
    margin: 10,
    padding: 10,
    borderRadius: 4,
  },
  textarea: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    textAlignVertical: 'top',
    width: 200,
    height: 200,
    margin: 10,
    padding: 10,
    borderRadius: 4,
  }
})
