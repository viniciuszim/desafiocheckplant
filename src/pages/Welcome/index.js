import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  StatusBar,
  Animated,
  SafeAreaView,
  ScrollView,
  Platform,
  PermissionsAndroid,
  NativeModules,
  Linking,
  Alert,
} from 'react-native';

import MapView, { Callout } from 'react-native-maps';

import Location from '~/util/location';
import Geocode from 'react-geocode';

import { showMessage } from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './styles';

import stringsUtil from '~/util/strings';

export default class Welcome extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
    markersSynchronized: [
      {
        key: 0,
        coordinate: {
          latitude: -16.6769,
          longitude: -49.2648,
        },
        date: '24/03/2019',
        description: 'This is the best place in Portland',
      },
    ],
    markersNotSynchronized: [
      {
        key: 1,
        coordinate: {
          latitude: -16.6870,
          longitude: -49.2548,
        },
        date: '25/03/2019',
        description: 'This is the second best place in Portland',
      },
    ],
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ titleParam: stringsUtil.pages.welcomeTitle });
    navigation.setParams({ handleLeftClick: this.handleNewInfo.bind(this) });
    navigation.setParams({ handleRightClick: this.handleSync.bind(this) });

    Location.checkPermissions(this.updateMap);
  }

  updateMap = (coords) => {
    const { region } = this.state;
    this.setState({
      region: {
        ...region,
        // latitude: coords.latitude,
        // longitude: coords.longitude,
        latitude: -16.688,
        longitude: -49.2558,
      },
    });
  }

  onRegionChange = (region) => {
    this.setState({ region });
  };

  handleNewInfo = async () => {
    const { navigation } = this.props;
    const { region } = this.state;
    navigation.navigate('NewInfo', {
      titleParam: stringsUtil.pages.newInfoTitle,
      regionParam: region,
    });
  };

  handleSync = async () => {
    console.tron.log('handleSync');

    showMessage({
      message: 'Dados sincronizados com o servidor!',
      type: 'success',
      icon: 'success',
    });
  };

  render() {
    const {
      region, markersSynchronized, markersNotSynchronized, loading,
    } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Spinner
          visible={loading}
          textContent="Sincronização em andamento..."
          textStyle={styles.spinnerTextStyle}
        />

        <MapView
          style={styles.map}
          loadingEnabled
          region={region}
          showsUserLocation
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
                  <Text style={styles.date}>
                    Data:
                    {' '}
                    {marker.date}
                  </Text>
                  <ScrollView>
                    <Text style={styles.info}>{marker.description}</Text>
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
              <Callout style={styles.calloutView}>
                <View style={styles.calloutView}>
                  <Text style={styles.date}>
                    Data:
                    {' '}
                    {marker.date}
                  </Text>
                  <ScrollView>
                    <Text style={styles.info}>{marker.description}</Text>
                  </ScrollView>
                </View>
              </Callout>
            </MapView.Marker>
          ))}
        </MapView>
      </SafeAreaView>
    );
  }
}
