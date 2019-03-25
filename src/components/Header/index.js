import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const MenuLeftIcon = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('NewInfo')}>
    <Icon name="pencil-square-o" size={styles.iconLeft.fontSize} color={styles.iconLeft.color} />
  </TouchableOpacity>
);

const MenuRightIcon = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.state.params.handleRightClick()}>
    <Icon name="refresh" size={styles.iconLeft.fontSize} color={styles.iconLeft.color} />
  </TouchableOpacity>
);

const ViewWithTitle = ({ title }) => (
  <View style={styles.headerCenterContainer}>
    <Text style={styles.textTitle}>{title}</Text>
  </View>
);

const headerWithTitle = (props) => {
  const { navigation } = props;
  const title = navigation.getParam('titleParam');
  return {
    headerTitle: <ViewWithTitle title={title} />,
    headerTintColor: 'white',
    headerStyle: styles.header,
    headerLeft: <MenuLeftIcon {...props} />,
    headerLeftContainerStyle: styles.headerLeftContainer,
    headerRight: <MenuRightIcon {...props} />,
    headerRightContainerStyle: styles.headerRightContainer,
    headerBackTitle: null,
  };
};

const headerWithBackButton = (props) => {
  const { navigation } = props;
  const title = navigation.getParam('titleParam');
  return {
    headerTitle: <ViewWithTitle title={title} />,
    headerTintColor: 'white',
    headerStyle: styles.header,
    headerRightContainerStyle: styles.headerRightContainer,
  };
};

export default {
  headerWithTitle,
  headerWithBackButton,
};
