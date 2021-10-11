import React, { FunctionComponent, useState } from 'react'
import {
    StyleSheet,
    View,
    ViewStyle,
    FlatList,
    TouchableOpacity,
    Text
  } from 'react-native'
import { TextInput } from 'react-native-paper';
import { PredictionType } from './home'

type SearchBarProps = {
    value: string
    style?: ViewStyle | ViewStyle[]
    onChangeText: (text: string) => void
    predictions: PredictionType[]
    showPredictions: boolean
    onPredictionTapped: (placeId: string, description: string) => void
  }

const SearchAutoComplete: FunctionComponent<SearchBarProps> = props => {
    const [inputSize, setInputSize] = useState({ width: 0, height: 0 })

    const {
        value,
        style,
        onChangeText,
        onPredictionTapped,
        predictions,
        showPredictions
      } = props


    const passedStyles = Array.isArray(style) ? Object.assign({}, ...style) : style

    const inputBottomRadius = showPredictions ?
    {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    }
    :
    {
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20
    }
    
    const _renderPredictions = (predictions: PredictionType[]) => {
        const {
          predictionsContainer,
          predictionRow
        } = styles
        const calculatedStyle = { 
          width: inputSize.width
        }
        
        return (
          <FlatList
            data={predictions}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={predictionRow}
                  onPress={() => onPredictionTapped(item.place_id, item.description)}
                >
                  <Text
                    numberOfLines={1}
                  >
                    {item.description}
                  </Text>
                </TouchableOpacity>
              )
            }}
            keyExtractor={(item) => item.place_id}
            keyboardShouldPersistTaps='handled'
            style={[predictionsContainer, calculatedStyle]}
          />
        )
      }

      return (
        <View style={[{ ...passedStyles }]}>
          <TextInput
            style={[inputBottomRadius]}
            label='Google Place Autocomplete'
            mode='outlined'
            value={value}
            onChangeText={onChangeText}
            returnKeyType='search'
            onLayout={(event) => {
              const { height, width } = event.nativeEvent.layout
              setInputSize({ height, width })
            }}
          />
          {showPredictions && _renderPredictions(predictions)}
        </View>
      )
    }

const styles = StyleSheet.create({
  predictionsContainer: {
    backgroundColor: '#cfcfcf',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  predictionRow: {
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }
});

export { SearchAutoComplete };
