import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '@/styles/exerciseStyles/progressBarStyles';

interface ProgressBarProps {
  completed: number;
  total: number;
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total, percentage }) => {
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressTextContainer}>
        <Text style={styles.progressText}>
          {completed}/{total} completos
        </Text>
        <Text style={styles.percentageText}>
          {Math.round(percentage)}%
        </Text>
      </View>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${percentage}%` }
          ]}
        />
      </View>
    </View>
  );
};

export default ProgressBar;