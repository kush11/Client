import React, { Component } from "react";
import { StyleSheet, View, Image, AsyncStorage } from "react-native";

import Input from "../Components/Input/Input";
import CustomButton from "../Components/Button/Button";
import TextButton from "../Components/TextButton/TextButton";
import startPrivate from "./startPrivateScreen";

import axios from "axios";

export default class App extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  state = {
    username: "",
    password: ""
  };
  handleChangeUsername = text => {
    this.setState(() => {
      return {
        username: text
      };
    });
  };
  handleChangePassword = text => {
    this.setState(() => {
      return {
        password: text
      };
    });
  };
  handlePushScreen = () => {
    this.props.navigator.push({
      screen: "Client.CreateAnAccount",
      title: "Sign Up"
    });
  };
  handleLogin = () => {
    const { username, password } = this.state;    
      axios
        .post("http://172.30.13.203:3000/user/login", {
          username,
          password
        })
        .then(response => {
          try {
            const token = response.headers["x-auth"];
            if (token) {
              AsyncStorage.setItem("x-auth", token)
                .then(() => {
                  startPrivate();
                })
                .catch(() => {
                  alert("error");
                });
            }
          } catch (err) {
            alert("error");
          }
        })
        .catch(() => {
          alert("Wrong username or password!");
        });   
  };
  render() {
    return (
      <View style={styles.container}>
        {/* <Image
          source={require("../../assets/images/logo.png")}
          style={styles.img}
        /> */}
        <View style={styles.formContainer}>
          <Input
            placeholder="username"
            onChangeText={this.handleChangeUsername}
            value={this.state.username}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            value={this.state.password}
            onChangeText={this.handleChangePassword}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            height: 150,
            justifyContent: "space-around"
          }}
        >
          <CustomButton text="Sign In" onPress={this.handleLogin} />
          <TextButton onPress={this.handlePushScreen} text="Sign Up" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgb(255,255,255)"
  },
  formContainer: {
    height: 150,
    justifyContent: "space-around"
  },
  img: {
    height: 100,
    width: 100,
    marginTop: "35%",
    marginBottom: "25%"
  }
});
