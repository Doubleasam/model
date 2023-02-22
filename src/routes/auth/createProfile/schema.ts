import { z } from 'zod';

export const profileSchema = z.object({
	firstName: z
		.string({ required_error: 'Name is required' })
		.min(1, { message: 'Name is required' })
		.max(64, { message: 'Name should be less than 64 characters' })
		.trim(),
	lastName: z
		.string({ required_error: 'Surname is required' })
		.min(1, { message: 'Surname is required' })
		.max(64, { message: 'Surname should be less than 64 characters' })
		.trim(),
	age: z
		.number({ required_error: 'Age is required' })
		.min(18, { message: 'You must be at least 18 years old' }),
	gender: z
		.string({ required_error: 'Gender is required' })
		.min(1, { message: 'Gender is required' }),
	nationality: z
		.string({ required_error: 'Nationality is required' })
		.min(1, { message: 'Nationality is required' }),
	height: z.number({ required_error: 'Height is required' }),
	weight: z.number({ required_error: 'Weight is required' }),
	hairColor: z
		.string({ required_error: 'Hair Color is required' })
		.min(1, { message: 'Hair Color is required' }),
	country: z
		.string({ required_error: 'Country is required' })
		.min(1, { message: 'Country is required' }),
	city: z.string({ required_error: 'City is required' }).min(1, { message: 'City is required' }),
	sports: z.string().array().nonempty({ message: 'Sport is required' }),
	languages: z.string().array().nonempty({ message: 'Languages you speak are required' }),
	smoker: z.boolean(),
	profession: z
		.string({ required_error: 'Profession is required' })
		.min(1, { message: 'Pick a profession' }),
	hobbies: z.string().array().nonempty({ message: 'Hobbies is required' }),
	hashtags: z.string().array().nonempty({ message: 'Sport is required' }),
	covidStatus: z.string(),
	acceptVideoCalls: z.boolean(),
	experience: z
		.string({ required_error: 'Experience is required' })
		.min(1, { message: 'Experience is required' })
		.max(1000, { message: 'Experience should be less than 1000 characters' })
		.trim()
});
