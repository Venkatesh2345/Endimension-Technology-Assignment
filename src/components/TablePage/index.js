import { useEffect, useState } from "react";
import './index.css';
import { Table, Button, Modal, Input } from 'antd';
import { Link } from "react-router-dom";

const TablePage = ({ products }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productData, setProductData] = useState(products);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        setProductData(products);
    }, [products]);

    const onDeleteProduct = (record) => {
        setProductData(prev => prev.filter(product => product.key !== record.key));
    };

    const onEditProduct = (record) => {
        setIsEditing(true);
        setEditingProduct(record);
    };

    const resetEditing = () => {
        setIsEditing(false);
        setEditingProduct(null);
    };

    const handleSearch = (value) => {
        setSearchText(value);
        const filteredData = products.filter(product =>
            product.name.toLowerCase().includes(value.toLowerCase()) ||
            product.category.toLowerCase().includes(value.toLowerCase()) ||
            product.description.toLowerCase().includes(value.toLowerCase())
        );
        setProductData(filteredData);
    };

    const columns = [
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            sorter: (a, b) => a.category.localeCompare(b.category),
            filters: Array.from(new Set(products.map(product => product.category))).map(category => ({ text: category, value: category })),
            onFilter: (value, record) => record.category === value,
            filteredValue: searchText.category ? [searchText.category] : null,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            filters: Array.from(new Set(products.map(product => product.name))).map(name => ({ text: name, value: name })),
            onFilter: (value, record) => record.name === value,
            filteredValue: searchText.name ? [searchText.name] : null,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a, b) => a.description.localeCompare(b.description),
            filters: Array.from(new Set(products.map(product => product.description))).map(description => ({ text: description, value: description })),
            onFilter: (value, record) => record.description === value,
            filteredValue: searchText.description ? [searchText.description] : null,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `$${text}`, 
            sorter: (a, b) => a.price - b.price,
            filters: Array.from(new Set(products.map(product => product.price))).map(price => ({ text: `$${price}`, value: price })),
            onFilter: (value, record) => record.price === value,
            filteredValue: searchText.price ? [searchText.price] : null,
        },
        {
            title: "Actions",
            key: "Actions",
            render: (record) => {
                return (
                    <div className="edit-delete">
                        <Button onClick={() => onEditProduct(record)} className="buttons">Edit</Button>
                        <Button onClick={() => onDeleteProduct(record)} className="delete-button">Delete</Button>
                    </div>
                )
            }
        },
    ];

    return (
        <div className="table-page">
            <div>
                <Input.Search
                    className="search-bar"
                    placeholder="Search products"
                    allowClear
                    enterButton="Search"
                    onSearch={handleSearch}
                    style={{width:600}}
                />
                <Link to="/addproduct">
                    <Button className="add-button" type="primary">Add Product</Button>
                </Link>
            </div>
            <Table
                className="table-container"
                columns={columns}
                dataSource={productData}
                pagination={{ pageSize: 10 }}
            />
            <Modal
                title="Product Editing"
                visible={isEditing}
                okText="Save"
                onCancel={resetEditing}
                onOk={() => {
                    setProductData(prev => prev.map(product => product.key === editingProduct.key ? editingProduct : product));
                    resetEditing();
                }}
            >
                <Input value={editingProduct?.name} onChange={(e) => setEditingProduct(prev => ({ ...prev, name: e.target.value }))} />
                <Input value={editingProduct?.category} onChange={(e) => setEditingProduct(prev => ({ ...prev, category: e.target.value }))} />
                <Input value={editingProduct?.description} onChange={(e) => setEditingProduct(prev => ({ ...prev, description: e.target.value }))} />
                <Input value={editingProduct?.price} onChange={(e) => setEditingProduct(prev => ({ ...prev, price: e.target.value }))} />
            </Modal>
        </div>
    );
};

export default TablePage;
