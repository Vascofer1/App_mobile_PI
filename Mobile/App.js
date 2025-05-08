import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import EventsScreen from './screens/EventsScreen.js';
import DashboardScreen from './screens/DashboardScreen.js';
import ScannerScreen from './screens/ScannerScreen.js';
import NewEntry from './screens/NewEntry.js';
import ParticipantesScreen from './screens/ParticipantsScreen.js';
import ParticipantDetailsScreen from './screens/ParticipantDetailsScreen.js';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Events" component={EventsScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Scanner" component={ScannerScreen} />
        <Stack.Screen name="NovaInscricao" component={NewEntry} />
        <Stack.Screen name="Participants" component={ParticipantesScreen} />
        <Stack.Screen name="ParticipantDetails" component={ParticipantDetailsScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
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