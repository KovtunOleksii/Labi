import { useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SectionCard } from '../../components/SectionCard';
import { SECTIONS } from '../../constants/sections';
import { globalStyles } from '../../constants/Styles';

export default function SectionsScreen() {
  const router = useRouter();
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={[globalStyles.title, { textAlign: 'center' }]}>Секції</Text>
      <View style={[globalStyles.contentContainer, { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }]}>
        {SECTIONS.map(section => (
          <SectionCard
            key={section.key}
            name={section.name}
            description={section.description}
            onPress={() => router.push(`/section/${section.key}`)}
          />
        ))}
      </View>
    </ScrollView>
  );
} 