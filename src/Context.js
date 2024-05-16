import React, { createContext, useState, useContext } from 'react';

// Create the context
const ArrayContext = createContext();

// Create a provider component
export const ArrayProvider = ({ children }) => {
    const [array, setArray] = useState([
        {

            category: 'Electronics',
            name: 'Smartphone',
            description: 'Latest model smartphone with all the newest features.',
            price: 699,
            key: '1',
        },
        {

            category: 'Books',
            name: 'React Programming',
            description: 'A comprehensive guide to React programming.',
            price: 39,
            key: '2',
        },
        {

            category: 'Clothing',
            name: 'Men\'s T-Shirt',
            description: 'Casual men\'s t-shirt made from comfortable cotton fabric.',
            price: 29,
            key: '3',
        },
        {
            key: '4',
            category: 'Electronics',
            name: 'Laptop',
            description: 'Powerful laptop with high-performance specifications.',
            price: 1299,
        },
        {
            key: '5',
            category: 'Books',
            name: 'JavaScript Basics',
            description: 'A beginner\'s guide to JavaScript programming.',
            price: 19,
        },
        {
            key: '6',
            category: 'Electronics',
            name: 'Smart Watch',
            description: 'Smart watch with fitness tracking and notifications.',
            price: 199,
        },
        {
            key: '7',
            category: 'Clothing',
            name: 'Women\'s Dress',
            description: 'Elegant women\'s dress suitable for any occasion.',
            price: 49,
        },
        {
            key: '8',
            category: 'Books',
            name: 'Python Programming',
            description: 'A complete guide to Python programming language.',
            price: 49,
        },
        {
            key: '9',
            category: 'Electronics',
            name: 'Tablet',
            description: 'Portable tablet with a high-resolution display.',
            price: 299,
        },
        {
            key: '10',
            category: 'Clothing',
            name: 'Men\'s Jeans',
            description: 'Classic men\'s jeans made from durable denim fabric.',
            price: 39,
        },
    ]);

    // Function to add an item to the array
    const addItem = (item) => {
        setArray([...array, item]);
    };

    // Function to edit an item in the array
    const editItem = (index, newItem) => {
        const newArray = [...array];
        newArray[index] = newItem;
        setArray(newArray);
    };

    return (
        <ArrayContext.Provider value={{ array, addItem, editItem }}>
            {children}
        </ArrayContext.Provider>
    );
};

// Custom hook to use the ArrayContext
export const useArrayContext = () => {
    return useContext(ArrayContext);
};
