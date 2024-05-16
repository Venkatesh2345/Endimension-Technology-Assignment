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
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `$${text}`, 
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
