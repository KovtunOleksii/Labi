import { ScrollView, Text, View } from 'react-native';
import { CoachCard } from '../../components/CoachCard';
import { COACHES } from '../../constants/coaches';
import { globalStyles } from '../../constants/Styles';

export default function CoachesScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={[globalStyles.title, { textAlign: 'center' }]}>Наші тренери</Text>
      <View style={[globalStyles.contentContainer, { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }]}>
        {COACHES.map(coach => (
          <CoachCard
            key={coach.id}
            name={coach.name}
            section={coach.section}
            experience={coach.experience}
            image={coach.image}
          />
        ))}
      </View>
    </ScrollView>
  );
} 