import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

const Row = ({left, right, style, rightStyle}) => {
  return (
    <View style={styles.container}>
      <Text style={style}>{left}</Text>
      <Text style={rightStyle}>{right}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
});

export default Row;
