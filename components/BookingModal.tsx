import { useState } from 'react';
import { Alert, Dimensions, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { COACHES } from '../constants/coaches';
import { Colors } from '../constants/Colors';
import { SECTIONS } from '../constants/sections';
import { globalStyles } from '../constants/Styles';
import { useBookings } from '../context/BookingContext';

const { height } = Dimensions.get('window');

interface BookingModalProps {
  visible: boolean;
  sectionKey: string;
  onClose: () => void;
}

const PERIODS = [
  { label: 'Місяць', value: 'Місяць' },
  { label: 'Квартал', value: 'Квартал' },
  { label: 'Півріччя', value: 'Півріччя' },
  { label: 'Рік', value: 'Рік' },
];

export const BookingModal = ({ visible, sectionKey, onClose }: BookingModalProps) => {
  const section = SECTIONS.find(s => s.key === sectionKey);
  const coaches = COACHES.filter(c => c.section === section?.name);
  const { addBooking } = useBookings();

  const coachItems = coaches.map(c => ({ label: c.name, value: c.name }));
  const periodItems = PERIODS.map(p => ({ label: p.label, value: p.value }));

  const [coach, setCoach] = useState<string | null>(coachItems[0]?.value || null);
  const [period, setPeriod] = useState<string | null>(periodItems[0]?.value || null);
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // DropdownPicker state
  const [openCoach, setOpenCoach] = useState(false);
  const [openPeriod, setOpenPeriod] = useState(false);

   // Function to close other dropdowns when one opens
  const onOpen = (openType: 'coach' | 'period') => {
    if (openType === 'coach') {
      setOpenPeriod(false);
    } else {
      setOpenCoach(false);
    }
  };

  const handleBook = () => {
    if (!coach || !period || !fullName) {
      setError('Заповніть всі поля');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      addBooking({
        id: Date.now().toString(),
        section: section?.name || '',
        coach: coach || '',
        date: new Date().toLocaleString(),
        period: period || '',
        fullName,
        paymentStatus: 'Не оплачено',
      });
      setLoading(false);
      Alert.alert('Успіх', 'Бронювання успішно створено!');
      onClose();
    }, 800);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={globalStyles.modalContainer}>
        <View style={[globalStyles.modalContent, { maxHeight: height * 0.8 }]}>
          <View style={globalStyles.modalHeader}>
            <Text style={globalStyles.title}>Запис на секцію</Text>
          </View>

          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={globalStyles.formGroup}>
              <Text style={globalStyles.label}>Секція</Text>
              <Text style={[globalStyles.text, { fontWeight: 'bold' }]}>{section?.name}</Text>
            </View>

            <View style={globalStyles.formGroup}>
              <Text style={globalStyles.label}>Тренер</Text>
              <DropDownPicker
                open={openCoach}
                value={coach}
                items={coachItems}
                setOpen={setOpenCoach}
                setValue={setCoach}
                setItems={undefined}
                placeholder="Виберіть тренера"
                containerStyle={globalStyles.input}
                style={{ backgroundColor: Colors.light.input }}
                dropDownContainerStyle={{ backgroundColor: Colors.light.input }}
                zIndex={3000}
                zIndexInverse={1000}
                onOpen={() => onOpen('coach')}
              />
            </View>

            <View style={globalStyles.formGroup}>
              <Text style={globalStyles.label}>Період оплати</Text>
              <DropDownPicker
                open={openPeriod}
                value={period}
                items={periodItems}
                setOpen={setOpenPeriod}
                setValue={setPeriod}
                setItems={undefined}
                placeholder="Виберіть період"
                containerStyle={globalStyles.input}
                style={{ backgroundColor: Colors.light.input }}
                dropDownContainerStyle={{ backgroundColor: Colors.light.input }}
                zIndex={2000}
                zIndexInverse={2000}
                onOpen={() => onOpen('period')}
              />
            </View>

            <View style={globalStyles.formGroup}>
              <Text style={globalStyles.label}>ПІБ</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Введіть ПІБ"
                value={fullName}
                onChangeText={setFullName}
                placeholderTextColor={Colors.light.textDim}
              />
            </View>

            {error && (
              <Text style={globalStyles.errorText}>{error}</Text>
            )}
          </ScrollView>

          <View style={[globalStyles.row, { gap: 12, marginTop: 16, zIndex: 100 }]}>
            <TouchableOpacity 
              style={[globalStyles.button, { flex: 1 }]} 
              onPress={handleBook} 
              disabled={loading}
            >
              <Text style={globalStyles.buttonText}>
                {loading ? 'Запис...' : 'Записатися'}
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