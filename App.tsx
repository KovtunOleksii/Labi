import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import EditorScreen from './screens/EditorScreen';
import { PermissionsAndroid, Platform } from 'react-native';

const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
    } catch (err) {
      console.warn('Permission error:', err);
    }
  }
};

export default function App() {
  React.useEffect(() => {
    requestStoragePermission();
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <EditorScreen />
      </PaperProvider>
    </SafeAreaProvider>
  );
}