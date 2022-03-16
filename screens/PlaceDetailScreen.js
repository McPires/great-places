import { StyleSheet, Text, View } from "react-native";
import React from "react";

const PlaceDetailScreen = (props) => {
  return (
    <View>
      <Text>PlaceDetailScreen</Text>
    </View>
  );
};

PlaceDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("placeTitle"),
  };
};

export default PlaceDetailScreen;

const styles = StyleSheet.create({});
