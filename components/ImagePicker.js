import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { CAMERA } from "expo-permissions";
import { Camera } from "expo-camera";

const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {
    const result = await Camera.requestCameraPermissionsAsync();
    if (result.status !== "granted") {
      Alert.alert("No permission!", "You need to allow access to the camera.", [
        { text: "Ok" },
      ]);
      return false;
    }
    return true;
  };

  const takePhotoHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take Photo"
        color={Colors.primary}
        onPress={takePhotoHandler}
      />
    </View>
  );
};

export default ImgPicker;

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
