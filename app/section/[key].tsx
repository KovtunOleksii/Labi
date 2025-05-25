import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { BookingModal } from '../../components/BookingModal';
import { LoginModal } from '../../components/LoginModal';
import { ScheduleTable } from '../../components/ScheduleTable';
import { COACHES } from '../../constants/coaches';
import { Colors } from '../../constants/Colors';
import { SCHEDULE } from '../../constants/schedule';
import { SECTIONS } from '../../constants/sections';
import { globalStyles } from '../../constants/Styles';
import { useAuth } from '../../context/AuthContext';

export default function SectionDetailsScreen() {
  const { key } = useLocalSearchParams<{ key: string }>();
  const section = SECTIONS.find(s => s.key === key);
  const coaches = COACHES.filter(c => c.section === section?.name);
  const schedule = SCHEDULE.filter(s => s.section === section?.name);
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const router = useRouter();

  if (!section) {
    return (
      <View style={[globalStyles.container, globalStyles.center]}>
        <Text style={globalStyles.text}>Секцію не знайдено</Text>
      </View>
    );
  }

  const handleBook = () => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    setShowBooking(true);
  };

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.contentContainer}>
        <Text style={globalStyles.title}>{section.name}</Text>
        <Text style={[globalStyles.text, { textAlign: 'center', marginBottom: 24 }]}>
          {section.description}
        </Text>

        <Text style={globalStyles.subtitle}>Розклад занять</Text>
        {schedule.map((s, idx) => (
          <ScheduleTable key={idx} coach={s.coach} times={s.times} />
        ))}

        <Text style={[globalStyles.subtitle, { marginTop: 24 }]}>Тренери секції</Text>
        {coaches.map(coach => (
          <View key={coach.id} style={[globalStyles.card, { marginVertical: 4 }]}>
            <Text style={globalStyles.listItemTitle}>{coach.name}</Text>
            <Text style={globalStyles.listItemSubtitle}>Досвід: {coach.experience}</Text>
          </View>
        ))}

        <View style={{ marginVertical: 32 }}>
          {user ? (
            <TouchableOpacity 
              style={[globalStyles.button, { marginHorizontal: 16 }]} 
              onPress={handleBook}
            >
              <Text style={globalStyles.buttonText}>Записатися на секцію</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <Text style={[globalStyles.text, { textAlign: 'center', marginBottom: 16, color: Colors.light.textDim }]}>
                Для запису потрібно авторизуватися
              </Text>
              <TouchableOpacity 
                style={[globalStyles.button, { marginHorizontal: 16 }]} 
                onPress={() => setShowLogin(true)}
              >
                <Text style={globalStyles.buttonText}>Увійти</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <LoginModal visible={showLogin} onClose={() => setShowLogin(false)} />
      <BookingModal visible={showBooking} sectionKey={key as string} onClose={() => setShowBooking(false)} />
    </ScrollView>
  );
} 