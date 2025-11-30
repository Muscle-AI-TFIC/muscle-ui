// types.ts
export interface TrainingSheetExercise {
	id?: number;
	name: string;
	reps: number;
	sets: number;
	weight: number;
}

export interface TrainingSheet {
	id?: number;
	title: string;
	training_sheet_exercises: TrainingSheetExercise[];
}

export interface TrainingSheetMessage {
	error: unknown;
	data: TrainingSheet[];
	count: number | null;
	status: number;
	statusText: string;
}

export interface TrainingSheetResponse {
	message: TrainingSheetMessage;
}
