import { Text, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { globalStyles } from '../constants/Styles';

interface SectionCardProps {
  name: string;
  description: string;
  onPress: () => void;
}

export const SectionCard = ({ name, description, onPress }: SectionCardProps) => (
  <TouchableOpacity 
    style={[globalStyles.card, { width: '100%', minHeight: 120 }]} 
    onPress={onPress}
  >
    <Text style={[globalStyles.listItemTitle, { textAlign: 'center', fontSize: 18 }]}>{name}</Text>
    <Text style={[globalStyles.text, { textAlign: 'center', color: Colors.light.textDim }]}>
      {description}
    </Text>
  </TouchableOpacity>
); 