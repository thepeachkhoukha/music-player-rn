import { Platform } from "react-native";
import colors from "./colors";

export default {
  text: {
    color: colors.darkGrey,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Poppins" : "Avenir",
  },
  flexColumnContainer: {
    display: "flex",
    flexDirection: "column",
  },
  flexRowContainer: {
    display: "flex",
    flexDirection: "row",
  },
  flexCenter: {
    alignItems: "center",
    justifyContent: "center",
  }
};
