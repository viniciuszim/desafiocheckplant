import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

export default class Welcome extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
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
      return false;
    }

    const info = {
      coordinate: region,
      date: new Date(),
      description: infoInput,
    };

    showMessage({
      message: 'Informação salva localmente!',
      type: 'success',
      icon: 'success',
    });
    const { navigation } = this.props;
    navigation.navigate('Welcome');
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
