import { useRouter } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { globalStyles } from '../../constants/Styles';

const LOGO_URL = 'https://raw.githubusercontent.com/KovtunOleksii/Labi/mkr2/client/public/Logo.png';
const STADIUM_URL = 'https://raw.githubusercontent.com/KovtunOleksii/Labi/mkr2/client/public/stadium.jpg';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ScrollView style={globalStyles.container}>
      <View style={[globalStyles.contentContainer, { alignItems: 'center' }]}>
        <Image source={{ uri: LOGO_URL }} style={globalStyles.avatar} />
        <Text style={[globalStyles.title, { textAlign: 'center' }]}>
          Спортивний комплекс імені Володимира Окіпного
        </Text>
        <Text style={[globalStyles.text, { textAlign: 'center', marginBottom: 16 }]}>
          Ласкаво просимо до нашого комплексу! Ми пропонуємо різноманітні спортивні секції для дітей та дорослих.
        </Text>
        <Text style={[globalStyles.text, { textAlign: 'center', color: Colors.light.textDim }]}>
          <Text style={{ fontWeight: 'bold' }}>Контакти:</Text> бульвар Шевченка, 4, м. Ромни, Сумська область | Тел: +380 54 445 1601
        </Text>
      </View>
      <Image source={{ uri: STADIUM_URL }} style={globalStyles.homeImage} />
      <View style={[globalStyles.contentContainer, globalStyles.row, { justifyContent: 'space-around' }]}>
        <TouchableOpacity 
          style={globalStyles.button} 
          onPress={() => router.push('/(tabs)/coaches')}
        >
          <Text style={globalStyles.buttonText}>Тренери</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={globalStyles.button} 
          onPress={() => router.push('/(tabs)/sections')}
        >
          <Text style={globalStyles.buttonText}>Секції</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={globalStyles.button} 
          onPress={() => router.push('/(tabs)/bookings')}
        >
          <Text style={globalStyles.buttonText}>Мої записи</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
