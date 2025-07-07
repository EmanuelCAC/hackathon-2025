import React, { useEffect, useState } from 'react';
  import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
  import { MultiSelect } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';

  interface MultiSelectButtonProps {
    data: Array<any>
    tags: string[]
    addTag: (e: Array<string>) => void
  }

  export const MultiSelectButton = ({data, addTag, tags}: MultiSelectButtonProps) => {
    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
      if(tags.length === 0 && selected.length !== 0) {
        setSelected([])
      }
    }, [tags])

    return (
      <View style={styles.container}>
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          labelField="name"
          valueField="name"
          placeholder="Selecionar etiquetas"
          value={selected}
          search
          searchPlaceholder="Pesquisar..."
          onChange={item => {
            setSelected(item);
            addTag(item)
          }}
          renderSelectedItem={(item, unSelect) => (
            <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
              <View style={styles.selectedStyle}>
                <Text style={styles.textSelectedStyle}>{item.name}</Text>
                <AntDesign color="black" name="delete" size={17} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: { padding: 16, paddingTop: 0 },
    dropdown: {
      height: 50,
      backgroundColor: 'white',
      borderRadius: 16,
      borderColor: 'rgba(0,0,0,0.25)',
      borderWidth: 1,
      padding: 12,
      color: "#054C48"
    },
    placeholderStyle: {
      fontSize: 16,
      color: '#054C48',
    },
    selectedTextStyle: {
      fontSize: 14,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
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
    selectedStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 14,
      backgroundColor: 'white',
      marginTop: 8,
      marginRight: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    textSelectedStyle: {
      marginRight: 5,
      fontSize: 16,
    },
  });