import { ActivityIndicator, Text, View } from "react-native";
import { AddDayModal } from "@/components/AddDayModal/AddDayModal";
import { TrainingSheetList } from "@/components/TrainingSheetList/TrainingSheetList";
import { useTrainingSheet } from "@/hooks/useTrainingSheet";
import { styles } from "@/styles/TrainingSheet";

export default function TrainingSheetComponent() {
	const {
		expandedDay,
		trainingSheets,
		loading,
		newExercise,
		isAddDayModalVisible,
		setNewExercise,
		setIsAddDayModalVisible,
		toggleDay,
		toggleExerciseCompletion,
		addExercise,
		removeExercise,
		handleAddDay,
		removeDay,
		handleSave,
	} = useTrainingSheet();

	if (loading) {
		return (
			<View
				style={[
					styles.container,
					{ justifyContent: "center", alignItems: "center" },
				]}
			>
				<ActivityIndicator size="large" color="#bb6c12ff" />
				<Text style={{ marginTop: 16 }}>Carregando ficha de treino...</Text>
			</View>
		);
	}

	return (
		<>
			<AddDayModal
				visible={isAddDayModalVisible}
				onClose={() => setIsAddDayModalVisible(false)}
				onAdd={handleAddDay}
			/>
			<TrainingSheetList
				trainingSheets={trainingSheets}
				expandedDay={expandedDay}
				toggleDay={toggleDay}
				removeDay={removeDay}
				newExercise={newExercise}
				setNewExercise={setNewExercise}
				addExercise={addExercise}
				toggleExerciseCompletion={toggleExerciseCompletion}
				removeExercise={removeExercise}
				setIsAddDayModalVisible={setIsAddDayModalVisible}
				handleSave={handleSave}
			/>
		</>
	);
}
