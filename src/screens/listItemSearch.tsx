import React, { useState } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, Alert } from 'react-native'
import { connect } from "react-redux";
import { removePlaces } from '../models/auto-complete/action';
import { ListText } from '../Component/text';
import { ListSeparator } from '../Component/separator';

const mapStateToProps = (state, props) => {
  const { searchItems } = state.search;
  return { searchItems };
};

const mapDispatchToProps = (dispatch, props) => ({
    removePlaces: (search) => dispatch(removePlaces(search))
});

const ListPlaceScreen = ({ removePlaces, searchItems }) =>{

  return (
    <View>
        <Text>* Long Press to Delete Places</Text>
        <FlatList
            data={searchItems}
            keyExtractor={(item) => item.id}
            style={styles.card}
            ItemSeparatorComponent={() => <ListSeparator />}
            renderItem={({ item }) => (
                <ListText
                    name={`Place: ${item.name}`}
                    onLongPress={() => Alert.alert(JSON.stringify(searchItems))}
                />
            )}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginTop: 20,
    paddingBottom: 10,
    borderRadius: 50
  }
});

const ListPlace = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPlaceScreen)

export { ListPlace };
