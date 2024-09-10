import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth_ms } from "../../services/HttpServer";
import { getAxiosErrorMessage } from "../../utils/ErrorUtil";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import { Button, ButtonContainer, SignInContainer, SigninContent } from "./styles";

const Signin: React.FC = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {

        try {

			const response = await auth_ms.post("/signin", {
				login, 
				password
			});
		
			if (response.status === 200) {
				LocalStorageUtils.setAuthToken(response.data);
				navigate("/contacts");
			} else {
				console.error("Authentication failed. Please check your credentials and try again, or sign up if you don't have an account.");
			}
        } catch (error) {
          	let message = getAxiosErrorMessage(error);
          	alert(message);
        }
    };

	const handleSignUp = async () => {
        try {
			const response = await auth_ms.post("/signup", {
				login,
				password,
			});

			if (response.status === 200) {
				alert("Signup successful. Please log in.");
			} 
        } catch (error) {
          	let message = getAxiosErrorMessage(error);
          	alert(message);
        }
	}


    return (
		<SignInContainer>
			<SigninContent>
			<label>Contact Manager System</label>
			<input
				type="email"
				placeholder="Username"
				value={login}
				onChange={(e) => setLogin(e.target.value)}
				defaultValue={"ivano@email.com"}
			/>
			<input
				type="password"
				placeholder="Password"
				maxLength={8}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				defaultValue={"An##3985"}
			/>
			<ButtonContainer>
				<Button type="button" onClick={handleSignIn}>Sign In</Button>
				<Button type="button" secondary onClick={handleSignUp}>Sign Up</Button>
			</ButtonContainer>
			</SigninContent>
		</SignInContainer>
    );
};

export default Signin;