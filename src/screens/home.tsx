import React, { useState } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import { ToastAndroid } from 'react-native';

import { SearchAutoComplete } from './autoComplete';
import { useDebounce } from '../hooks/useDebounce'
import { savePlaces } from '../models/auto-complete/action';

const GOOGLE_PACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place'

export type PredictionType = {
    description: string
    place_id: string
    reference: string
    matched_substrings: any[]
    tructured_formatting: Object
    terms: Object[]
    types: string[]
}

const mapStateToProps = (state, props) => {
    const { searchItems } = state.search;
    return { searchItems };
};

const mapDispatchToProps = (dispatch, props) => ({
    savePlaces: (search) => dispatch(savePlaces(search))
});

const showNewPlaceToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
};

const HomeScreen = ({ navigation }) => {
    const [search, setSearch] = useState({ term: '', fetchPredictions: false })
    const [showPredictions, setShowPredictions] = useState(false)
    const [predictions, setPredictions] = useState<PredictionType[]>([])
    
    const { container, body, buttonContainer, button } = styles

    const GOOGLE_API_KEY = 'AIzaSyD6udt9lX3lzeexUtArxdQmNIcH47chpMA'

    const onChangeText = async () => {
        if (search.term.trim() === '') return
        if (!search.fetchPredictions) return
        
        const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_API_KEY}&input=${search.term}`
        try {
          const result = await axios.request({
            method: 'post',
            url: apiUrl
          })
          if (result) {
            const { data: { predictions } } = result
            setPredictions(predictions)
            setShowPredictions(true)
          }
        } catch (e) {
          console.log(e)
        }
    }
    useDebounce(onChangeText, 100, [search.term])

    const onPredictionTapped = async (placeId: string, description: string) => {
        const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/details/json?key=${GOOGLE_API_KEY}&place_id=${placeId}`
        try {
          const result = await axios.request({
            method: 'post',
            url: apiUrl
          })
          if (result) {
            const { data: { result: { geometry: { location } } } } = result
            const { lat, lng } = location
            setShowPredictions(false)
            setSearch({ term: description, fetchPredictions: false })
          }
        } catch (e) {
          console.log(e)
        }
    }

    const validateInputForm = () => {
        return search.term !== ''
    }

    const onSaveClick = () => {
        console.log(search)
        if (validateInputForm()) {
            savePlaces(search);
            showNewPlaceToast('Successfully save place...');
        }
    };

  return (
    <SafeAreaView style={container}>
        <View style={body}>
            <SearchAutoComplete 
                value={search.term}
                onChangeText={(text) => {
                    setSearch({ term: text, fetchPredictions: true })
                }}
                showPredictions={showPredictions}
                predictions={predictions}
                onPredictionTapped={onPredictionTapped}
            />
            <View style={buttonContainer}>
                <Button 
                    style={button}
                    mode='outlined'
                    onPress={onSaveClick}>
                    Save
                </Button>
                <Button 
                    style={button}
                    mode='outlined'
                    onPress={() => setSearch({ term: '', fetchPredictions: false })}>
                    Clear Text
                </Button>
            </View>
            <Button
                mode='contained'
                onPress={() => navigation.navigate('Search History')}>
                    View Search History
            </Button>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        paddingHorizontal: 10,
        paddingTop: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20
    },
    button: {
        margin: 5
    }
});

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen)

export { Home };
