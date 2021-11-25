import React, { useEffect, useState } from 'react';
import { useIsFocused } from "@react-navigation/native";
import { NativeBaseProvider, Box, Heading } from 'native-base';
import ProductList from '../components/productList';
import { useQuery, useMutation } from 'react-query';
// API
import { getProduct, deleteProduct, createProduct } from '../api';

const Product = ({ navigation, route }) => {

    const { token, user } = route.params;
    const { data, isFetching: loading, refetch } = useQuery("products", () => getProduct());
    const { mutate: onDelete } = useMutation((id) => deleteProduct(id, token), {
        onSuccess: res => { refetch() }
    });

    // useEffect(() => {
    //     const data = {name: "sin nombre"}
    //     createProduct(data, token);
    //     setTimeout(() => {
    //         refetch();
    //     }, 100);
    // }, []);

    return (
        <NativeBaseProvider >
            <Box textAlign="center" bg='white' flex={1} safeAreaTop>
                <ProductList data={data?.data} loading={loading} onDelete={onDelete} />
            </Box>
        </NativeBaseProvider>
    );
    
}

export default Product;

const products = [
    {
        id: 1,
        name: "Aspirina",
        stock: 5,
        cost: 3.3,
        date: "2022/11/15",
        enabled: true,
        img: "",
    },
    {
        id: 2,
        name: "Novalgina",
        stock: 88,
        cost: 45.0,
        date: "2022/10/30",
        enabled: true,
        img: "",
    },
];