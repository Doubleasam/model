export type RegisterType = {
	email: string;
	phone: string;
	password: string;
};

export type LogInType = {
	email: string;
	password: string;
};

export type profileType = {
	firstName: string;
	lastName: string;
	age: number;
	gender: string;
	nationality: string;
	height: number;
	weight: number;
	hairColor: string;
	country: string;
	city: string;
	sports: string[];
	languages: string[];
	smoker: boolean;
	profession: string;
	hobbies: string[];
	hashtags: string[];
	covidStatus: string;
	acceptVideoCalls: boolean;
	experience: string;
};

export type Country = {
  name: string;
  code: string;
  dialCode: string;
}
