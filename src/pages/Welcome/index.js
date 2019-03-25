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
    navigation.setParams({ titleParam: 'Checkplant' });
    navigation.setParams({ handleRightClick: this.handleSync.bind(this) });

    this.checkPermissions();
  }

  checkPermissions = async () => {
    try {
      if (Platform.OS === 'ios') {
        this.requestPermissions();
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Localização',
            message:
              'Permitir acesso a sua localização para salvar os registros',
            buttonNeutral: 'Pergunte depois',
            buttonNegative: 'Continuar não permitindo',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.requestPermissions();
        } else {
          this.showAlert();
        }
      }
    } catch (err) {
      console.error(`An error occurred at checkPermissions -> ${err}`);
    }
  };

  requestPermissions = async () => {
    try {
      navigator.geolocation.getCurrentPosition(
        (response) => {
          // set Google Maps Geocoding API for purposes of quota management.
          Geocode.setApiKey(stringsUtil.keys.geocode);

          // Enable or disable logs. Its optional.
          Geocode.enableDebug();

          const { region } = this.state;
          this.setState({
            region: {
              ...region,
              latitude: response.coords.latitude,
              longitude: response.coords.longitude,
            },
          });
          console.tron.log(response.coords);
        },
        (error) => {
          if (error.PERMISSION_DENIED === 1) {
            this.showAlert();
          }
        },
      );
    } catch (err) {
      console.error(`An error occurred at requestPermissions -> ${err}`);
    }
  }

  showAlert = () => {
    Alert.alert(
      'Localização',
      'Permitir acesso a sua localização para salvar os registros',
      [
        {
          text: 'Pergunte depois',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: 'Continuar não permitindo',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Permitir',
          onPress: () => this.openAppSettings(),
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      const { RNAndroidOpenSettings } = NativeModules;
      RNAndroidOpenSettings.appDetailsSettings();
    }
  };

  handleSync = async () => {
    console.tron.log('handleSync');

    showMessage({
      message: 'Dados sincronizados com o servidor!',
      type: 'success',
      icon: 'success',
    });
  };

  onRegionChange = (region) => {
    this.setState({ region });
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
