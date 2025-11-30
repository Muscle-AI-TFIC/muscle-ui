import { beforeEach, describe, expect, it, vi } from "vitest";
import { supabase } from "@/services/supabase";

vi.mock("@/services/supabase", () => ({
	supabase: {
		auth: {
			signInWithPassword: vi.fn(),
			signUp: vi.fn(),
		},
		from: vi.fn(() => ({
			insert: vi.fn(),
		})),
	},
}));

vi.mock("expo-router", () => ({
	router: {
		push: vi.fn(),
	},
}));

vi.mock("react-native", () => ({
	Alert: {
		alert: vi.fn(),
	},
}));

describe("Supabase Auth", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("signInWithPassword", () => {
		it("should sign in a user with correct credentials", async () => {
			const email = "test@example.com";
			const password = "password123";
			const user = { id: "123", email };
			(supabase.auth.signInWithPassword as vi.Mock).mockResolvedValue({
				data: { user },
				error: null,
			});

			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
				email,
				password,
			});
			expect(data.user).toEqual(user);
			expect(error).toBeNull();
		});

		it("should return an error for incorrect credentials", async () => {
			const email = "test@example.com";
			const password = "wrongpassword";
			const errorMessage = "Invalid credentials";
			(supabase.auth.signInWithPassword as vi.Mock).mockResolvedValue({
				data: null,
				error: { message: errorMessage },
			});

			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
				email,
				password,
			});
			expect(data).toBeNull();
			expect(error?.message).toEqual(errorMessage);
		});
	});

	describe("signUp", () => {
		it("should sign up a new user", async () => {
			const email = "newuser@example.com";
			const password = "newpassword";
			const user = { id: "456", email };
			(supabase.auth.signUp as vi.Mock).mockResolvedValue({
				data: { user },
				error: null,
			});

			const { data, error } = await supabase.auth.signUp({ email, password });

			expect(supabase.auth.signUp).toHaveBeenCalledWith({ email, password });
			expect(data.user).toEqual(user);
			expect(error).toBeNull();
		});

		it("should return an error if user already exists", async () => {
			const email = "existinguser@example.com";
			const password = "password123";
			const errorMessage = "User already registered";
			(supabase.auth.signUp as vi.Mock).mockResolvedValue({
				data: null,
				error: { message: errorMessage },
			});

			const { data, error } = await supabase.auth.signUp({ email, password });

			expect(supabase.auth.signUp).toHaveBeenCalledWith({ email, password });
			expect(data).toBeNull();
			expect(error?.message).toEqual(errorMessage);
		});
	});

	describe("from('person_info').insert", () => {
		it("should insert user info into person_info table", async () => {
			const userInfo = {
				full_name: "Test User",
				date_of_birth: "2000-01-01",
				gender: "Male",
				height: 180,
				weight: 80,
				user_id: "123",
			};
			const insertMock = vi.fn().mockResolvedValue({ error: null });
			(supabase.from as vi.Mock).mockReturnValue({ insert: insertMock });

			const { error } = await supabase.from("person_info").insert(userInfo);

			expect(supabase.from).toHaveBeenCalledWith("person_info");
			expect(insertMock).toHaveBeenCalledWith(userInfo);
			expect(error).toBeNull();
		});

		it("should return an error if insert fails", async () => {
			const userInfo = {
				full_name: "Test User",
				date_of_birth: "2000-01-01",
				gender: "Male",
				height: 180,
				weight: 80,
				user_id: "123",
			};
			const errorMessage = "Insert failed";
			const insertMock = vi
				.fn()
				.mockResolvedValue({ error: { message: errorMessage } });
			(supabase.from as vi.Mock).mockReturnValue({ insert: insertMock });

			const { error } = await supabase.from("person_info").insert(userInfo);

			expect(supabase.from).toHaveBeenCalledWith("person_info");
			expect(insertMock).toHaveBeenCalledWith(userInfo);
			expect(error?.message).toEqual(errorMessage);
		});
	});
});
