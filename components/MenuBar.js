// components/MenuBar.js
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Menu } from 'react-native-paper';

export default function MenuBar({ onNew, onOpen, onSave, onSaveAs, onExit, currentFilePath }) {
  const [visible, setVisible] = useState(false);

  const fileName = currentFilePath ? currentFilePath.split('/').pop() : "Без назви";

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <TouchableOpacity 
            onPress={() => setVisible(true)}
            style={styles.menuButton}
          >
            <Text style={styles.menuButtonText}>Файл</Text>
          </TouchableOpacity>
        }
        contentStyle={styles.menuContent}
      >
        <Menu.Item 
          onPress={() => { setVisible(false); onNew(); }} 
          title="Новий" 
          titleStyle={styles.menuItemText}
        />
        <Menu.Item 
          onPress={() => { setVisible(false); onOpen(); }} 
          title="Відкрити..." 
          titleStyle={styles.menuItemText}
        />
        <Menu.Item 
          onPress={() => { setVisible(false); onSave(); }} 
          title="Зберегти" 
          titleStyle={styles.menuItemText}
        />
        <Menu.Item 
          onPress={() => { setVisible(false); onSaveAs(); }} 
          title="Зберегти як..." 
          titleStyle={styles.menuItemText}
        />
        <Menu.Item 
          onPress={() => { setVisible(false); onExit(); }} 
          title="Вихід" 
          titleStyle={styles.menuItemText}
        />
      </Menu>
      
      <Text style={styles.fileNameText} numberOfLines={1} ellipsizeMode="tail">
        {fileName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    backgroundColor: '#0078D7',
    alignItems: 'center',
    height: 40,
  },
  menuButton: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    height: '100%',
  },
  menuButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 24, // Додано для правильного вирівнювання по вертикалі
    includeFontPadding: false, // Видаляє зайві відступи навколо тексту
  },
  fileNameText: {
    color: '#ffffff',
    marginLeft: 20,
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
    lineHeight: 24, // Такий самий як у menuButtonText
    includeFontPadding: false,
  },
  menuContent: {
    backgroundColor: '#ffffff',
    marginTop: 30,
  },
  menuItemText: {
    color: '#000000',
    fontSize: 14,
  },
});