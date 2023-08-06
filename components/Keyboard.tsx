import { Platform, TouchableOpacity } from "react-native";
import { Text, Div } from "react-native-magnus";
import { KeyboardHeight, width } from "../constants/THEMES";

interface KeyboardProps {
  operation: string;
  setOperation: React.Dispatch<React.SetStateAction<string>>;
  setResult: React.Dispatch<React.SetStateAction<string>>;
}

const KeyboardItems = [
  ["AC", "±", "%", "÷"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

const Keyboard = ({ setOperation, setResult, operation }: KeyboardProps) => {
  const reColor = (i: number, j: number) => {
    if (
      KeyboardItems[i][j] === ["AC", "±", "%", "÷"][j] ||
      KeyboardItems[i][j] === "*" ||
      KeyboardItems[i][j] === "+" ||
      KeyboardItems[i][j] === "-"
    ) {
      return "btn";
    } else if (KeyboardItems[i][j] === "=") {
      return "largeBtn";
    } else {
      return "background";
    }
  };

  const handleKeyPress = (key: string) => {
    if (key === "=") {
      try {
        const calculatedResult = eval(operation);
        setResult(calculatedResult.toString());
      } catch (error) {
        setResult("Error");
      }
    } else if (key === "AC") {
      setOperation("");
      setResult("");
    } else {
      setOperation((prevInput) => prevInput + key);
      setResult("");
    }
  };

  return (
    <Div w={width} h={KeyboardHeight} pb={Platform.OS == "android" ? 50 : 20}>
      {KeyboardItems.map((row, i) => (
        <Div
          key={i}
          flexDir="row"
          flex={1}
          style={{ gap: 10 }}
          p={16}
          justifyContent="space-around"
        >
          {row.map((key, j) => (
            <TouchableOpacity
              key={j}
              style={{
                flex: KeyboardItems[i][j] == "=" ? 2 : 1,
              }}
              onPress={() => handleKeyPress(KeyboardItems[i][j])}
            >
              <Div
                justifyContent="center"
                alignItems="center"
                flex={1}
                style={{ borderRadius: 15 }}
                bg={reColor(i, j)}
              >
                <Text fontSize={20} color="text">
                  {key}
                </Text>
              </Div>
            </TouchableOpacity>
          ))}
        </Div>
      ))}
    </Div>
  );
};

export default Keyboard;
