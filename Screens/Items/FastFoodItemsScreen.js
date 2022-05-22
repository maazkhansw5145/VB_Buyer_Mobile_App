import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Loading from "../../Components/Special/Loading";
import { connect } from "react-redux";
import {
  getNearbyFastFood,
  setFastFoodSearchKeyword,
} from "../../Redux/Actions/buyerActions";
import NotInArea from "../../Components/NotInArea";
import screenWidth from "../../Constants/screenWidth";
import ItemCard from "../../Components/ItemCard";
import FloatingButton from "../../Components/FloatingButton";
import Categories from "./Categories";

export function FastfoodItemsSreen(props) {
  const [nearbyFastFood, setNearbyFastFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMoreItems, setLoadingMoreItems] = useState(false);
  const [allItemsLoaded, setAllItemsLoaded] = useState(false);

  useEffect(() => {
    if (props.auth.location) {
      if (!props.nearby_fastFood || props.nearby_fastFood.length === 0) {
        props.getNearbyFastFood(props.auth.location, props.search_keyword, 0);
      }
    }
    if (
      props.nearby_fastFood &&
      props.nearby_fastFood.length !== 0 &&
      nearbyFastFood.length !== props.nearby_fastFood.length
    ) {
      setNearbyFastFood(props.nearby_fastFood);
      setLoading(false);
    }
  }, [props.auth.location]);

  useEffect(() => {
    if (props.nearby_fastFood) {
      setNearbyFastFood(props.nearby_fastFood);
      setLoading(false);
      setLoadingMoreItems(false);
    }
  }, [props.nearby_fastFood]);

  useEffect(() => {
    if (loadingMoreItems && props.msg === "No More Fast Food") {
      setLoadingMoreItems(false);
      setLoading(false);
      setAllItemsLoaded(true);
    }
  }, [props.msg, loadingMoreItems]);

  const changeSearchKeyword = (newSearchKeyword) => {
    props.setFastFoodSearchKeyword(newSearchKeyword);
    setLoading(true);
    props.getNearbyFastFood(props.auth.location, newSearchKeyword, 0);
    setAllItemsLoaded(false);
  };

  const reFetch = () => {
    props.getNearbyFastFood(props.auth.location, props.search_keyword, 0);
    setRefreshing(false);
    setAllItemsLoaded(false);
  };

  const loadMoreItems = (lengthOfItems) => {
    setLoadingMoreItems(true);
    props.getNearbyFastFood(
      props.auth.location,
      props.search_keyword,
      lengthOfItems
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Categories
          changeSearchKeyword={changeSearchKeyword}
          searchKeyword={props.search_keyword}
          for={"fastFood"}
        />
        {loading ? (
          <Loading />
        ) : !loading && nearbyFastFood.length === 0 ? (
          <NotInArea random={props.search_keyword === "random"} />
        ) : (
          <FlatList
            data={nearbyFastFood}
            numColumns={screenWidth()}
            columnWrapperStyle={{ justifyContent: "space-around",marginBottom:15}}
            onRefresh={() => {
              setRefreshing(true);
              reFetch();
            }}
            refreshing={refreshing}
            renderItem={(item) => (
              <ItemCard item={item} navigation={props.navigation} />
            )}
            keyExtractor={(item) => item._id}
            onEndReachedThreshold={0.2}
            style={{ marginBottom: 110 }}
            onEndReached={() => {
              !allItemsLoaded &&
                !loadingMoreItems &&
                loadMoreItems(nearbyFastFood.length);
            }}
            ListFooterComponent={() =>
              loadingMoreItems ? <Loading /> : <View style={styles.dot} />
            }
          />
        )}
      </View>
      <FloatingButton from="FastFood" search={changeSearchKeyword} 
      />
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
  nearby_fastFood: state.buyer.nearby_fastFood,
  auth: state.auth,
  msg: state.buyer.msg,
  search_keyword: state.buyer.fast_food_search_keyword,
});

export default connect(mapStateToProps, {
  getNearbyFastFood,
  setFastFoodSearchKeyword,
})(FastfoodItemsSreen);
