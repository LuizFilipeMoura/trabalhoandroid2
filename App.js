import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './pages/HomeScreen';
import RegistrarFunc from './pages/RegistrarFunc';
import AtualizarFunc from './pages/AtualizarFunc';
import VizualizarFuncPorID from './pages/VizualizarFuncPorID';
import VizualizarTodosFunc from './pages/VizualizarTodosFunc';
import DeletarFunc from './pages/DeletarFunc';
import Login from './pages/Login';
import SignUp from './pages/SingUp';
import { AppWrapper } from './pages/components/AppContext';
import Camera from './pages/components/Camera';

const Stack = createStackNavigator();

const App = () => (
  <AppWrapper>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{
            title: 'Camera', // Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', // Set Header color
            },
            headerTintColor: '#fff', // Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', // Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login', // Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', // Set Header color
            },
            headerTintColor: '#fff', // Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', // Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: 'SignUp', // Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', // Set Header color
            },
            headerTintColor: '#fff', // Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', // Set Header text style
            },
          }}
        />

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'CadFuncionário', // Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', // Set Header color
            },
            headerTintColor: '#fff', // Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', // Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="ViewFunc"
          component={VizualizarFuncPorID}
          options={{
            title: 'Vizualizar Funcionario Por ID', // Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', // Set Header color
            },
            headerTintColor: '#fff', // Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', // Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="ViewAllFunc"
          component={VizualizarTodosFunc}
          options={{
            title: 'Vizualizar Todos os Funcionarios', // Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', // Set Header color
            },
            headerTintColor: '#fff', // Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', // Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="UpdateFunc"
          component={AtualizarFunc}
          options={{
            title: 'Atualizar Funcionario', // Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', // Set Header color
            },
            headerTintColor: '#fff', // Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', // Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="RegisterFunc"
          component={RegistrarFunc}
          options={{
            title: 'Registrar Funcionario', // Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', // Set Header color
            },
            headerTintColor: '#fff', // Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', // Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="DeleteFunc"
          component={DeletarFunc}
          options={{
            title: 'Delete Funcionario', // Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', // Set Header color
            },
            headerTintColor: '#fff', // Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', // Set Header text style
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </AppWrapper>

);

export default App;
