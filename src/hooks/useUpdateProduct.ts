import { useEffect, useState, SyntheticEvent, FormEvent } from "react";
import { useForm } from 'react-hook-form';
import { appFirebase } from "../utils/firebase";
import { getDatabase, ref, get, set } from "firebase/database";
import { useAppDispatch } from './redux';
import { enqueueSnackbar } from '../states/actions/notifier';
import { URL } from "../constants/endpoint";
import { fetchProductData } from "../states/reducers/product";

const initialVariants: Array<any> = [
    {
        id: 1,
        optionName: '',
        optionValues: [
            {
                id: 1,
                value: ''
            }
        ]
    }
];

export const useUpdateProduct = (props:any) => {

    const id = props.value?.id;
    const dispatch = useAppDispatch();
    const [price, setPrice] = useState('');
    const [cost, setCost] = useState('');
    const [variants, setVariants] = useState<Array<any>>(initialVariants);
    const [valueTab, setTabValue] = useState(0);

    const {
        control,
        handleSubmit,
        setValue
    } = useForm();

    useEffect(() => {
        setValue(
            'price',
            Number(price)
        )
    },[price]);

    useEffect(() => {
        setValue(
            'cost',
            Number(cost)
        )
    },[cost]);

    useEffect(() => {
        setValue(
            'variants',
            variants
        )
    },[variants]);
    
    useEffect(() => {
        productInitialize();
    }, []);

    const productInitialize = async () => {
        const db = getDatabase(appFirebase);
        const dbRef = ref(db, URL.products+`/${id}`);
        const snapshot = await get(dbRef);
        if(snapshot.exists()) {
            
            const data = snapshot.val();

            setValue('name', data.name);
            setValue('category', data.category);
            setValue('stock', data.stock);

            setVariants(Object.values(data.variants));
            setPrice(data.price.toString());
            setCost(data.cost.toString());
        }
    }

    const handleAddOption = (index: number, e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(variants[index].optionValues.length != 0){
            setVariants(prevVariants => {
                const newVariants = [...prevVariants];
                const currentOptionValues = newVariants[index].optionValues;
        
                const newId = currentOptionValues.length > 0 
                    ? currentOptionValues[currentOptionValues.length - 1].id + 1 
                    : 1;
        
                const newOptionValue = { id: newId, value: '' };
                const newOptionValues = [...currentOptionValues, newOptionValue];
        
                newVariants[index] = {
                    ...newVariants[index],
                    optionValues: newOptionValues
                };
        
                return newVariants;
            });
        } else {
            setVariants(
                [
                    ...variants,
                    {
                        id: variants[variants.length - 1].id + 1,
                        optionName: '',
                        optionValues: [{ id: 1, value: '' }]
                    }]
            );
        }
    }

    const handleDeleteOption = (variantIndex: number, optionValueId: number, e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
    
        setVariants(prevVariants => {
            const newVariants = [...prevVariants];
            const currentOptionValues = newVariants[variantIndex].optionValues;

            const newOptionValues = currentOptionValues.filter((optionValue: any) => optionValue.id !== optionValueId);

            newVariants[variantIndex] = {
                ...newVariants[variantIndex],
                optionValues: newOptionValues
            };

            return newVariants;
        });
    };

    const handleAddVariant = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(variants.length != 0){
            setVariants([...variants, { id: variants[variants.length - 1].id + 1, optionName: '',  optionValues: [{ id: 1, value: ''}] }]);
        } else {
            setVariants(initialVariants)
        }
    }

    const handleDeleteVariant = (index: number) => {
        setVariants((prevItems) => prevItems.filter((_item, i) => i !== index));
    }

    const handleOnChangeOptionName = (index: number, evt: any) => {
        const newValues = [...variants];
        newValues[index].optionName = evt.target.value;
        setVariants(newValues)
    }

    const handleOnChangeOptionValue = (variantIndex: number, optionValueIndex: number, evt: any) => {
        setVariants(prevVariants => {
            const newVariants = [...prevVariants];
            const currentOptionValues = newVariants[variantIndex].optionValues;
    
            const newOptionValues = currentOptionValues.map((optionValue: any, index: any) => {
                if (index === optionValueIndex) {
                    return { ...optionValue, value: evt.target.value };
                }
                return optionValue;
            });
    
            newVariants[variantIndex] = {
                ...newVariants[variantIndex],
                optionValues: newOptionValues
            };
    
            return newVariants;
        });
    }


    const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleFormSubmit = async (data: any) => {

        const db = getDatabase(appFirebase);
        const newDocRef = ref(db, URL.products+`/${id}`);

        set(newDocRef, data).then(() => {
            dispatch(enqueueSnackbar({
                message: "Successfully updated Product",
                options: {
                    variant: "success"
                }
            }));

            props.setOpen({
                ...props.open,
                update: false
            });
            
            dispatch(fetchProductData({
                url: URL.products
            }));

        }).catch(() => {
            dispatch(enqueueSnackbar({
                message: "Something went wrong!",
                options: {
                    variant: "error"
                }
            }));
        })
    }

    return {
        handleFormSubmit,
        control,
        handleSubmit,
        price,
        setPrice,
        cost,
        setCost,
        valueTab,
        handleTabChange,
        variants,
        handleAddOption,
        handleDeleteOption,
        handleAddVariant,
        handleDeleteVariant,
        handleOnChangeOptionName,
        handleOnChangeOptionValue
    }
}