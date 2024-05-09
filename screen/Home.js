import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Home = () => {
  const [inputText, setInputText] = useState('');
  const [data, setData] = useState([]);

  const handleAddItem = () => {
    if (inputText.trim() !== '') {
      setData(prevData => [...prevData, inputText]);
      setInputText('');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f1f5f7'}}>
      <View style={myStyle.View}>
        <Text style={myStyle.Text}>Home</Text>
      </View>
      <View style={myStyle.inputView}>
        <TextInput
          style={myStyle.input}
          placeholder="Enter text"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={myStyle.add} onPress={handleAddItem}>
          <Text style={myStyle.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={myStyle.ViewItem}>
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <View style={myStyle.item}>
              <Text style={myStyle.TextIndex}>
                {index + 0}. <Text style={myStyle.TextItem}>{item}</Text>
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const myStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  inputView: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 20,
  },

  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    fontSize: 18,
    marginRight: -5,
  },
  add: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '23%',
    height: 50,
    backgroundColor: '#32e385',
    fontWeight: '700',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Cochin',
    color: Colors.white,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '700',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  ViewItem: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ccc',
    margin: 20,
    marginTop: -20,
  },
  TextIndex: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Cochin',
    marginVertical: 5,
    fontWeight: '700',
  },
  TextItem: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Cochin',
    marginVertical: 5,
    fontWeight: '400',
  },
  View: {
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  Text: {
    fontSize: 40,
    color: '#32e385',
    fontFamily: 'Cochin',
    marginVertical: 5,
    fontWeight: '700',
  },
});

export default Home;
