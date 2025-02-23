import { useState, ChangeEvent, FormEvent } from "react";
import { BASE_URI, LOGIN_PATH, SIGNUP_PATH } from "../constants.ts";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Auth() {
	const [isSignUp, setIsSignUp] = useState<boolean>(false);
	const [signUpForm, setSignUpForm] = useState({
		email: "",
		username: "",
		password: "",
	});
	const [loginForm, setLoginForm] = useState({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const navigate = useNavigate();

	const handleSignUpChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSignUpForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLoginForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("----SIGN UP----");

		const reqbody = {
			username: signUpForm.username,
			email: signUpForm.email,
			password: signUpForm.password,
		};

		const url = `${BASE_URI}${SIGNUP_PATH}`;
		console.log("Signup URL:", url);

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(reqbody),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Signup failed");
			}

			const data = await response.json();
			console.log("Signup successful:", data);
			navigate("/home");
		} catch (error) {
			console.error("Error during signup:", error);
		}
	};

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("----Login----");

		const reqbody = {
			email: loginForm.email,
			password: loginForm.password,
		};

		const url = `${BASE_URI}${LOGIN_PATH}`;
		console.log("Login URL:", url);

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(reqbody),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Login failed");
			}

			const data = await response.json();
			console.log("Login successful:", data);
			navigate("/home");
		} catch (error) {
			console.error("Error during login:", error);
		}
	};

	return (
		<div className="auth-box">
			<h3>LOG IN / SIGN UP</h3>
			{isSignUp ? (
				<div className="form-box">
					<form className="form-box-inside" onSubmit={handleSignup}>
						<input
							type="email"
							name="email"
							className="auth-input"
							placeholder="Enter Your mail"
							value={signUpForm.email}
							onChange={handleSignUpChange}
							required
						/>
						<input
							type="text"
							name="username"
							className="auth-input"
							placeholder="Enter Your UserName"
							value={signUpForm.username}
							onChange={handleSignUpChange}
							required
						/>
						<div className="password-wrapper">
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								className="auth-input"
								placeholder="Enter Your Password"
								value={signUpForm.password}
								onChange={handleSignUpChange}
								required
							/>
							<span className="toggle-password" onClick={togglePasswordVisibility}>
								{showPassword ? <FaEyeSlash color="white" /> : <FaEye color="white" />}
							</span>
						</div>
						<button type="submit" className="auth-button">
							Sign Up
						</button>
					</form>
					<button
						type="button"
						className="auth-switch"
						onClick={() => setIsSignUp(false)}
					>
						Already Registered? Login here
					</button>
				</div>
			) : (
				<div className="form-box">
					<form className="form-box-inside" onSubmit={handleLogin}>
						<input
							type="email"
							name="email"
							className="auth-input"
							placeholder="Enter Your mail"
							value={loginForm.email}
							onChange={handleLoginChange}
							required
						/>
						<div className="password-wrapper">
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								className="auth-input"
								placeholder="Enter Your Password"
								value={loginForm.password}
								onChange={handleLoginChange}
								required
							/>
							<span className="toggle-password" onClick={togglePasswordVisibility}>
								{showPassword ? <FaEyeSlash color="white" /> : <FaEye color="white" />}
							</span>
						</div>
						<button type="submit" className="auth-button">
							Login
						</button>
					</form>
					<button
						type="button"
						className="auth-switch"
						onClick={() => setIsSignUp(true)}
					>
						New User? Register here
					</button>
				</div>
			)}
		</div>
	);
}
