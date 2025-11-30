import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/styles/TrainingSheet";
import type {
	TrainingSheet,
	TrainingSheetExercise,
} from "@/types/interfaces/trainingSheet";
import { AddExercise } from "../AddExercise/AddExercise";
import { ExerciseItem } from "../ExerciseItem/ExerciseItem";

interface ExerciseWithCompletion extends TrainingSheetExercise {
	completed?: boolean;
}

interface TrainingSheetWithCompletion
	extends Omit<TrainingSheet, "training_sheet_exercises"> {
	training_sheet_exercises: ExerciseWithCompletion[];
}

interface DayItemProps {
	sheet: TrainingSheetWithCompletion;
	expandedDay: string | null;
	toggleDay: (day: string) => void;
	removeDay: (day: string) => void;
	newExercise: { [key: string]: string };
	setNewExercise: (newExercise: { [key: string]: string }) => void;
	addExercise: (day: string) => void;
	toggleExerciseCompletion: (day: string, index: number) => void;
	removeExercise: (day: string, index: number) => void;
}

export function DayItem({
	sheet,
	expandedDay,
	toggleDay,
	removeDay,
	newExercise,
	setNewExercise,
	addExercise,
	toggleExerciseCompletion,
	removeExercise,
}: DayItemProps) {
	return (
		<View style={styles.dayContainer}>
			<TouchableOpacity
				onPress={() => toggleDay(sheet.title)}
				style={styles.dayButton}
			>
				<Text style={styles.dayText}>{sheet.title}</Text>
				<View style={styles.dayButtonActions}>
					<TouchableOpacity
						onPress={(e) => {
							e.stopPropagation();
							removeDay(sheet.title);
						}}
						style={styles.removeDayButton}
					>
						<Text style={styles.removeDayButtonText}>🗑️</Text>
					</TouchableOpacity>
					<Text style={styles.expandIcon}>
						{expandedDay === sheet.title ? "−" : "+"}
					</Text>
				</View>
			</TouchableOpacity>

			{expandedDay === sheet.title && (
				<View style={styles.exerciseList}>
					{sheet.training_sheet_exercises.length === 0 && (
						<Text style={styles.noExercisesText}>
							Nenhum exercício adicionado
						</Text>
					)}

					<FlatList
						data={sheet.training_sheet_exercises}
						keyExtractor={(_item, index) => index.toString()}
						renderItem={({ item, index }) => (
							<ExerciseItem
								item={item}
								index={index}
								day={sheet.title}
								toggleExerciseCompletion={toggleExerciseCompletion}
								removeExercise={removeExercise}
							/>
						)}
						scrollEnabled={false}
					/>

					<AddExercise
						day={sheet.title}
						newExercise={newExercise}
						setNewExercise={setNewExercise}
						addExercise={addExercise}
					/>
				</View>
			)}
		</View>
	);
}
