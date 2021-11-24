import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { Input, Switch, Text } from 'react-native-elements';
// Context
import { useUserContext } from "../contexts/UsersContext";
// api
import { postUser, putUser } from "../api/index";


const Productos = ({navigation, route}) => {

  // const {} = route.params;
  const [name, setName] = useState();
  const [stock, setStock] = useState();
  const [date, setDate] = useState();
  const [cost, setCost] = useState();
  const [enabled, setEnabled] = useState(true);

  const onPress = () => {
    const data = {nombre: name, apellido: surname, mail: email, tel: phone, dir: address, fechaNacimiento: birthDate};
    // create
    // ? postUser(data).then(res => {
    //   stateDispatch({
    //     type: "ADD_USER",
    //     data: res
    //   });
    // })
    // : putUser(id, data).then(res => {
    //   stateDispatch({
    //     type: "PUT_USER",
    //     data: res
    //   });
    // });
    // navigation.navigate("HOME");
  }

  return(
    <View style={{ flex: 1, justifyContent: "space-around", alignItems: "center" }} >
      <Input  placeholder="Nombre" value={name} onChangeText={setName} />
      <Input  placeholder="Stock" value={stock} onChangeText={setStock} />
      <Input  placeholder="Precio" value={cost} onChangeText={setCost} />
      <Input  placeholder="Fecha de vencimiento" value={date} onChangeText={setDate} />
      <View style={{ alignContent: "space-between", alignItems: "center", flexDirection:"row" }} >
        <Text h3>Estatus:</Text>
        <Switch  value={enabled} onClick={() => setEnabled(!enabled)} />
      </View>
      <Button title={`${true ? "Agregar" : "Editar"} Producto`} onPress={onPress} />
    </View>
  )
}

export default Productos;