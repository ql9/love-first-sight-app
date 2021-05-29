import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  Header,
  RouteStackParamList,
  StatusBarCustom,
} from '../../../components';
import {updateUser} from '../../../controller/updateUser';

const Data = [
  {
    label: '150 cm',
    value: 150,
  },
  {
    label: '151 cm',
    value: 151,
  },
  {
    label: '152 cm',
    value: 152,
  },
  {
    label: '153 cm',
    value: 153,
  },
  {
    label: '154 cm',
    value: 154,
  },
  {
    label: '155 cm',
    value: 155,
  },
  {
    label: '156 cm',
    value: 156,
  },
  {
    label: '157 cm',
    value: 157,
  },
  {
    label: '158 cm',
    value: 158,
  },
  {
    label: '159 cm',
    value: 159,
  },
  {
    label: '160 cm',
    value: 160,
  },
  {
    label: '161 cm',
    value: 161,
  },
  {
    label: '162 cm',
    value: 162,
  },
  {
    label: '163 cm',
    value: 163,
  },
  {
    label: '164 cm',
    value: 164,
  },
  {
    label: '165 cm',
    value: 165,
  },
  {
    label: '166 cm',
    value: 166,
  },
  {
    label: '167 cm',
    value: 167,
  },
  {
    label: '168 cm',
    value: 168,
  },
  {
    label: '169 cm',
    value: 169,
  },
  {
    label: '170 cm',
    value: 170,
  },
  {
    label: '171 cm',
    value: 171,
  },
  {
    label: '172 cm',
    value: 172,
  },
  {
    label: '173 cm',
    value: 173,
  },
  {
    label: '174 cm',
    value: 174,
  },
  {
    label: '175 cm',
    value: 175,
  },
  {
    label: '176 cm',
    value: 176,
  },
  {
    label: '177 cm',
    value: 177,
  },
  {
    label: '178 cm',
    value: 178,
  },
  {
    label: '179 cm',
    value: 179,
  },
  {
    label: '180 cm',
    value: 180,
  },
  {
    label: '181 cm',
    value: 181,
  },
  {
    label: '182 cm',
    value: 182,
  },
  {
    label: '183 cm',
    value: 183,
  },
  {
    label: '184 cm',
    value: 184,
  },
  {
    label: '185 cm',
    value: 185,
  },
  {
    label: '186 cm',
    value: 186,
  },
  {
    label: '187 cm',
    value: 187,
  },
  {
    label: '188 cm',
    value: 188,
  },
  {
    label: '189 cm',
    value: 189,
  },
  {
    label: '190 cm',
    value: 190,
  },
  {
    label: '191 cm',
    value: 191,
  },
  {
    label: '192 cm',
    value: 192,
  },
  {
    label: '193 cm',
    value: 193,
  },
  {
    label: '194 cm',
    value: 194,
  },
  {
    label: '195 cm',
    value: 195,
  },
  {
    label: '196 cm',
    value: 196,
  },
  {
    label: '197 cm',
    value: 197,
  },
  {
    label: '198 cm',
    value: 198,
  },
  {
    label: '199 cm',
    value: 199,
  },
  {
    label: '200 cm',
    value: 200,
  },
];

export const EditHeightScreen = ({
  route,
  navigation,
}: RouteStackParamList<'AccountScreen'>) => {
  const [value, setValue] = useState(route.params.height);
  return (
    <View style={styles.containerAll}>
      <StatusBarCustom backgroundColor="#F8F8F8" barStyle="dark-content" />
      <Header
        title="Height"
        showTextLeft={true}
        textLeft="Cancel"
        showTextRight={true}
        textRight="Done"
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => {
          updateUser({height: value});
          navigation.navigate('AccountScreen', {flag: true});
        }}
      />
      <View style={styles.container}>
        <DropDownPicker
          items={Data}
          defaultValue={value}
          containerStyle={styles.containerHeight}
          style={styles.style}
          itemStyle={styles.item}
          dropDownStyle={styles.dropDown}
          onChangeItem={(item) => setValue(item.value)}
          labelStyle={styles.text}
          activeLabelStyle={{color: '#6A1616'}}
          dropDownMaxHeight={300}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerAll: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  containerHeight: {
    height: 40,
    marginTop: 16,
  },
  style: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  item: {
    justifyContent: 'flex-start',
  },
  dropDown: {
    height: 'auto',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    borderWidth: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#000000',
  },
});
