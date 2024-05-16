import { useEffect, useState } from "react"
import './index.css';
import { Table, Button, Modal, Input } from 'antd';
import { Link } from "react-router-dom"


const TablePage = ({ products }) => {

    const [isEditing, setIsEditing] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)

    const columns = [{
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (text) => `$${text}`, 
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: "Actions",
        key: "Actions",
        render: (record) => {
            return (
                <div className="edit-delete">
                    <Button onClick={() => {
                        onEditProduct(record)
                    }} className="buttons">Edit</Button>
                    <Button onClick={() => {
                        onDeleteProduct(record)
                    }} className="delete-button">Delete</Button>
                </div>
            )
        }
    },
];


    const [productData, setProductData] = useState();

    useEffect(() => {
      setProductData(products)
    }, [products])
    

    const onDeleteProduct = (record) => {
        console.log(record)
        setProductData(pre => {
            return pre.filter(product => product.key !== record.key)
        })
    }

    const onEditProduct = (record) => {
        setIsEditing(true)
        setEditingProduct(record)
    }

    const resetEditing = () => {
        setIsEditing(false)
        setEditingProduct(null)
    }

    return (
        <div className="table-page">
            <Link to="/addproduct">
                <Button className="add-button" type="primary">Add Product</Button>
            </Link>

            <Table className="table-container"
                columns={columns}
                dataSource={productData}
            />
            <Modal
                title="Product Editing"
                visible={isEditing}
                okText="Save"
                onCancel={() => {
                    resetEditing()

                }}
                onOk={() => {
                    setProductData(pre => {
                        return pre.map(product => {
                            if (product.key === editingProduct.key) {
                                return editingProduct
                            }
                            else {
                                return product
                            }
                        })
                    })
                    resetEditing()
                }}
            >
                <Input value={editingProduct?.name} onChange={(e) => {
                    setEditingProduct(pre => {
                        return { ...pre, name: e.target.value }
                    })
                }} />
                <Input value={editingProduct?.category} onChange={(e) => {
                    setEditingProduct(pre => {
                        return { ...pre, category: e.target.value }
                    })
                }} />
                <Input value={editingProduct?.description} onChange={(e) => {
                    setEditingProduct(pre => {
                        return { ...pre, description: e.target.value }
                    })
                }} />
                <Input value={editingProduct?.price} onChange={(e) => {
                    setEditingProduct(pre => {
                        return { ...pre, price: e.target.value }
                    })
                }} />

            </Modal>
        </div>
    )
}

export default TablePage