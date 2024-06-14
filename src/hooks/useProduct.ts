import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from './redux';
import { URL } from "../constants/endpoint";
import { fetchProductData } from "../states/reducers/product";

export const useProduct = () => {

    const products: any = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();
    const [value, setValue] = useState<any>();
    const [open, setOpen] = useState({
        create: false,
        update: false,
        delete: false,
    });

    useEffect(() => { 
        return () => {
            dispatch(fetchProductData({
                url: URL.products
            }));
        }
    },[])

    return{
        open,
        setOpen,
        products,
        setValue,
        value
    }
}