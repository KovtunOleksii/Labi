import { useEffect, useState } from 'react';
import { Alert, Dimensions, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { globalStyles } from '../constants/Styles';
import { Booking, useBookings } from '../context/BookingContext';

const { width, height } = Dimensions.get('window');

interface PaymentModalProps {
  visible: boolean;
  booking: Booking | null;
  onClose: () => void;
}

// Function to calculate amount based on period
const calculateAmount = (period: string | null): string => {
  switch (period) {
    case 'Місяць':
      return '500 грн';
    case 'Квартал':
      return '1500 грн';
    case 'Півріччя':
      return '3000 грн';
    case 'Рік':
      return '6000 грн';
    default:
      return '0 грн';
  }
};

export const PaymentModal = ({ visible, booking, onClose }: PaymentModalProps) => {
  const { updateBooking } = useBookings();
  const [fullName, setFullName] = useState(booking?.fullName || '');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState(calculateAmount(booking?.period || null));
  const [file, setFile] = useState('');
  const [loading, setLoading] = useState(false);

  // Update amount when booking changes
  useEffect(() => {
    setAmount(calculateAmount(booking?.period || null));
  }, [booking]);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      updateBooking(booking!.id, {
        paymentStatus: 'Оплачено',
        paymentDate: new Date().toLocaleString(),
        fullName,
        receiptUrl: file || 'mock.pdf',
      });
      setLoading(false);
      Alert.alert('Успіх', 'Оплату підтверджено!');
      onClose();
    }, 800);
  };

  if (!booking) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={globalStyles.modalContainer}>
        <View style={[globalStyles.modalContent, { width: width * 0.95, maxHeight: height * 0.8 }]}>
          <View style={globalStyles.modalHeader}>
            <Text style={[globalStyles.title, { textAlign: 'left' }]}>Оплата бронювання</Text>
          </View>
          
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={globalStyles.formGroup}>
              <Text style={globalStyles.label}>ПІБ</Text>
              <TextInput 
                style={globalStyles.input} 
                value={fullName} 
                onChangeText={setFullName}
                placeholderTextColor={Colors.light.textDim}
              />
            </View>

            <View style={globalStyles.formGroup}>
              <Text style={globalStyles.label}>Номер телефону</Text>
              <TextInput 
                style={globalStyles.input} 
                value={phone} 
                onChangeText={setPhone} 
                keyboardType="phone-pad"
                placeholderTextColor={Colors.light.textDim}
              />
            </View>

            <View style={globalStyles.formGroup}>
              <Text style={globalStyles.label}>Сума оплати</Text>
              <TextInput 
                style={globalStyles.input} 
                value={amount} 
                onChangeText={setAmount} 
                keyboardType="numeric"
                placeholderTextColor={Colors.light.textDim}
                editable={false}
              />
            </View>

            <View style={globalStyles.formGroup}>
              <Text style={globalStyles.label}>Реквізити для оплати</Text>
              <Text style={[globalStyles.text, { fontWeight: 'bold' }]}>
                UA323050220000239046102620 (ПриватБанк)
              </Text>
            </View>

            <View style={globalStyles.formGroup}>
              <Text style={globalStyles.label}>Завантажити квитанцію (PDF)</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Виберіть файл (заглушка)"
                value={file}
                onChangeText={setFile}
                placeholderTextColor={Colors.light.textDim}
              />
            </View>
          </ScrollView>

          <View style={[globalStyles.row, { gap: 12, marginTop: 24 }]}>
            <TouchableOpacity 
              style={[globalStyles.button, { flex: 1 }]} 
              onPress={handleSubmit} 
              disabled={loading}
            >
              <Text style={globalStyles.buttonText}>
                {loading ? 'Відправка...' : 'Надіслати'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[globalStyles.buttonOutline, { flex: 1 }]} 
              onPress={onClose}
            >
              <Text style={globalStyles.buttonOutlineText}>Скасувати</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}; 