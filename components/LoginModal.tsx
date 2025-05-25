import { useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { globalStyles } from '../constants/Styles';
import { useAuth } from '../context/AuthContext';

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
}

export const LoginModal = ({ visible, onClose }: LoginModalProps) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    const success = await login(username, password);
    setLoading(false);
    if (success) {
      onClose();
    } else {
      setError('Невірний логін або пароль');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={globalStyles.modalContainer}>
        <ScrollView contentContainerStyle={globalStyles.modalContent}>
          <View style={globalStyles.modalHeader}>
            <Text style={globalStyles.title}>Вхід у систему</Text>
          </View>

          <View style={globalStyles.formGroup}>
            <Text style={globalStyles.label}>Логін</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Введіть логін"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholderTextColor={Colors.light.textDim}
            />
          </View>

          <View style={globalStyles.formGroup}>
            <Text style={globalStyles.label}>Пароль</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Введіть пароль"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={Colors.light.textDim}
            />
          </View>

          {error && (
            <Text style={globalStyles.errorText}>{error}</Text>
          )}

          <View style={[globalStyles.row, { gap: 12, marginTop: 16 }]}>
            <TouchableOpacity 
              style={[globalStyles.button, { flex: 1 }]} 
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={Colors.light.primary} />
              ) : (
                <Text style={globalStyles.buttonText}>Увійти</Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[globalStyles.buttonOutline, { flex: 1 }]} 
              onPress={onClose}
            >
              <Text style={globalStyles.buttonOutlineText}>Скасувати</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}; 