import React, { useEffect, useState, useRef } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";

import SvgLoadPost from "../assets/svg/SvgLoadPost";

const CreatePostsScreen = () => {
  // Hooks and state variables for managing the component's behavior
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const cameraRef = useRef(null);

  const [hasPermission, setHasPermission] = useState(null);
  const [postImg, setPostImg] = useState("");
  const [postName, setPostName] = useState("");
  const [postAddress, setPostAddress] = useState("");
  const [postLocation, setPostLocation] = useState(null);
  const [currentFocused, setCurrentFocused] = useState("");
  const keyboardVerticalOffset = -150;

  // useEffect hook to handle component initialization
  useEffect(() => {
    // Function to request camera, media library, and location permissions
    const getPermissions = async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(cameraStatus === "granted");

      const { status: locationStatus } =
        await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== "granted") {
        console.log("Permission to access location was denied");
      }
    };

    // Clear the form and get permissions when the component mounts
    setPostImg("");
    setPostLocation(null);
    getPermissions();
  }, []);

  // Function to add image location using Expo Location API
  const addImageLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    const [address] = await Location.reverseGeocodeAsync(coords);

    setPostAddress(address.city);
    setPostLocation(coords);
  };

  // Function to clear form input fields
  const clearForm = () => {
    setPostImg("");
    setPostName("");
    setPostAddress("");
    setPostLocation(null);
  };

  // Function to handle post submission
  const onSubmitPost = () => {
    // if (!postImg || !postName || !postLocation) {
    //   console.warn("Upload a photo and all the fields");
    //   return;
    // }

    console.log({ postImg, postName, postAddress, postLocation });

    handleKeyboardHide();
    navigation.navigate("MainPosts", {
      postImg,
      postName: postName.trim(),
      postAddress: postAddress.trim(),
      postLocation,
    });
    console.log({ postImg, postName, postAddress, postLocation });
    clearForm();
  };

  // Function to load the post image from the camera
  const onLoadPostImg = async () => {
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        await MediaLibrary.createAssetAsync(uri);
        setPostImg(uri);
      } catch (error) {
        console.log("Error > ", error.message);
      }
    }
    addImageLocation();
  };

  // Function to handle input focus and keyboard hiding
  const handleFocus = (currentFocusInput) => {
    setCurrentFocused(currentFocusInput);
  };

  // Function to hide the keyboard and reset the current focused input
  const handleKeyboardHide = () => {
    setCurrentFocused("");
    Keyboard.dismiss();
  };

  // Function to handle navigating back and clearing the form
  const deletePost = () => {
    clearForm();
    // navigation.goBack();
  };

  // Conditional rendering based on camera permission status
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text> No access to camera</Text>;
  }

  // Return JSX for the CreatePostsScreen component
  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <View style={styles.container}>
        <View style={styles.loadWrapper}>
          <View style={styles.postImgWrapper}>
            {/* Проверка наличия загруженного изображения для отображения */}
            {postImg ? (
              <>
                {/* Отображение загруженного изображения */}
                <Image style={styles.bgImage} source={{ uri: postImg }} />
                {/* Кнопка для повторной загрузки изображения */}
                <TouchableOpacity
                  style={styles.loadBtnOn}
                  // onPress={onLoadPostImg}
                 onPress={deletePost}
                >
                  <SvgLoadPost fillColor={ "#ffffff" } />
                </TouchableOpacity>
              </>
            ) : (
              // Если изображение не загружено, и экран активен, отображаем компонент камеры
              isFocused && (
                <Camera
                  style={styles.camera}
                  ratio="1:1"
                  zoom={0}
                  type={Camera.Constants.Type.back}
                  ref={cameraRef}
                >
                  {/* Кнопка для загрузки изображения */}
                  <TouchableOpacity
                    style={postImg ? styles.loadBtnOn : styles.loadBtn}
                    onPress={onLoadPostImg}
                  >
                    <SvgLoadPost fillColor={postImg ? "#ffffff" : "#bdbdbd"} />
                  </TouchableOpacity>
                </Camera>
              )
            )}
          </View>
          <Text style={styles.loadWrapperText}>
            {postImg ? "Редагувати фото" : "Завантажте фото"}
          </Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={keyboardVerticalOffset}
          style={styles.keyboardView}
        >
          <View>
            {/* Поле ввода для названия поста */}
            <TextInput
              style={[
                styles.input,
                currentFocused === "postName" && styles.inputFocused,
              ]}
              placeholderTextColor="#bdbdbd"
              placeholder="Назва..."
              autoComplete="off"
              autoCapitalize="none"
              value={postName}
              onChangeText={setPostName}
              onFocus={() => handleFocus("postName")}
            />
            {/* Обертка для поля ввода адреса */}
            <View
              style={[
                styles.input,
                currentFocused === "location" && styles.inputFocused,
              ]}
            >
              {/* Иконка местоположения */}
              <TouchableOpacity
                style={styles.btnLoaction}
                onPress={onSubmitPost}
              >
                <Feather
                  name="map-pin"
                  size={24}
                  color={postLocation ? "#ff6c00" : "#dbdbdb"}
                />
              </TouchableOpacity>

              {/* Поле ввода для адреса */}
              <TextInput
                style={styles.inputLocation}
                placeholderTextColor="#bdbdbd"
                placeholder="Місцевість..."
                autoComplete="off"
                autoCapitalize="none"
                value={postAddress}
                onChangeText={setPostAddress}
                onFocus={() => handleFocus("location")}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        {/* Кнопка для опубликования поста */}
        <TouchableOpacity
          style={[
            styles.btn,
            (!postImg || !postName.trim() || !postLocation) && styles.btnOn,
          ]}
          onPress={onSubmitPost}
        >
          <Text
            style={[
              styles.btnText,
              (!postImg || !postName.trim() || !postLocation) &&
                styles.btnTextOn,
            ]}
          >
            Опубліковати
          </Text>
        </TouchableOpacity>
        {/* Кнопка "корзина" для удаления */}
        <TouchableOpacity style={styles.btnTrash} onPress={deletePost}>
          <Feather name="trash-2" style={styles.btnTrashIcon} size={24} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   justifyContent: "space-between",
 
    paddingHorizontal: 16,
    paddingVertical: 12,

    backgroundColor: "#fff",

    resizeMode: "cover",
  },

  loadWrapper: {
    marginBottom: 2,
  },
  postImgWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",

    height: 240,
    marginBottom: 8,
    backgroundColor: "#F6F6F6",
    border: "1px solid #E8E8E8",
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    alignItems: "center",
    justifyContent: "center",

    height: "100%",
    width: "100%",
  },

  bgImage: {
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    height: 240,
    maxHeight: 240,
    width: "100%",
    backgroundColor: "#000",
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
  loadBtnOn: {
    alignItems: "center",
    alignContent: "center",

    width: 60,
    height: 60,

    padding: 18,

    color: "#bdbdbd",
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  loadBtnContent: {
    fillColor: "#ffffff",
  },

  loadWrapperText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    // fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },

  locationInputWrapper: {
    position: "relative",
    height: 50,
    color: "#212121",
    backgroundColor: "#ffffff",

    borderBottomWidth: 1,
    borderColor: "#e8e8e8",
  },
  input: {
    height: 50,
    fontSize: 16,
    paddingVertical: 16,
    marginBottom: 8,

    color: "#212121",
    backgroundColor: "#ffffff",

    borderBottomWidth: 1,
    borderColor: "#e8e8e8",
  },
  inputFocused: {
    borderColor: "#ff6c00",
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
  btnLoactionOn: {
    position: "absolute",
    left: 0,
    bottom: 16,
    alignSelf: "center",

    backgroundColor: "transparent",
  },

  btn: {
    paddingVertical: 16,
    backgroundColor: "#ff6c00",
    borderRadius: 100,
  },
  btnOn: {
    backgroundColor: "#f6f6f6",
  },
  btnText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    // fontWeight: 400,
    fontSize: 16,

    textAlign: "center",
    color: "#ffffff",
  },
  btnTextOn: { color: "#bdbdbd" },

  btnTrash: {
  

    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",

    width: 70,
    height: 40,
    color: "#dbdbdb",
    // marginBottom: 10,
    // paddingVertical: 8,
    // paddingHorizontal: 8,

    backgroundColor: "#f6f6f6",
    borderRadius: 20,
  },
  btnTrashIcon: {
    color: "#bdbdbd",
    alignSelf: "center",
    alignItems: "center",
  },
});