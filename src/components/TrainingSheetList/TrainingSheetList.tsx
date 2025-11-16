import { FlatList, Text, TouchableOpacity } from "react-native";
import { styles } from "@/styles/TrainingSheet";
import { DayItem } from "../DayItem/DayItem";
import type {
	TrainingSheet,
	TrainingSheetExercise,
} from "@/types/interfaces/trainingSheet";

interface ExerciseWithCompletion extends TrainingSheetExercise {
	completed?: boolean;
}

interface TrainingSheetWithCompletion
	extends Omit<TrainingSheet, "training_sheet_exercises"> {
	training_sheet_exercises: ExerciseWithCompletion[];
}

interface TrainingSheetListProps {
	trainingSheets: TrainingSheetWithCompletion[];
	expandedDay: string | null;
	toggleDay: (day: string) => void;
	removeDay: (day: string) => void;
	newExercise: { [key: string]: string };
	setNewExercise: (newExercise: { [key: string]: string }) => void;
	addExercise: (day: string) => void;
	toggleExerciseCompletion: (day: string, index: number) => void;
	removeExercise: (day: string, index: number) => void;
	setIsAddDayModalVisible: (visible: boolean) => void;
	handleSave: () => void;
}

export function TrainingSheetList({
	trainingSheets,
	expandedDay,
	toggleDay,
	removeDay,
	newExercise,
	setNewExercise,
	addExercise,
	toggleExerciseCompletion,
	removeExercise,
	setIsAddDayModalVisible,
	handleSave,
}: TrainingSheetListProps) {
	return (
		<FlatList
			data={trainingSheets}
			keyExtractor={(item) => item.title}
			style={styles.list}
			contentContainerStyle={styles.contentContainer}
			ListHeaderComponent={
				<>
					<Text style={styles.title}>Ficha de Treino</Text>
					{trainingSheets.length === 0 && (
						<Text style={styles.emptyText}>
							Nenhum treino cadastrado. Clique em &quot;Adicionar Dia de
							Treino&quot; para começar.
						</Text>
					)}
				</>
			}
			renderItem={({ item: sheet }) => (
				<DayItem
					sheet={sheet}
					expandedDay={expandedDay}
					toggleDay={toggleDay}
					removeDay={removeDay}
					newExercise={newExercise}
					setNewExercise={setNewExercise}
					addExercise={addExercise}
					toggleExerciseCompletion={toggleExerciseCompletion}
					removeExercise={removeExercise}
				/>
			)}
			ListFooterComponent={
				<>
					<TouchableOpacity
						onPress={() => setIsAddDayModalVisible(true)}
						style={styles.addDayButton}
					>
						<Text style={styles.addDayButtonText}>
							+ Adicionar Dia de Treino
						</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={handleSave} style={styles.saveButton}>
						<Text style={styles.saveButtonText}>Salvar Alterações</Text>
					</TouchableOpacity>
				</>
			}
		/>
	);
}
