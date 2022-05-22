import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import ItemCard from "../../Components/ItemCard";
import Loading from "../../Components/Special/Loading";
import {
  getMallItems,
  setMallItemsCategory,
} from "../../Redux/Actions/buyerActions";
import screenWidth from "../../Constants/screenWidth";
import FloatingButton from "../../Components/FloatingButton";
import Categories from "./Categories";
import NoItem from "./NoItem";

function MallItemsScreen(props) {
  const [mallItems, setMallItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  // const [category, setCategory] = useState("random");
  const [loadingMoreItems, setLoadingMoreItems] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [allItemsLoaded, setAllItemsLoaded] = useState(false);

  useEffect(() => {
    if (!props.mall_items || props.mall_items.length === 0) {
      props.getMallItems(props.category, 0, null);
    }
    if (
      props.mall_items &&
      props.mall_items.length !== 0 &&
      mallItems.length !== props.mall_items.length
    ) {
      setMallItems(props.mall_items);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (props.mall_items) {
      setMallItems(props.mall_items);
      setLoading(false);
      setLoadingMoreItems(false);
    }
  }, [props.mall_items]);

  useEffect(() => {
    if (loadingMoreItems && props.msg === "No More Items") {
      setLoadingMoreItems(false);
      setLoading(false);
      setAllItemsLoaded(true);
    }
  }, [props.msg, loadingMoreItems]);

  const reFetch = () => {
    if (props.category !== "") {
      props.getMallItems(props.category, 0, null);
      setAllItemsLoaded(false);
      setRefreshing(false);
    } else {
      changeCategory("random");
      setRefreshing(false);
    }
  };

  const changeCategory = (newCategory) => {
    props.getMallItems(newCategory, 0, null);
    props.setMallItemsCategory(newCategory);
    setSearchString("");
    setLoading(true);
    setAllItemsLoaded(false);
  };

  const searchItem = (searchString) => {
    props.getMallItems(null, 0, searchString);
    props.setMallItemsCategory("");
    setLoading(true);
    setAllItemsLoaded(false);
    setSearchString(searchString);
  };

  const loadMoreItems = (lengthOfItems) => {
    if (props.category !== "") {
      setLoadingMoreItems(true);
      props.getMallItems(props.category, lengthOfItems, null);
    }
    if (searchString !== "") {
      setLoadingMoreItems(true);
      props.getMallItems(null, lengthOfItems, searchString);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Categories setCategory={changeCategory} category={props.category} />
        {loading ? (
          <Loading />
        ) : !loading && mallItems.length === 0 ? (
          <NoItem searchString={searchString} />
        ) : (
          <FlatList
            data={mallItems}
            numColumns={screenWidth()}
            onRefresh={() => {
              setRefreshing(true);
              reFetch();
            }}
            columnWrapperStyle={{
              justifyContent: "space-around",
              marginBottom: 15,
            }}
            refreshing={refreshing}
            renderItem={(item) => (
              <ItemCard item={item} navigation={props.navigation} />
            )}
            keyExtractor={(item) => item._id}
            style={{ marginBottom: 110 }}
            onEndReachedThreshold={0.2}
            onEndReached={() => {
              !allItemsLoaded &&
                !loadingMoreItems &&
                loadMoreItems(mallItems.length);
            }}
            ListFooterComponent={() =>
              loadingMoreItems ? <Loading /> : <View style={styles.dot} />
            }
          />
        )}
      </View>
      <FloatingButton
        from="Mall"
        searchMall={searchItem}
        setActiveTab={props.setActiveTab}
        navigation={props.navigation}
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
  msg: state.buyer.msg,
  mall_items: state.buyer.mall_items,
  category: state.buyer.mall_items_category,
});

export default connect(mapStateToProps, { getMallItems, setMallItemsCategory })(
  MallItemsScreen
);
