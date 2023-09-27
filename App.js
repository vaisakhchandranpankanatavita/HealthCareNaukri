import React, { useEffect, useRef } from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Amplify } from "aws-amplify";
import {
  Authenticator,
  useAuthenticator,
  useTheme,
} from "@aws-amplify/ui-react-native";
import awsconfig from "./src/aws-exports";
import ProfilePage from "./src/Pages/ProfilePage";
import { Auth } from "aws-amplify";

Amplify.configure(awsconfig);

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  logo: {
    width: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});

const MyAppHeader = () => {
  const {
    tokens: { space, fontSizes },
  } = useTheme();
  return (
    <View style={styles.container}>
      <Image source={require("./assets/logo.png")} style={styles.logo} />
    </View>
  );
};

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button onPress={signOut} title="Sign Out" />;
}

// function HomePage({ navigation }) {
//   return (
//     <View style={style.container}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Profile Page"
//         onPress={() => navigation.navigate("ProfilePage")}
//       />
//       <SignOutButton />
//     </View>
//   );
// }

// function ProfilePage() {
//   return (
//     <View style={style.container}>
//       <Text>This is the Profile Page!</Text>
//     </View>
//   );
// }

function App() {
  const navigationRef = useRef(null);

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        await Auth.currentAuthenticatedUser();
        navigationRef.current?.navigate("ProfilePage");
      } catch (error) {
        console.log("User is not authenticated", error);
      }
    }

    checkAuthStatus();
  }, []);

  return (
    <Authenticator.Provider>
      <Authenticator Header={MyAppHeader}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="ProfilePage" component={ProfilePage} />
          </Stack.Navigator>
        </NavigationContainer>
      </Authenticator>
    </Authenticator.Provider>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default App;
