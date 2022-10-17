import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const List = ({ searchPhrase, setClickedOnBar, data }) => {
  const navigation = useNavigation();

  const Item = ({ name, country, data }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        data && navigation.navigate("WeatherScreen", { itemData: data })
      }
    >
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.country}>{country}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    if (searchPhrase === "") {
      return <Item name={item.name} country={item.country} data={item} />;
    }

    if (
      item.name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item name={item.name} country={item.country} />;
    }

    if (
      item.country
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item name={item.name} country={item.country} />;
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClickedOnBar(false);
        }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});
