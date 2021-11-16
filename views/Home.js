import React, { useEffect, useState } from 'react';
import { View, Text, Modal, Button, FlatList } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { ListItem, Avatar, Icon } from "react-native-elements";
import { TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // https://materialdesignicons.com/
// Context
import { useUserContext } from "../contexts/UsersContext";
// API
// import { get } from "../api/index";

const Home = ({ navigation }) => {

  const [show, setShow] = useState(false);
  const [idUser, setIdUser] = useState();
  // const [state, stateDispatch] = useUserContext();
  const isFocused = useIsFocused();
  const state = [
    {
      id: 1,
      name: "Aspirina",
      stock: 5,
      cost: 3.3,
      date: "2022/11/15",
      enabled: true,
      img: "https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4",
    },
    {
      id: 2,
      name: "Novalgina",
      stock: 88,
      cost: 45.0,
      date: "2022/10/30",
      enabled: true,
      img: "https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4",
    },
  ];
  // useEffect(() => {
  //   getUser().then(res => {
  //     stateDispatch({
  //       type: "GET_USER",
  //       data: res
  //     });
  //   });
  // }, [isFocused]);

  const onPress = id => {
    setShow(true);
  }

  const onDelete = () => {
    setShow(false);
  }

  const onDetail = () => {
    navigation.navigate('DETAIL');
  }

  const keyExtractor = (item, index) => index.toString()
  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <Avatar title={item?.name} source={item?.img}/>
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.stock}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron onPress={onDetail} />
    </ListItem>
  )

  return (
    <View>
      <FlatList
        keyExtractor={keyExtractor}
        data={state}
        renderItem={renderItem}
      />
      <Icon 
        color="green"
        name="plus" 
        type="material-community" 
        size={30}
        raised
        onPress={()=> navigation.navigate('ADD-EDIT', {create: true})}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={show}
      >
        <View>
          <Text>Desea eliminar al usuario?</Text>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }} >
            <Button
              title="Cancelar"
              onPress={() => setShow(false)}
            />
            <Button
              title="Confirmar"
              onPress={onDelete}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Home;