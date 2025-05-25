import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { globalStyles } from '../constants/Styles';
import { Booking } from '../context/BookingContext';

interface BookingListProps {
  bookings: Booking[];
  onPay: (booking: Booking) => void;
}

export const BookingList = ({ bookings, onPay }: BookingListProps) => (
  <FlatList
    data={bookings}
    keyExtractor={item => item.id}
    style={globalStyles.list}
    contentContainerStyle={globalStyles.listContent}
    renderItem={({ item }) => (
      <View style={[globalStyles.card, { flexDirection: 'row', padding: 12 }]}>
        <Text style={[globalStyles.text, { flex: 1, textAlign: 'center' }]}>{item.section}</Text>
        <Text style={[globalStyles.text, { flex: 1, textAlign: 'center' }]}>{item.coach}</Text>
        <Text style={[globalStyles.text, { flex: 1, textAlign: 'center' }]}>{item.fullName}</Text>
        <Text style={[
          globalStyles.text, 
          { 
            flex: 1, 
            textAlign: 'center',
            color: item.paymentStatus === 'Оплачено' ? Colors.light.success : Colors.light.error
          }
        ]}>
          {item.paymentStatus}
        </Text>
        <Text style={[globalStyles.text, { flex: 1, textAlign: 'center' }]}>
          {item.receiptUrl ? 'Завантажено' : '-'}
        </Text>
        <View style={{ flex: 1, alignItems: 'center' }}>
          {item.paymentStatus === 'Не оплачено' ? (
            <TouchableOpacity 
              style={[globalStyles.button, { paddingHorizontal: 12, paddingVertical: 6 }]} 
              onPress={() => onPay(item)}
            >
              <Text style={globalStyles.buttonText}>Оплатити</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    )}
    ListHeaderComponent={() => (
      <View style={[globalStyles.card, { 
        flexDirection: 'row', 
        padding: 12,
        backgroundColor: Colors.light.backgroundDim,
        marginBottom: 8
      }]}>
        <Text style={[globalStyles.label, { flex: 1, textAlign: 'center' }]}>Секція</Text>
        <Text style={[globalStyles.label, { flex: 1, textAlign: 'center' }]}>Тренер</Text>
        <Text style={[globalStyles.label, { flex: 1, textAlign: 'center' }]}>ПІБ</Text>
        <Text style={[globalStyles.label, { flex: 1, textAlign: 'center' }]}>Статус оплати</Text>
        <Text style={[globalStyles.label, { flex: 1, textAlign: 'center' }]}>Квитанція</Text>
        <Text style={[globalStyles.label, { flex: 1, textAlign: 'center' }]}>Дія</Text>
      </View>
    )}
  />
); 