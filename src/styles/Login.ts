import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export const loginProps = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderRadius: 100,
    borderWidth: 5,
  },

  containerTop: {
    color: "white",
    fontSize: 50,
    fontStyle: 'italic',
  },

  containerBottom: {},

  screen: {
    flex: 1,
    backgroundColor: "hsla(253, 31%, 6%, 1.00)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  email: {
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    padding: 5,
    paddingHorizontal: screenWidth * 0.25,  
    borderRadius: 10,
    marginTop: -24,
    borderWidth: 0,
    color: 'white',
  },

  password: {
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    padding: 5,
    borderRadius: 10,
    marginTop: 16,
    paddingHorizontal: screenWidth * 0.25,  
  },

  loginButton: {
    marginTop: 20,
    padding: 16,
    paddingHorizontal: screenWidth * 0.10,
    backgroundColor: "hsla(24, 90%, 52%, 1.00)",
    borderRadius: 30,
    alignItems: "center",
  },

  loginButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  logo: {
    margin: screenWidth * 0.1,
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,    
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 20,
  },

  footerText: {
    fontSize: 12,
    color: "hsla(0, 0%, 100%, 1.00)",
  },
});
