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
import {KeyboardAvoidingView, Platform} from 'react-native';

const Register = ({navigation}) => {
  // const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('');
  // const [name, setName] = useState('');
  // const [ComfirmPassword, setComfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const inputChange = (key, value) => {
    setValues(values => ({...values, [key]: value}));
  };
  const RegisterSubmit = () => {
    if (!values.email || !values.password || !values.confirmPassword) {
      Alert.alert('All fields are required');
      return;
    }
    if (values.password !== values.confirmPassword) {
      Alert.alert('Password and Confirm Password must be the same');
      return;
    }
    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(() => {
        Alert.alert('Success', 'Account created successfully');
        setValues({email: '', password: '', confirmPassword: ''});
        navigation.navigate('Login');
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
            <Text style={myStyle.Text}>Register</Text>

            <TextInput
              style={myStyle.TextInput}
              placeholder="Full Name"
              onChangeText={value => inputChange('name', value)}
              value={values.name}
            />
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
            <TextInput
              style={myStyle.TextInput}
              placeholder="Comfirm Password"
              onChangeText={value => inputChange('confirmPassword', value)}
              value={values.comfirmPassword}
              secureTextEntry={!isChecked}
            />
          </View>
          <View style={myStyle.checkboxContainer}>
            <CheckBox
              isChecked={isChecked}
              onClick={() => setIsChecked(!isChecked)}
              style={myStyle.checkbox}></CheckBox>
            <Text style={myStyle.label}>Show password</Text>
          </View>
          <View style={{paddingLeft: 20, paddingRight: 20, padding: 10}}>
            <TouchableOpacity
              style={myStyle.TouchableOpacity}
              onPress={RegisterSubmit}>
              <Text style={myStyle.TextLogin}>Create account</Text>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={myStyle.Text2}>
              You already have an account?{' '}
              <Text
                style={myStyle.Text1}
                onPress={() => navigation.navigate('Login')}>
                Login
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
    borderColor: '#e8e8e8',
    borderRadius: 10,
    paddingLeft: 20,
    marginVertical: 10,
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
    paddingTop: 100,
    alignItems: 'center',
  },
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

export default Register;
