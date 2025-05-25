import { Image, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { globalStyles } from '../constants/Styles';

interface CoachCardProps {
  name: string;
  section: string;
  experience: number;
  image: string;
}

export const CoachCard = ({ name, section, experience, image }: CoachCardProps) => (
  <View style={[globalStyles.card, { width: 180, alignItems: 'center' }]}>
    <Image source={{ uri: image }} style={[globalStyles.avatar, { width: 90, height: 90, marginBottom: 8 }]} />
    <Text style={[globalStyles.listItemTitle, { textAlign: 'center' }]}>{name}</Text>
    <Text style={[globalStyles.text, { fontSize: 14, marginBottom: 2 }]}>Секція: {section}</Text>
    <Text style={[globalStyles.text, { fontSize: 14, color: Colors.light.textDim }]}>
      Досвід: {experience} років
    </Text>
  </View>
); 