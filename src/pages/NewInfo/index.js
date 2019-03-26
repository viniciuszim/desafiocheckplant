import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AnnotationsPageActions } from '~/store/ducks/annotations';

import {
  Text,
  TextInput,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { showMessage } from 'react-native-flash-message';

import styles from './styles';

import stringsUtil from '~/util/strings';

class NewInfo extends Component {
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
    addAnnotationRequest: PropTypes.func.isRequired,
  };

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity onPress={() => navigation.state.params.handleRightClick()}>
        <Icon name="check-circle" size={styles.iconRight.fontSize} color={styles.iconRight.color} />
      </TouchableOpacity>
    ),
  });

  state = {
    region: {},
    infoInput: '',
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ handleRightClick: this.handleSaveInformation.bind(this) });

    const region = navigation.getParam('regionParam');
    this.setState({ region });
  }

  handleSaveInformation = async () => {
    const { region, infoInput } = this.state;

    if (infoInput === '') {
      showMessage({
        message: 'Você precisa informar a descrição para poder salvar!',
        type: 'warning',
        icon: 'warning',
      });
      return;
    }

    const annotation = {
      id: (new Date()).getTime(),
      coordinate: region,
      date: new Date(),
      description: infoInput,
    };

    await this.saveLocally(annotation);

    const { navigation, addAnnotationRequest } = this.props;
    addAnnotationRequest(annotation);

    navigation.navigate('Welcome');
  };

  saveLocally = async (annotation) => {
    try {
      let notes = await AsyncStorage.getItem(stringsUtil.storage.markersNotSynchronized);
      if (notes !== null) {
        notes = JSON.parse(notes);
      } else {
        notes = [];
      }

      notes = [...notes, annotation];

      await AsyncStorage.setItem(
        stringsUtil.storage.markersNotSynchronized,
        JSON.stringify(notes),
      );
    } catch (error) {
      if (__DEV__) {
        console.tron.error(error);
      }
    }
  }

  render() {
    const { infoInput } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView style={styles.containerForm} behavior="padding">
          <Text style={styles.title}>Entre com a descrição:</Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Informe aqui..."
            placeholderTextColor={styles.textInput.borderColor}
            underlineColorAndroid="transparent"
            multiline
            numberOfLines={20}
            value={infoInput}
            onChangeText={text => this.setState({ infoInput: text })}
          />
        </KeyboardAvoidingView>
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
)(NewInfo);
