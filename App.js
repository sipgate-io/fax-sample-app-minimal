/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {createFaxModule, sipgateIO} from 'sipgateio';
import {SafeAreaView, TextInput, Button, Alert, View} from 'react-native';
import {Picker} from '@react-native-community/picker';
import * as RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import {Buffer} from 'buffer';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [client, setClient] = useState(null);

  const [faxlines, setFaxlines] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [selectedFaxline, setSelectedFaxline] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const login = async () => {
    const client = sipgateIO({
      username,
      password,
    });

    await client.getAuthenticatedWebuserId();

    const faxModule = createFaxModule(client);
    const lines = await faxModule.getFaxlines();

    if (lines.length === 0) {
      Alert.alert('No Fax Lines found');
    } else {
      setFaxlines(lines);
      setSelectedFaxline(lines[0]);
    }

    setClient(client);
  };

  const sendFax = async () => {
    const file = await RNFS.readFile(selectedFile.uri, 'base64');
    const buffer = Buffer.from(file, 'base64');

    const fax = {
      to: recipient,
      fileContent: buffer,
      filename: selectFile.name,
      faxlineId: selectedFaxline.id,
    };

    try {
      const faxModule = createFaxModule(client);
      await faxModule.send(fax);
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  const selectFile = async () => {
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setSelectedFile(file);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Alert.alert('Error', err.message);
      }
    }
  };

  const renderLogin = () => {
    return (
      <View>
        <TextInput
          placeholder="E-Mail"
          value={username}
          onChangeText={setUsername}
          autoCompleteType="username"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCompleteType="password"
        />
        <Button
          title="Login"
          onPress={() => login().catch((e) => Alert.alert('Error', e.message))}
        />
      </View>
    );
  };

  const renderMain = () => {
    return (
      <View>
        <Picker
          selectedValue={selectedFaxline}
          onValueChange={setSelectedFaxline}>
          {faxlines.map((line) => (
            <Picker.Item key={line.id} label={line.alias} value={line.id} />
          ))}
        </Picker>
        <TextInput
          placeholder="Recipient"
          value={recipient}
          onChangeText={setRecipient}
        />
        <Button
          title={selectedFile?.name || 'Choose File...'}
          onPress={selectFile}
        />
        <Button
          title="Send"
          onPress={sendFax}
          disabled={!selectedFaxline || !recipient || !selectedFile}
        />
      </View>
    );
  };

  return (
    <SafeAreaView>
      {!client && renderLogin()}
      {client && renderMain()}
    </SafeAreaView>
  );
};

export default App;
