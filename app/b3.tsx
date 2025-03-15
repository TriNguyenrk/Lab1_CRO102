import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const CustomInput: React.FC<{  
    placeholder: string; 
    validate: (text: string) => string | null; 
    submitted: boolean; 
    value: string; 
    onChangeText: (text: string) => void;
    }> = ({ placeholder, validate, submitted, value, onChangeText }) => {
  const [isFocused, setIsFocused] = useState(false);
  const error = submitted ? validate(value) : null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title <Text style={{ color: 'red' }}>*</Text></Text>
      <TextInput
        style={[styles.input, 
          isFocused && styles.inputFocused, 
          submitted && error ? styles.inputError : submitted && !error && value ? styles.inputValid : null]}
        placeholder={placeholder}
        placeholderTextColor="#ccc"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChangeText={onChangeText}
        value={value}
      />
      {submitted && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const App = () => {
  const [submitted, setSubmitted] = useState(false);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");

  const validateInput = (text:any) => {
    return text.length < 5 ? "Cảnh báo: cần nhập trên 5 kí tự!!! " : null;
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <View style={styles.wrapper}>
      <CustomInput 
        placeholder="Place holder 1" 
        validate={validateInput} 
        submitted={submitted}
        value={inputValue1}
        onChangeText={setInputValue1}
      />
      <CustomInput 
        placeholder="Place holder 2" 
        validate={validateInput} 
        submitted={submitted}
        value={inputValue2}
        onChangeText={setInputValue2}
      />
      <CustomInput 
        placeholder="Place holder 3" 
        validate={validateInput} 
        submitted={submitted}
        value={inputValue3}
        onChangeText={setInputValue3}
      />
      <TouchableOpacity 
        style={[styles.submitButton, submitted && !validateInput(inputValue1) && !validateInput(inputValue2) && !validateInput(inputValue3) ? styles.submitSuccess : {}]} 
        onPress={handleSubmit}
      >
        <Text style={styles.submitText}>{submitted && !validateInput(inputValue1) && !validateInput(inputValue2) && !validateInput(inputValue3) ? "Success!" : "Submit"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  container: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  inputFocused: {
    borderColor: "#007BFF",
    backgroundColor: "#E6F0FF",
  },
  inputValid: {
    borderColor: "#666",
    backgroundColor: "#e1e1ef",
  },
  inputError: {
    borderColor: "#FF0000",
    backgroundColor: "#FFE6E6",
  },
  errorText: {
    color: "#FF0000",
    marginTop: 9,
    fontSize:16
  },
  submitButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  submitSuccess: {
    backgroundColor: "#28A745",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default App;