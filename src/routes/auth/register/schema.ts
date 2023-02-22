import { z } from 'zod';


export const registerSchema = z
	.object({
		email: z
			.string({ required_error: 'Email is required' })
			.min(1, { message: 'Email is required' })
			.max(64, { message: 'Email must be less than 64 characters' })
			.email({ message: 'Email must be a valid email address' }),
		confirmEmail: z
			.string({ required_error: 'Confirm email is required' })
			.min(1)
			.max(64)
			.email({ message: 'Confirm email must be a valid email address' }),
		password: z
			.string({ required_error: 'Password is required' })
			.min(8, { message: 'Password must be at least 8 characters' })
			.max(32, { message: 'Password must be less than 32 characters' })
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/, {
				message:
					'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number'
			})
			.trim(),
		confirmPassword: z
			.string({ required_error: 'Confirm password is required' })
			.min(8, { message: 'Password must be at least 8 characters' })
			.max(32, { message: 'Password must be less than 32 characters' })
			.trim()
	})
	.superRefine(({ password, confirmPassword, email, confirmEmail, phone }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Passwords do not match',
				path: ['password']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'Passwords do not match',
				path: ['confirmPassword']
			});
		}

		if (confirmEmail !== email) {
			ctx.addIssue({
				code: 'custom',
				message: 'Emails do not match',
				path: ['email']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'Emails do not match',
				path: ['confirmEmail']
			});
		}
	});
