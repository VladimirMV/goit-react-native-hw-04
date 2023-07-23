import { useEffect, useState } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";

import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

import {
  Dimensions,
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

import SvgTrash from "../assets/svg/SvgTrash";
import SvgLocation from "../assets/svg/SvgLocation";
import SvgLoadPost from "../assets/svg/SvgLoadPost";

const CreatePostsScreen = () => {
  // Инициализация хуков для управления навигацией и фокусом экрана
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // Состояния компонента
  const [hasPermission, setHasPermission] = useState(null); // Состояние разрешения на использование камеры
  const [cameraRef, setCameraRef] = useState(null); // Ссылка на компонент камеры

  const [postImg, setPostImg] = useState(""); // Ссылка на изображение, которое будет опубликовано
  const [postName, setPostName] = useState(""); // Название поста
  const [postAddress, setPostAddress] = useState(""); // Адрес поста
  const [postLocation, setPostLocation] = useState(null); // Геолокационные координаты поста

  const [currentFocused, setCurrentFocused] = useState(""); // Хранит информацию о текущем активном поле ввода
  const keyboardVerticalOffset = 150; // Отступ клавиатуры от элемента с фокусом в пикселях

  // Эффект, выполняемый при первой загрузке компонента
  useEffect(() => {
    // Инициализация состояния разрешения на использование камеры
    setPostImg("");
    setPostLocation(null);

    // Запрос разрешения использования камеры и медиабиблиотеки
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();

    // Запрос разрешения доступа к геолокации
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  // Функция для добавления геолокации и адреса по текущему местоположению
  const addImageLocation = async () => {
    // Получение текущих геолокационных координат
    const location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    // Получение адреса по текущим геолокационным координатам
    const [address] = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    // Установка состояний с адресом и геолокацией
    setPostAddress(address.city);
    setPostLocation(coords);
  };

  // Функция для очистки формы
  const clearForm = () => {
    setPostImg("");
    setPostName("");
    setPostAddress("");
    setPostLocation(null);
  };

  // Функция, вызываемая при попытке опубликовать пост
  const onSubmitPost = () => {
    // Проверка на заполнение всех обязательных полей
    if (!postImg || !postName || !postLocation)
      return console.warn("Завантажте фото та заповніть поля");

    // Отладочный вывод информации о посте
    console.log({ postImg, postName, postAddress, postLocation });

    // Закрытие клавиатуры и переход на другой экран с передачей данных о посте
    handleKeyboardHide();
    navigation.navigate("DefaultPosts", {
      postImg,
      postName: postName.trim(),
      postAddress: postAddress.trim(),
      postLocation,
    });
    clearForm();
  };

  // Функция для загрузки изображения поста
  const onLoadPostImg = async () => {
    // Если есть ссылка на компонент камеры
    if (cameraRef) {
      try {
        // Сделать снимок с камеры и получить ссылку на изображение
        const { uri } = await cameraRef.takePictureAsync();
        // Создание медиа-ресурса из полученного изображения
        await MediaLibrary.createAssetAsync(uri);
        // Установка ссылки на изображение в состояние компонента
        setPostImg(uri);
      } catch (error) {
        console.log("Error > ", error.message);
      }
    }
    // Добавление геолокации и адреса по текущему местоположению
    addImageLocation();
  };

  // Функция для установки текущего активного поля ввода
  const handleFocus = (currentFocusInput = "") => {
    setCurrentFocused(currentFocusInput);
  };

  // Функция для скрытия клавиатуры
  const handleKeyboardHide = () => {
    setCurrentFocused("");
    Keyboard.dismiss();
  };

  // Функция для обработки возврата на предыдущий экран
  const handleGoBack = () => {
    clearForm();
    navigation.goBack();
  };

  // Рендер компонента в зависимости от состояния разрешения на использование камеры
  if (hasPermission === null) {
    return <View />; // Пока не получено разрешение, отображается пустой контейнер
  }
  if (hasPermission === false) {
    return <Text> No access to camera</Text>; // Если разрешение отклонено, выводится текст с информацией
  }

  // Возвращаемый JSX для компонента
  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <View style={styles.container}>
        {/* ... здесь остальной JSX компонента ... */}
        <View style={styles.loadWrapper}>
          <View style={styles.postImgWrapper}>
            {/* Проверка наличия загруженного изображения для отображения */}
            {postImg ? (
              <>
                {/* Отображение загруженного изображения */}
                <Image style={styles.bgImage} source={{ uri: postImg }} />
                {/* Кнопка для повторной загрузки изображения */}
                <TouchableOpacity
                  style={{
                    ...styles.loadBtn,
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                  }}
                  onPress={onLoadPostImg}
                >
                  <SvgLoadPost
                    style={styles.loadBtnContent}
                    fillColor={"#ffffff"}
                  />
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
                  ref={setCameraRef}
                >
                  {/* Кнопка для загрузки изображения */}
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
                </Camera>
              )
            )}
          </View>
          <Text style={styles.loadWrapperText}>
            {postImg ? "Редагувати фото" : "Завантажте фото"}
          </Text>
        </View>
        {/* ... Продолжение JSX компонента ... */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={keyboardVerticalOffset}
          style={styles.keyboardView}
        >
          <View>
            {/* Поле ввода для названия поста */}
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
            {/* Обертка для поля ввода адреса */}
            <View
              style={{
                ...styles.locationInputWrapper,
                borderColor:
                  currentFocused === "location" ? "#ff6c00" : "#e8e8e8",
              }}
            >
              {/* Иконка местоположения */}
              <SvgLocation style={styles.btnLoaction} />
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
          style={{
            ...styles.btn,
            backgroundColor:
              !postImg || !postName.trim() || !postLocation
                ? "#f6f6f6"
                : "#ff6c00",
          }}
          onPress={onSubmitPost}
        >
          <Text
            style={{
              ...styles.btnText,
              color:
                !postImg || !postName.trim() || !postLocation
                  ? "#bdbdbd"
                  : "#ffffff",
            }}
          >
            Опубліковати
          </Text>
        </TouchableOpacity>

        {/* Кнопка "корзина" для возврата на предыдущий экран */}
        <TouchableOpacity style={styles.btnTrash} onPress={handleGoBack}>
          <SvgTrash stroke={"#dbdbdb"} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  // Стили компонента
  container: {
    flex: 1,

    paddingHorizontal: 16,
    paddingVertical: 32,

    backgroundColor: "#fff",

    resizeMode: "cover",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  // ... Продолжение стилей компонента ...
});
