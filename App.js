import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CampShow from './screens/CampShow';
import CampEdit from './screens/CampEdit';
import CampCreate from './screens/CampCreate';
import Login from './screens/Login';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen  name="Home" component={HomeScreen} />
      <Stack.Screen  name="CampDetail" component={CampShow} />
      <Stack.Screen  name="CampEdit" component={CampEdit} />
      <Stack.Screen  name="CampCreate" component={CampCreate} />
      <Stack.Screen  name="Login" component={Login} />
    </Stack.Navigator>
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
