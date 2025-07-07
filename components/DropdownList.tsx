import React, { useState } from 'react';
  import { StyleSheet, View, Text } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
    
  interface DropdownListProps {
    data: Array<any>
    addToData: (id1: number, id2: number, place: string, placeId: string) => void
    id1: number
    id2: number
  }

  const DropdownComponent = ({data, addToData, id1, id2}: DropdownListProps) => {
    const [value, setValue] = useState(null);

    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        search
        maxHeight={200}
        labelField="name"
        valueField="id"
        placeholder="Selecionar parada"
        searchPlaceholder="Pesquisar..."
        value={value}
        onChange={item => {
          setValue(item.id);
          addToData(id1, id2, item.name, item.id)
        }}
      />
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    dropdown: {
      margin: 16,
      height: 40,
      flex: 1,
      backgroundColor: 'white',
      borderRadius: 16,
      borderColor: 'rgba(0,0,0,0.25)',
      borderWidth: 1,
      padding: 12,
    },
    icon: {
      marginRight: 5,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 16,
    },
    placeholderStyle: {
      fontSize: 16,
      color: '#054C48'
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });