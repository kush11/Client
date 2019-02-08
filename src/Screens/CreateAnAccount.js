import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import axios from 'axios';
import validator from 'validator';

import Input from '../Components/Input/Input';
import CustomButton from '../Components/Button/Button';

class CreateAnAccount extends Component {
	state = {
		email: '',
		password: '',
		username: '',
	};
	handleEmailChange = email => this.setState({ email });
	handlePasswordChange = password => this.setState({ password });
	handleUsernameChange = username => this.setState({ username });
	handleRegister = () => {
		const { email, password, username } = this.state;
		
			axios
				.post('http://172.30.13.203:3000/user/register', {
					email,
					password,
					username,
				})
				.then(response => {
					if (response.status == 201) {
						this.props.navigator.pop();
						alert('You madeIt');
					}
				})
				.catch(() => {
					alert('You made an error!');
				});
		
		// else {
		// 	alert('You made an error!');
		// }
	};
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.signUpForm}>
					<Input
						placeholder="Email"
						value={this.state.email}
						onChangeText={this.handleEmailChange}
					/>
					<Input
						placeholder="Username"
						value={this.state.username}
						onChangeText={this.handleUsernameChange}
					/>
					<Input
						placeholder="Password"
						value={this.state.password}
						onChangeText={this.handlePasswordChange}
						secureTextEntry
					/>
				</View>
				<CustomButton text="Sign Up" onPress={this.handleRegister} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	signUpForm: {
		height: 225,
		justifyContent: 'space-around',
	},
});

export default CreateAnAccount;
