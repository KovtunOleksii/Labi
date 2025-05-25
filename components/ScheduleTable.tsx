import { Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { globalStyles } from '../constants/Styles';

interface TimeSlot {
  day: string;
  time: string;
}

interface ScheduleTableProps {
  coach: string;
  times: TimeSlot[];
}

export const ScheduleTable = ({ coach, times }: ScheduleTableProps) => (
  <View style={[globalStyles.card, { marginBottom: 16 }]}>
    <Text style={[globalStyles.subtitle, { marginBottom: 12 }]}>{coach}</Text>
    <View style={[globalStyles.row, { flexWrap: 'wrap', gap: 8 }]}>
      {times.map((slot, idx) => (
        <View 
          key={idx} 
          style={[
            globalStyles.card, 
            { 
              padding: 12,
              minWidth: 120,
              backgroundColor: Colors.light.backgroundDim,
              borderWidth: 0,
              shadowOpacity: 0.05,
            }
          ]}
        >
          <Text style={[globalStyles.text, { fontWeight: '600' }]}>
            День: {slot.day}
          </Text>
          <Text style={[globalStyles.text, { color: Colors.light.textDim }]}>
            Час: {slot.time}
          </Text>
        </View>
      ))}
    </View>
  </View>
); 