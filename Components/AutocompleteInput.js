import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import Autocomplete from "react-native-autocomplete-input";
const AutocompleteInput = (props) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (props.from === "FastFood") {
      setItems([
        "burger",
        "pizza",
        "shwarma",
        "zinger burger",
        "deal",
        "soft drinks",
      ]);
    } else {
      setItems([
        "watches",
        "shoes",
        "jackets",
        "hoodie",
        "electric heater",
        "glasses",
        "kids toys",
        "shalwar qameez",
        "jeans",
        "t shirts",
        "led bulb",
        "pants",
        "mobile phone",
      ]);
    }
  }, []);

  const findItem = (query) => {
    setSelectedValue(query);
    props.setSearchString(query);
    if (query) {
      const regex = new RegExp(`${query.trim()}`, "i");
      setFilteredItems(items.filter((item) => item.search(regex) >= 0));
    } else {
      setFilteredItems([]);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Autocomplete
          inputContainerStyle={styles.inputContainerStyle}
          renderTextInput={() => (
            <TextInput
              style={{
                color: "black",
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10,
              }}
              placeholder="Enter Item name"
              onChangeText={(text) => findItem(text)}
              value={selectedValue}
            />
          )}
          data={filteredItems}
          flatListProps={{
            keyExtractor: (item) => item,
            renderItem: ({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedValue(item);
                  props.setSearchString(item);
                }}
              >
                <Text style={{ padding: 10,color:"white",fontWeight:'bold',fontSize:18,backgroundColor:'black' }}>{item}</Text>
              </TouchableOpacity>
            ),
          }}
          listContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.1)",
    height: "40%",
    padding: 5,
  },
  inputContainerStyle: {
    borderRadius: 10,
    padding: 5,
  },
  listContainer: {
    marginTop: 5,
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 20,
  },
});

export default AutocompleteInput;
