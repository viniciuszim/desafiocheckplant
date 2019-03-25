import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AnnotationsPageActions } from '~/store/ducks/annotations';

import {
  View,
  Text,
  StatusBar,
  Animated,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import MapView, { Callout } from 'react-native-maps';

import Location from '~/util/location';

import { showMessage } from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './styles';

import stringsUtil from '~/util/strings';

class Welcome extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
    annotations: PropTypes.shape({
      dataSynchronized: PropTypes.oneOfType([null, PropTypes.arrayOf(PropTypes.shape())]),
      dataNotSynchronized: PropTypes.oneOfType([null, PropTypes.arrayOf(PropTypes.shape())]),
      loading: PropTypes.bool,
      success: PropTypes.oneOfType([null, PropTypes.string]),
      error: PropTypes.oneOfType([null, PropTypes.string]),
    }).isRequired,
    getAnnotationRequest: PropTypes.func.isRequired,
  };

  state = {
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  componentDidMount() {
    const { navigation, getAnnotationRequest } = this.props;
    navigation.setParams({ titleParam: stringsUtil.pages.welcomeTitle });
    navigation.setParams({ handleLeftClick: this.handleNewInfo.bind(this) });
    navigation.setParams({ handleRightClick: this.handleSync.bind(this) });

    Location.checkPermissions(this.updateMap);

    getAnnotationRequest();
  }

  updateMap = (coords) => {
    const { region } = this.state;
    this.setState({
      region: {
        ...region,
        // latitude: coords.latitude,
        // longitude: coords.longitude,
        // latitude: -16.688,
        // longitude: -49.2558,
        latitude: -16.6769,
        longitude: -49.2648,
        // latitude: -16.6870,
        // longitude: -49.2548,
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
    showMessage({
      message: 'Dados sincronizados com o servidor!',
      type: 'success',
      icon: 'success',
    });
  };

  render() {
    const { region, loading } = this.state;
    const { annotations } = this.props;
    const { dataSynchronized, dataNotSynchronized } = annotations;
    console.tron.warn(dataNotSynchronized);
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
          {dataSynchronized.map(marker => (
            <MapView.Marker key={marker.id} coordinate={marker.coordinate}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.View style={[styles.ring]} />
                <View style={styles.marker} />
              </Animated.View>
              <Callout style={styles.calloutView}>
                <View style={styles.calloutView}>
                  <Text style={styles.date}>
                    Data:
                    {' '}
                    {/* {marker.date} */}
                  </Text>
                  <ScrollView>
                    <Text style={styles.info}>{marker.description}</Text>
                  </ScrollView>
                </View>
              </Callout>
            </MapView.Marker>
          ))}
          {dataNotSynchronized.map(marker => (
            <MapView.Marker key={marker.id} coordinate={marker.coordinate}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.View style={[styles.ringNotSynchronized]} />
                <View style={styles.markerNotSynchronized} />
              </Animated.View>
              <Callout style={styles.calloutView}>
                <View style={styles.calloutView}>
                  <Text style={styles.date}>
                    Data:
                    {' '}
                    {/* {marker.date} */}
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

const mapStateToProps = state => ({
  annotations: state.annotations,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...AnnotationsPageActions,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Welcome);
