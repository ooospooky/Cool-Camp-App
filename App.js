import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CampShow from './screens/CampShow';
import CampEdit from './screens/CampEdit';
import CampCreate from './screens/CampCreate';
import Login from './screens/Login';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import CampDelete from './screens/CampDelete';
import CommentList from './screens/CommentList';


const Stack = createNativeStackNavigator();

export default function App() {
  console.disableYellowBox = true;  //Just for demo
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
      <ApplicationProvider {...eva} theme={eva.light}>
    <Stack.Navigator >
      <Stack.Screen  name="Home" component={HomeScreen} options={{
        title:"Cool Camp",
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        }} />
      <Stack.Screen  name="CampDetail" component={CampShow} options={{
        headerShown: false,
          }}/>
      <Stack.Screen  name="CampEdit" component={CampEdit} options={{
        title:"修改露營地資訊"  }} />
      <Stack.Screen  name="CampDelete" component={CampDelete} options={{
        title:"刪除露營地"  }} />
      <Stack.Screen  name="CampCreate" component={CampCreate} options={{
         title:"建立露營地"
      }} />
      <Stack.Screen  name="會員中心" component={Login} options={{
            gestureEnabled: false,
            headerShown: true,
            headerLeft: () => <></>,
          }}/>
      <Stack.Screen  name="CommentList" component={CommentList} options={{
        title:"留言區"  }} />
    </Stack.Navigator>
    </ApplicationProvider>
  </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
