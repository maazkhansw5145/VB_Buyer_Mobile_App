import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import ItemCard from "../../Components/ItemCard";
import Loading from "../../Components/Special/Loading";
import {
  getNearbyMallItems,
  setNearbyItemsCategory,
} from "../../Redux/Actions/buyerActions";
import screenWidth from "../../Constants/screenWidth";
import FloatingButton from "../../Components/FloatingButton";
import Categories from "./Categories";
import NoItem from "./NoItem";

function NearbyItemsScreen(props) {
  const [nearbyItems, setNearbyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMoreItems, setLoadingMoreItems] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [allItemsLoaded, setAllItemsLoaded] = useState(false);

  useEffect(() => {
    if (props.auth.location) {
      if (!props.nearby_items || props.nearby_items.length === 0) {
        props.getNearbyMallItems(
          props.auth.location,
          props.category,
          null,
          nearbyItems.length
        );
      }
    }
    if (
      props.nearby_items &&
      props.nearby_items.length !== 0 &&
      nearbyItems.length !== props.nearby_items.length
    ) {
      setNearbyItems(props.nearby_items);
      setLoading(false);
    }
  }, [props.auth.location]);

  useEffect(() => {
    if (props.nearby_items) {
      setNearbyItems(props.nearby_items);
      setLoading(false);
      setLoadingMoreItems(false);
    }
  }, [props.nearby_items]);

  useEffect(() => {
    if (loadingMoreItems && props.msg === "No More Items") {
      setLoadingMoreItems(false);
      setLoading(false);
      setAllItemsLoaded(true);
    }
  }, [props.msg, loadingMoreItems]);

  const reFetch = () => {
    if (props.category !== "") {
      props.getNearbyMallItems(props.auth.location, props.category, null, 0);
      setAllItemsLoaded(false);
      setRefreshing(false);
    } else {
      changeCategory("random");
      setRefreshing(false);
    }
  };

  const changeCategory = (newCategory) => {
    props.getNearbyMallItems(props.auth.location, newCategory, null, 0);
    props.setNearbyItemsCategory(newCategory);
    setSearchString("");
    setLoading(true);
    setAllItemsLoaded(false);
  };

  const searchItem = (searchString) => {
    props.getNearbyMallItems(props.auth.location, null, searchString, 0);
    props.setNearbyItemsCategory("");
    setLoading(true);
    setAllItemsLoaded(false);
    setSearchString(searchString);
  };

  const loadMoreItems = (lengthOfItems) => {
    if (props.category !== "") {
      setLoadingMoreItems(true);
      props.getNearbyMallItems(
        props.auth.location,
        props.category,
        null,
        lengthOfItems
      );
    }
    if (searchString.length !== "") {
      setLoadingMoreItems(true);
      props.getNearbyMallItems(
        props.auth.location,
        null,
        searchString,
        lengthOfItems
      );
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View>
        {/* <ScrollView> */}
        <Categories setCategory={changeCategory} category={props.category} />
        {loading ? (
          <Loading />
        ) : !loading && nearbyItems.length === 0 ? (
          <NoItem searchString={searchString} />
        ) : (
          <FlatList
            data={nearbyItems}
            numColumns={screenWidth()}
            onRefresh={() => {
              setRefreshing(true);
              reFetch();
            }}
            refreshing={refreshing}
            columnWrapperStyle={{ justifyContent: "space-around",marginBottom:15}}
            renderItem={(item) => (
              <ItemCard item={item} navigation={props.navigation} />
            )}
            keyExtractor={(item) => item._id}
            style={{ marginBottom: 110 }}
            onEndReachedThreshold={0.2}
            onEndReached={() => {
              !allItemsLoaded &&
                !loadingMoreItems &&
                loadMoreItems(nearbyItems.length);
            }}
            ListFooterComponent={() =>
              loadingMoreItems ? <Loading /> : <View style={styles.dot} />
            }
          />
        )}
        {/* </ScrollView> */}
      </View>
      <FloatingButton from="NearbyItems" searchNearby={searchItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    marginVertical: 15,
    alignSelf: "center",
    backgroundColor: "gray",
    borderRadius: 50,
    width: 10,
    height: 10,
  },
});

const mapStateToProps = (state) => ({
  msg: state.buyer.msg,
  auth: state.auth,
  nearby_items: state.buyer.nearby_items,
  category: state.buyer.nearby_items_category,
});

export default connect(mapStateToProps, {
  getNearbyMallItems,
  setNearbyItemsCategory,
})(NearbyItemsScreen);
