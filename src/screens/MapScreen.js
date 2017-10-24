import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Screen } from '../constants/Styles';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
class MapScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView.Animated
          style={styles.map}
          region={{
            latitude: 10.78825,
            longitude: 106.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView.Animated>
      </View>
    );
  }
}
export default MapScreen;