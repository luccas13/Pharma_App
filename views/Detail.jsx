import React, { useState, useEffect } from "react"
import { TextInput, Dimensions } from 'react-native';
import {
  IconButton,
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  VStack,
  Stack,
} from "native-base"
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ButtonIcon = ({
  name = 'menu',
  color = 'tertiary.600',
  size = 'md',
  onPress = _ => { }
}) => {
  return (<IconButton
    borderRadius="full"
    _icon={{
      color: color,
      size: size,
      as: MaterialCommunityIcons,
      name: name,
    }}
    onPress={_ => onPress()}
  />
  )
}
export default function Detail({ id, img, name, description, stock, price }) {
  id = "1235489866543320698650200"
  name = "NEXT Gripe";
  img = "https://cdn.batitienda.com/baticloud/images/product_265da8d1319149f4b25768821a35ac07_637383753512736603_0_m.png";
  description = "Paracetamol: un efectivo analgésico que alivia el dolor y la fiebre. Cafeína: ideal para reducir el decaimiento. Butetamato: para dilatar los bronquios y eliminar la tos. Fenilefrina: un potente descongestivo que alivia la congestión nasal y mejora la respiración.";
  stock = "100";
  price = "20";
  const [flag_enable, setflag_enable] = useState(false);
  const [icon_img, setflag_icon_img] = useState("grease-pencil");
  const [data, setdata] = useState({ id, img, name, description, stock, price: parseFloat(price) })
  useEffect(x => { console.log(data) }, [data])
  const on_click = () => {
    if (!flag_enable) {
      setflag_icon_img("content-save")
    }
    setflag_enable(!flag_enable);
    if (flag_enable) {
      setflag_icon_img("grease-pencil")
      console.log(data.name)
      console.log(data.description)
      console.log(data.stock)
      console.log(data.price)
    }
  }
  const on_click_back = () => {

    console.log("Back")


  }

  const windowWidth = Dimensions.get('window').width;
  return (

    <Center flex={1} px="0">
      <Box
        maxW="100%"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <Center
          bg="rgba(255,255,255,0.3)"
          borderRadius="50%"
          _dark={{
            bg: "tertiary.400",
          }}
          position="absolute"
          zIndex={"9999999999999999999"}
          top="20"
          left="1"

          px="1"
          py="1"
        >
          <ButtonIcon color="white" name="arrow-left" onPress={on_click_back} />
        </Center>
        <Box>

          <AspectRatio w="100%" ratio={1}>
            <Image
              source={{
                uri: data.img,
              }}
              alt="image"
            />
          </AspectRatio>

          <HStack space={windowWidth - 100}  >
            <Center
              bg="tertiary.600"
              _dark={{
                bg: "tertiary.400",
              }}
              _text={{
                color: "warmGray.50",
                fontWeight: "600",
                fontSize: "xs",
              }}
              //position="absolute"
              bottom="0"
              px="3"
              py="1.5"
            >

              {`$${data.price.toFixed(2)}`}
            </Center>

            <> <ButtonIcon name={icon_img} onPress={on_click} /></>
          </HStack>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {data.name}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: "tertiary.500",
              }}
              _dark={{
                color: "tertiary.400",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              {data.id}
            </Text>
          </Stack>
          <HStack alignItems="center" >
            {flag_enable && <Text fontWeight="700"> Nombre: </Text>}
            {flag_enable && <TextInput style={{ width: "30er" }}
              selectTextOnFocus={flag_enable}
              editable={flag_enable}
              defaultValue={data.name}
              onChangeText={t => setdata({ ...data, name: t })}
            />
            }
          </HStack>
          <HStack alignItems="center" >
            {flag_enable && <Text fontWeight="700"> Precio: $ </Text>}
            {flag_enable && <TextInput style={{ width: "30er" }}
              selectTextOnFocus={flag_enable}
              editable={flag_enable}
              defaultValue={data.price}
              onChangeText={t => setdata({ ...data, price: parseFloat(t) })}

            />
            }
          </HStack>
          <HStack alignItems="center" >
            {flag_enable && <Text fontWeight="700"> Stock: </Text>}
            {flag_enable && <TextInput
              editable={flag_enable}
              defaultValue={data.stock}
              onChangeText={t => setdata({ ...data, stock: t })}

            />
            }
          </HStack>
          <HStack alignItems="center" >
            {flag_enable && <Text fontWeight="700"> URL Imagen: </Text>}
            {flag_enable && <TextInput style={{ width: "30er" }}
              selectTextOnFocus={flag_enable}
              editable={flag_enable}
              defaultValue={data.img}
              onChangeText={t => setdata({ ...data, img: t })}
            />
            }
          </HStack>
          <Text fontWeight="800" textAlign="justify" >
            Descripcion
          </Text>
          <VStack> <TextInput
            style={{ width: windowWidth - 30 }}

            multiline={true}
            numberOfLines={4}
            editable={flag_enable}
            defaultValue={data.description}
            onChangeText={t => setdata({ ...data, description: t })}


          /> </VStack>

          <HStack alignItems="center"
            space={4}
            justifyContent="space-between"
            rounded="lg"
            px="6"
            py="3"
            bg="tertiary.500"
            _dark={{
              bg: "tertiary.400",
            }}>
            <HStack alignItems="center" >
              <Text
                color="warmGray.50"
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="600"
                fontsSize="xs"
              >
                Stock: {data.stock}

              </Text>
            </HStack>

          </HStack>
        </Stack>
      </Box>
    </Center>

  )
}