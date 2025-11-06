import { Text, View } from 'react-native';
import { styles } from '@/styles/Profile'; // Assuming styles are shared or will be moved
import { UserInfo } from '@/types/UserInfo';

interface StatsSectionProps {
  userInfo: UserInfo;
  calculateIMC: (userInfo: UserInfo) => string;
  calculateAge: (userInfo: UserInfo) => string;
}

export default function StatsSection({
  userInfo,
  calculateIMC,
  calculateAge,
}: StatsSectionProps) {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <Text style={styles.statValue}>{userInfo.weight_kg || '--'}</Text>
        <Text style={styles.statLabel}>Peso (kg)</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={styles.statValue}>
          {userInfo.height_cm 
            ? (userInfo.height_cm > 10 ? userInfo.height_cm : userInfo.height_cm * 100).toFixed(0)
            : '--'}
        </Text>
        <Text style={styles.statLabel}>Altura (cm)</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={styles.statValue}>{calculateIMC(userInfo)}</Text>
        <Text style={styles.statLabel}>IMC</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={styles.statValue}>{calculateAge(userInfo)}</Text>
        <Text style={styles.statLabel}>Idade</Text>
      </View>
    </View>
  );
}
