import { Text, Image, View, TouchableOpacity } from 'react-native';
import { styles } from '@/styles/Profile'; // Assuming styles are shared or will be moved

interface ProfileHeaderProps {
  image: string | null;
  userName: string;
  userEmail: string;
  handlePickImage: () => Promise<void>;
  handleRemoveImage: () => void;
}

export default function ProfileHeader({
  image,
  userName,
  userEmail,
  handlePickImage,
  handleRemoveImage,
}: ProfileHeaderProps) {
  return (
    <View style={styles.profileSection}>
      <TouchableOpacity
        onPress={handlePickImage}
        onLongPress={image ? handleRemoveImage : undefined}
        style={styles.avatarContainer}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarPlaceholderText}>
              {userName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <View style={styles.editBadge}>
          <Text style={styles.editBadgeText}>✎</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.userName}>{userName}</Text>
      <Text style={styles.userEmail}>{userEmail}</Text>

      {image && (
        <Text style={styles.hintText}>
          Pressione e segure para remover a foto
        </Text>
      )}
    </View>
  );
}
