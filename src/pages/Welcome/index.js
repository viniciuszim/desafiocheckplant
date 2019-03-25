import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View, Text, StatusBar, Animated, SafeAreaView, ScrollView,
} from 'react-native';

import MapView, { Callout } from 'react-native-maps';

import styles from './styles';

export default class Welcome extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    region: {
      latitude: 45.52220671242907,
      longitude: -122.6653281029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
    markersSynchronized: [
      {
        key: 0,
        coordinate: {
          latitude: 45.524548,
          longitude: -122.6749817,
        },
        title: 'Best Place',
        description: 'This is the best place in Portland',
      },
    ],
    markersNotSynchronized: [
      {
        key: 1,
        coordinate: {
          latitude: 45.524698,
          longitude: -122.6655507,
        },
        title: 'Second Best Place',
        description: 'This is the second best place in Portland',
      },
    ],
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ titleParam: 'Checkplant' });
    navigation.setParams({ handleRightClick: this.handleNewInformations.bind(this) });
  }

  handleNewInformations = async () => {
    console.tron.log('handleNewInformations');
  };

  onRegionChange = (region) => {
    this.setState({ region });
  };

  render() {
    const { region, markersSynchronized, markersNotSynchronized } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <MapView
          style={styles.map}
          loadingEnabled
          region={region}
          onRegionChange={this.onRegionChange}
        >
          {markersSynchronized.map(marker => (
            <MapView.Marker key={marker.key} coordinate={marker.coordinate}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.View style={[styles.ring]} />
                <View style={styles.marker} />
              </Animated.View>
              <Callout style={styles.calloutView}>
                <View style={styles.calloutView}>
                  <Text style={styles.date}>Data: 20/08/2019</Text>
                  <ScrollView>
                    <Text style={styles.info}>
                      Bem-vindo Bem-vindo Bem-vindo Bem-vindo Bem-vindo Bem-vindo Bem-vindo
                      Bem-vindo Bem-vindo Bem-vindo Bem-vindo Bem-vindo Bem-vindo Bem-vindo
                      Bem-vindo Bem-vindo Bem-vindo Bem-vindo Bem-vindo Bem-vindo Bem-vindo
                      Bem-vindo Bem-vindo Bem-vindo Bem-vindo Bem-vindo Bem-vindo Bem-vindo
                      Bem-vindo Bem-vindo Bem-vindo Bem-vindo
                      {' '}
                    </Text>
                  </ScrollView>
                </View>
              </Callout>
            </MapView.Marker>
          ))}
          {markersNotSynchronized.map(marker => (
            <MapView.Marker key={marker.key} coordinate={marker.coordinate}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.View style={[styles.ringNotSynchronized]} />
                <View style={styles.markerNotSynchronized} />
              </Animated.View>
            </MapView.Marker>
          ))}
        </MapView>
      </SafeAreaView>
    );
  }
}
