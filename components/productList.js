import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { Box, Text, Pressable, Icon, HStack, VStack, Avatar, Spacer } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; // https://materialdesignicons.com/
import { SwipeListView } from 'react-native-swipe-list-view';

const { width, height } = Dimensions.get('window');

const ProductList = ({data, loading, onDelete}) => {
    console.log(width, height);
    const onPress = () => {
        console.log("onPress");
    }

    const renderItem = ({ item }) => (
        <Box>
          <Pressable onPress={onPress} bg="white">
            <Box
              pl="4"
              pr="5"
              py="2"
              >
              <HStack alignItems="center" space={3} >
                <Avatar size="48px" source={{ uri: item.img }} />
                <VStack>
                  <Text color="coolGray.800" _dark={{ color: 'warmGray.50' }} bold isTruncated maxW={width/2}>
                    {item.name}
                  </Text>
                </VStack>
                <Spacer />
                <Text 
                    fontSize="xs" 
                    color="coolGray.800"  
                    _dark={{ color: 'warmGray.50' }} 
                    alignSelf="flexStart">
                  {"$" + item.price}
                </Text>
              </HStack>
            </Box>
          </Pressable>
        </Box>
    );

    const renderHiddenItem = (data) => (
        <HStack
        flex={1}
        pl={2}
        >
            <Pressable
                px={4}
                ml='auto'
                cursor="pointer"
                bg="red.500"
                justifyContent="center"
                onPress={() => onDelete(data.item.id)}
                _pressed={{
                    opacity: 0.5
                }}
            >
                <Icon as={<MaterialIcons name="delete" />} color="white" />
            </Pressable>
        </HStack>
    );

    return (
        <Box bg='white' safeArea
            flex={1}>
            <SwipeListView
                data={data}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-130}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
            />
        </Box>
    );
}

export default ProductList;
