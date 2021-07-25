import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Colors from '../../themes/colors';

const ParkSlotListItem = ({item, onPress}) => {
  return (
    <View style={styles.renderItemContainer(item.size)}>
      <Pressable
        style={({pressed}) => [styles.renderItemBtnStyle(item, pressed)]}
        onPress={() => onPress(item)}>
        <Text>{item.id}</Text>
        {!item.isVacant && (
          <View style={styles.innerWrapper}>
            <Text> In: </Text>
            <Text style={styles.verhicleTypeTextStyle}>
              {item.vehicleTypeIn.charAt(0)}
              {/* {item.vehicleTypeIn} */}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  innerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  renderItemBtnStyle: (item, pressed) => ({
    top: item.size === 0 ? 20 : item.size === 1 ? 10 : 0,
    borderWidth: 0.4,
    flex: 1,
    borderRadius: 8,
    margin: pressed ? 8 : 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: item.isVacant ? Colors.success : Colors.fire,
  }),
  renderItemContainer: item => ({
    width: item === 0 ? wp('16%') : item === 1 ? wp('18%') : wp('20%'),
    height: item === 0 ? 80 : item === 1 ? 100 : 120,
    marginVertical: 25,
  }),
  verhicleTypeTextStyle: {
    color: Colors.snow,
  },
});

export default ParkSlotListItem;
