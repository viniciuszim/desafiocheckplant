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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { showMessage } from 'react-native-flash-message';

import styles from './styles';

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

  componentDidUpdate() {
    const { annotations } = this.props;
    if (annotations.success !== null && annotations.success !== '') {
      showMessage({
        message: annotations.success,
        type: 'success',
        icon: 'success',
      });
      const { navigation } = this.props;
      navigation.navigate('Welcome');
    }
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
      coordinate: region,
      date: new Date(),
      description: infoInput,
    };

    const { addAnnotationRequest } = this.props;
    addAnnotationRequest(annotation);
  };

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
