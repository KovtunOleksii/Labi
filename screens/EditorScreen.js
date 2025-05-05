import React, { useState } from 'react';
import { View, TextInput, Alert, BackHandler, StyleSheet, Platform, Modal, Button, Text } from 'react-native';
import RNFS from 'react-native-fs';
import MenuBar from '../components/MenuBar';

export default function EditorScreen() {
  const [text, setText] = useState('');
  const [currentFilePath, setCurrentFilePath] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputFolderPath, setInputFolderPath] = useState('');
  const [inputFileName, setInputFileName] = useState('');
  const [modalAction, setModalAction] = useState(null); // 'open' or 'saveAs'

  const handleNew = () => {
    if (text.length > 0) {
      Alert.alert('Новий файл', 'Ви впевнені, що хочете створити новий файл? Незбережені зміни будуть втрачені.', [
        { text: 'Скасувати', style: 'cancel' },
        { 
          text: 'Так', 
          onPress: () => {
            setText('');
            setCurrentFilePath(null);
          }
        },
      ]);
    } else {
      setText('');
      setCurrentFilePath(null);
    }
  };

  const handleOpen = () => {
    if (text.length > 0 && !currentFilePath) {
      Alert.alert('Відкрити файл', 'Ви впевнені, що хочете відкрити інший файл? Незбережені зміни будуть втрачені.', [
        { text: 'Скасувати', style: 'cancel' },
        { 
          text: 'Так', 
          onPress: () => {
            setModalAction('open');
            setInputFolderPath(Platform.OS === 'android' ? RNFS.DownloadDirectoryPath : RNFS.DocumentDirectoryPath);
            setInputFileName('');
            setModalVisible(true);
          }
        },
      ]);
    } else {
      setModalAction('open');
      setInputFolderPath(Platform.OS === 'android' ? RNFS.DownloadDirectoryPath : RNFS.DocumentDirectoryPath);
      setInputFileName('');
      setModalVisible(true);
    }
  };

  const handleSave = async () => {
    if (!currentFilePath) {
      handleSaveAs();
      return;
    }

    try {
      await RNFS.writeFile(currentFilePath, text, 'utf8');
      Alert.alert('Успіх', 'Файл збережено');
    } catch (e) {
      Alert.alert('Помилка', 'Не вдалося зберегти файл');
    }
  };

  const handleSaveAs = () => {
    setModalAction('saveAs');
    setInputFolderPath(Platform.OS === 'android' ? RNFS.DownloadDirectoryPath : RNFS.DocumentDirectoryPath);
    setInputFileName(currentFilePath ? currentFilePath.split('/').pop() : `document_${Date.now()}.txt`);
    setModalVisible(true);
  };

  const handleExit = () => {
    if (text.length > 0 && !currentFilePath) {
      Alert.alert('Незбережені зміни', 'У вас є незбережені зміни. Ви дійсно хочете вийти?', [
        { text: 'Скасувати', style: 'cancel' },
        { text: 'Вийти', onPress: () => BackHandler.exitApp() },
      ]);
    } else {
      Alert.alert('Вихід', 'Ви впевнені, що хочете вийти?', [
        { text: 'Скасувати', style: 'cancel' },
        { text: 'Вийти', onPress: () => BackHandler.exitApp() },
      ]);
    }
  };

  const handleModalSubmit = async () => {
    if (!inputFolderPath || !inputFileName) {
      Alert.alert('Помилка', 'Будь ласка, введіть шлях до теки та назву файлу');
      return;
    }

    const fullPath = `${inputFolderPath}/${inputFileName}`.replace('//', '/');

    try {
      const dirExists = await RNFS.exists(inputFolderPath);
      if (!dirExists) {
        Alert.alert('Помилка', 'Вказана тека не існує');
        return;
      }

      if (modalAction === 'open') {
        const fileExists = await RNFS.exists(fullPath);
        if (!fileExists) {
          Alert.alert('Помилка', 'Файл не існує');
          return;
        }

        const content = await RNFS.readFile(fullPath, 'utf8');
        setText(content);
        setCurrentFilePath(fullPath);
        Alert.alert('Файл відкрито', inputFileName);
      } else if (modalAction === 'saveAs') {
        await RNFS.writeFile(fullPath, text, 'utf8');
        setCurrentFilePath(fullPath);
        Alert.alert('Успіх', `Файл збережено як:\n${fullPath}`);
      }

      setModalVisible(false);
      setInputFolderPath('');
      setInputFileName('');
    } catch (e) {
      Alert.alert('Помилка', `Не вдалося виконати операцію: ${e.message}`);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setInputFolderPath('');
    setInputFileName('');
  };

  return (
    <View style={styles.container}>
      <MenuBar
        onNew={handleNew}
        onOpen={handleOpen}
        onSave={handleSave}
        onSaveAs={handleSaveAs}
        onExit={handleExit}
        currentFilePath={currentFilePath} // Передаємо поточний шлях файлу
      />
      <TextInput
        style={styles.textInput}
        multiline
        value={text}
        onChangeText={setText}
        placeholder="Введіть текст..."
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {modalAction === 'open' ? 'Відкрити файл' : 'Зберегти файл як'}
            </Text>
            <TextInput
              style={styles.modalInput}
              value={inputFolderPath}
              onChangeText={setInputFolderPath}
              placeholder="Введіть шлях до теки (наприклад, /storage/emulated/0/Download)"
            />
            <TextInput
              style={styles.modalInput}
              value={inputFileName}
              onChangeText={setInputFileName}
              placeholder="Введіть назву файлу (наприклад, document.txt)"
            />
            <View style={styles.modalButtonContainer}>
              <Button title="Підтвердити" onPress={handleModalSubmit} />
              <Button title="Скасувати" onPress={handleModalCancel} color="red" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});