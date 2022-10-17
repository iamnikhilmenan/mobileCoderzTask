import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  View,
  ActivityIndicator,
} from "react-native";
import List from "../component/List";
import SearchBar from "../component/SearchBar";
import { Feather } from "@expo/vector-icons";

function CitySelectionScreen({ navigation, route }) {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [cityData, setCityData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        "http://52.73.146.184:3000/api/app/user/get-city-list?page=1&search=delhi"
      );
      const data = await apiResponse.json();
      setCityData(data.data.Record);
      data && setLoading(true);
      //   console.log(data.data.Record);
    };
    getData();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.header}>
          <Feather name="chevron-left" size={28} color="black" />
          <Text
            style={{
              color: "black",
              fontSize: 20,
              fontWeight: "700",
              paddingLeft: 10,
            }}
          >
            Change City
          </Text>
        </View>

        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClickedOnBar={setClicked}
        />

        {!loading ? (
          <ActivityIndicator />
        ) : (
          <List
            searchPhrase={searchPhrase}
            data={cityData}
            setClickedOnBar={setClicked}
          />
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "red",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : null,
  },

  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },

  header: {
    backgroundColor: "yellow",
    flexDirection: "row",
    padding: 12,
  },
});

export default CitySelectionScreen;
