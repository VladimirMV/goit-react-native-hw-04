import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";

import {
  TouchableWithoutFeedback,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import SvgTrash from "../assets/svg/SvgTrash";
import SvgLocation from "../assets/svg/SvgLocation";
import SvgLoadPost from "../assets/svg/SvgLoadPost";
import { useNavigation } from "@react-navigation/native";

const CreatePostsScreen = () => {
  const navigation = useNavigation();

  const [postImg, setPostImg] = useState(null);
  const [postName, setPostName] = useState("");
  const [postlocation, setPostLocation] = useState("");

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [currentFocused, setCurrentFocused] = useState("");

  const clearForm = () => {
    setPostImg("");
    setPostName("");
    setPostLocation("");
  };

  const onSubmitPost = () => {
    if (!postImg || !postName || !postlocation)
      return console.warn("Будь ласка завантажте фото та заповніть поля");

    console.log({ postImg, postName, postlocation });

    handleKeyboardHide();
    navigation.navigate("Posts", { post: { postImg, postName, postlocation } });
    clearForm();
  };

  const onLoadPostImg = async () => {
    const PostImg = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });

    if (PostImg.type === "cancel") return setPostImg(null);

    setPostImg(PostImg);
  };
  const handleFocus = (currentFocusInput = "") => {
    setIsShowKeyboard(true);
    setCurrentFocused(currentFocusInput);
  };
  const handleKeyboardHide = () => {
    setIsShowKeyboard(false);
    setCurrentFocused("");
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <View
        style={{
          ...styles.container,
          justifyContent: isShowKeyboard ? "center" : "flex-start",
        }}
      >
        <View style={styles.loadWrapper}>
          <ImageBackground style={styles.bgImage} source={postImg}>
            <TouchableOpacity
              style={{
                ...styles.loadBtn,
                backgroundColor: postImg
                  ? "rgba(255, 255, 255, 0.3)"
                  : "#ffffff",
              }}
              onPress={onLoadPostImg}
            >
              <SvgLoadPost
                style={styles.loadBtnContent}
                fillColor={postImg ? "#ffffff" : "#bdbdbd"}
              />
            </TouchableOpacity>
          </ImageBackground>
          <Text style={styles.loadWrapperText}>
            {postImg ? "Редагувати фото" : "Завантажте фото"}
          </Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <View>
            <TextInput
              style={{
                ...styles.input,
                borderColor:
                  currentFocused === "postName" ? "#ff6c00" : "#e8e8e8",
              }}
              placeholderTextColor="#bdbdbd"
              placeholder="Назва..."
              autoComplete="off"
              autoCapitalize="none"
              value={postName}
              onChangeText={setPostName}
              onFocus={() => handleFocus("postName")}
            />
            <View
              style={{
                ...styles.locationInputWrapper,
                borderColor:
                  currentFocused === "location" ? "#ff6c00" : "#e8e8e8",
              }}
            >
              <SvgLocation style={styles.btnLoaction} />
              <TextInput
                style={styles.inputLocation}
                placeholderTextColor="#bdbdbd"
                placeholder="Місцевість..."
                autoComplete="off"
                autoCapitalize="none"
                value={postlocation}
                onChangeText={setPostLocation}
                onFocus={() => handleFocus("location")}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={{
            ...styles.btn,
            backgroundColor:
              !postImg || !postName || !postlocation ? "#f6f6f6" : "#ff6c00",
          }}
          onPress={onSubmitPost}
        >
          <Text
            style={{
              ...styles.btnText,
              color:
                !postImg || !postName || !postlocation ? "#bdbdbd" : "#ffffff",
            }}
          >
            Опубліковати
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 16,
    paddingVertical: 32,

    backgroundColor: "#fff",

    resizeMode: "cover",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  loadWrapper: {
    marginBottom: 32,
  },
  bgImage: {
    alignItems: "center",
    justifyContent: "center",

    height: 240,
    maxHeight: 240,
    Width: 342,

    marginBottom: 8,

    backgroundColor: "#F6F6F6",
    border: " 1px solid #E8E8E8",
    borderRadius: 8,
  },
  loadBtn: {
    alignItems: "center",
    alignContent: "center",

    width: 60,
    height: 60,

    padding: 18,

    color: "#bdbdbd",
    backgroundColor: "#ffffff",
    borderRadius: 50,
  },
  loadBtnContent: {},
  loadWrapperText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,

    color: "#BDBDBD",
  },

  locationInputWrapper: {
    position: "relative",
    height: 50,
    paddingVertical: 16,

    alignContent: "center",

    color: "#212121",
    backgroundColor: "#ffffff",

    borderBottomWidth: 1,
    borderColor: "#e8e8e8",
  },
  input: {
    height: 50,
    fontSize: 16,
    paddingVertical: 16,
    marginBottom: 16,

    color: "#212121",
    backgroundColor: "#ffffff",

    borderBottomWidth: 1,
    borderColor: "#e8e8e8",
  },
  inputLocation: {
    fontSize: 16,

    marginLeft: 28,

    color: "#212121",
    backgroundColor: "#ffffff",
  },
  btnLoaction: {
    position: "absolute",
    left: 0,
    bottom: 16,
    alignSelf: "center",

    backgroundColor: "transparent",
  },
  btn: {
    marginTop: 32,
    marginBottom: 120,

    paddingVertical: 16,

    backgroundColor: "#f6f6f6",
    borderRadius: 100,
  },
  btnText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,

    textAlign: "center",

    color: "#bdbdbd",
  },
});
