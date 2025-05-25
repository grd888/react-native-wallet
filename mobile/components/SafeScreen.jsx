import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";

const SafeScreen = ({ children }) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: COLORS.background, // Forest theme background color
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export default SafeScreen;
