import { appFirebase } from '../utils/firebase';
import { getDatabase, ref, set, push } from 'firebase/database';
import { useEffect, useState, SyntheticEvent, FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from './redux';
import { enqueueSnackbar } from '../states/actions/notifier';
import { fetchProductData } from '../states/reducers/product';
import { URL } from '../constants/endpoint';

const initialVariants: Array<any> = [
  {
    id: 1,
    optionName: '',
    optionValues: [
      {
        id: 1,
        value: '',
      },
    ],
  },
];

export const useCreateProduct = (props: any) => {
  const dispatch = useAppDispatch();
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [variants, setVariants] = useState<Array<any>>(initialVariants);
  const [valueTab, setTabValue] = useState(0);

  const { control, handleSubmit, setValue } = useForm();

  useEffect(() => {
    setValue('price', Number(price));
  }, [price]);

  useEffect(() => {
    setValue('cost', Number(cost));
  }, [cost]);

  useEffect(() => {
    setValue('variants', variants);
  }, [variants]);

  const handleAddOption = (index: number, e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVariants((prevVariants) => {
      const newVariants = [...prevVariants];
      const currentOptionValues = newVariants[index].optionValues;

      const newId =
        currentOptionValues.length > 0
          ? currentOptionValues[currentOptionValues.length - 1].id + 1
          : 1;

      const newOptionValue = { id: newId, value: '' };
      const newOptionValues = [...currentOptionValues, newOptionValue];

      newVariants[index] = {
        ...newVariants[index],
        optionValues: newOptionValues,
      };

      return newVariants;
    });
  };

  const handleDeleteOption = (
    variantIndex: number,
    optionValueId: number,
    e: FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    setVariants((prevVariants) => {
      const newVariants = [...prevVariants];
      const currentOptionValues = newVariants[variantIndex].optionValues;

      const newOptionValues = currentOptionValues.filter(
        (optionValue: any) => optionValue.id !== optionValueId
      );

      newVariants[variantIndex] = {
        ...newVariants[variantIndex],
        optionValues: newOptionValues,
      };

      return newVariants;
    });
  };

  const handleAddVariant = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (variants.length != 0) {
      setVariants([
        ...variants,
        {
          id: variants[variants.length - 1].id + 1,
          optionName: '',
          optionValues: [{ id: 1, value: '' }],
        },
      ]);
    } else {
      setVariants(initialVariants);
    }
  };

  const handleDeleteVariant = (index: number) => {
    setVariants((prevItems) => prevItems.filter((_item, i) => i !== index));
  };

  const handleOnChangeOptionName = (index: number, evt: any) => {
    const newValues = [...variants];
    newValues[index].optionName = evt.target.value;
    setVariants(newValues);
  };

  const handleOnChangeOptionValue = (
    variantIndex: number,
    optionValueIndex: number,
    evt: any
  ) => {
    setVariants((prevVariants) => {
      const newVariants = [...prevVariants];
      const currentOptionValues = newVariants[variantIndex].optionValues;

      const newOptionValues = currentOptionValues.map(
        (optionValue: any, index: any) => {
          if (index === optionValueIndex) {
            return { ...optionValue, value: evt.target.value };
          }
          return optionValue;
        }
      );

      newVariants[variantIndex] = {
        ...newVariants[variantIndex],
        optionValues: newOptionValues,
      };

      return newVariants;
    });
  };

  const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFormSubmit = async (data: any) => {
    // console.log(data)
    const db = getDatabase(appFirebase);
    const newDocRef = push(ref(db, URL.products));

    set(newDocRef, data)
      .then(() => {
        dispatch(
          enqueueSnackbar({
            message: 'Successfully added Product',
            options: {
              variant: 'success',
            },
          })
        );

        props.setOpen({
          ...props.open,
          create: false,
        });

        dispatch(
          fetchProductData({
            url: URL.products,
          })
        );
      })
      .catch(() => {
        dispatch(
          enqueueSnackbar({
            message: 'Something went wrong!',
            options: {
              variant: 'error',
            },
          })
        );
      });
  };

  return {
    open,
    handleFormSubmit,
    control,
    handleSubmit,
    price,
    setPrice,
    cost,
    setCost,
    handleTabChange,
    valueTab,
    variants,
    handleAddOption,
    handleDeleteOption,
    handleAddVariant,
    handleDeleteVariant,
    handleOnChangeOptionName,
    handleOnChangeOptionValue,
  };
};
