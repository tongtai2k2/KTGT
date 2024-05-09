import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CheckBox from 'react-native-check-box';
import auth from '@react-native-firebase/auth';
import {KeyboardAvoidingView, Platform, Keyboard} from 'react-native';

const Login = ({navigation}) => {
  // const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [values, setValues] = useState({email: '', password: ''});
  const inputChange = (key, value) => {
    setValues(values => ({...values, [key]: value}));
  };
  const loginSubmit = () => {
    if (!values.email || !values.password) {
      Alert.alert(
        'All fields are required',
        'Please enter email and password to log in',
      );
      return;
    }
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        setValues({email: '', password: ''});
        navigation.navigate('Home');
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ecf5f9'}}>
      <View>
        <View style={myStyle.ViewLogo}>
          <ImageBackground
            source={require('../assets/Img/logo.png')}
            resizeMode="cover"
            style={myStyle.ImageBackground}></ImageBackground>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={myStyle.View}>
            <Text style={myStyle.Text}>Login</Text>
            <TextInput
              style={myStyle.TextInput}
              placeholder="E-mail"
              onChangeText={value => inputChange('email', value)}
              value={values.email}
            />
            <TextInput
              style={myStyle.TextInput}
              placeholder="Password"
              onChangeText={value => inputChange('password', value)}
              value={values.password}
              secureTextEntry={!isChecked}
            />
          </View>
          <View style={myStyle.rememberForgot}>
            <View style={myStyle.checkboxContainer}>
              <CheckBox
                isChecked={isChecked}
                onClick={() => setIsChecked(!isChecked)}
                style={myStyle.checkbox}></CheckBox>
              <Text style={myStyle.label}>Show password</Text>
            </View>
            <View style={{alignItems: 'flex-end', paddingRight: 20}}>
              <Text style={myStyle.Text1}>Forgot your password?</Text>
            </View>
          </View>
          <View style={{paddingLeft: 20, paddingRight: 20, padding: 10}}>
            <TouchableOpacity style={myStyle.TouchableOpacity}>
              <Text style={myStyle.TextLogin} onPress={loginSubmit}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={myStyle.Text2}>
              Don't have an account?{' '}
              <Text
                style={myStyle.Text1}
                onPress={() => navigation.navigate('Register')}>
                Create new account
              </Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const myStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  TextInput: {
    // fontFamily: 'Cochin',
    // fontSize: 20,
    // padding: 10,
    // backgroundColor: ,
    // borderRadius: 10,
    // marginVertical: 10,
    width: '100%',
    height: 50,
    padding: 10,
    fontSize: 20,
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 2,
    // borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingLeft: 20,
    marginVertical: 10,
    borderColor: '#e8e8e8',
  },
  TouchableOpacity: {
    // padding: 10,
    // backgroundColor: '#32e385',
    // marginVertical: 20,
    // borderRadius: 5,
    width: '100%',
    height: 50,
    backgroundColor: '#32e385',
    // color: '#333',
    fontSize: 18,
    fontWeight: '700',
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // Để tạo hiệu ứng shadow trên Android
    alignItems: 'center',
    justifyContent: 'center',
  },

  Button: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
    margin: 10,
  },
  TextLogin: {
    fontFamily: 'Cochin',
    color: Colors.white,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
  },

  Text1: {
    fontFamily: 'Cochin',
    fontSize: 15,
    color: 'black',
    fontWeight: '700',
    marginVertical: 10,
  },

  Text2: {
    fontFamily: 'Cochin',
    fontSize: 15,
    color: 'black',
    alignSelf: 'felx-start',
    fontWeight: '300',
    marginVertical: 10,
  },

  Text: {
    fontSize: 50,
    color: '#32e385',
    fontFamily: 'Cochin',
    marginVertical: 20,
    fontWeight: '700',
  },

  TextButton: {
    fontSize: 20,
    color: 'white',
  },

  Image: {
    width: 100,
    height: 100,
  },

  ImageBackground: {
    flex: 1,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  View: {
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  ViewLogo: {
    padding: 20,
    paddingTop: 150,
    alignItems: 'center',
  },
  rememberForgot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: -15,
    fontSize: 14.5,
    color: 'white',
  },
  // checkbox: {
  //   flexDirection: 'row',
  // },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingLeft: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
    fontSize: 15,
    fontWeight: '700',
  },
});

export default Login;
