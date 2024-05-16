
//import 'antd/dist/antd.css';
import './index.css';
import { Button, Input, Select, Form } from "antd";
import { useState } from "react"
import { useArrayContext } from '../../Context';

function AddPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(["Books", "Clothing", "Electronics"]);
  const [selectedCategory, setSelectedCategory] = useState()
  const { array, addItem } = useArrayContext();

  const handleSubmit = ()=>{
    const newItem =  {

        category: selectedCategory,
        name,
        description,
        price,
        key: array.length + 1,
    }

    console.log(newItem);
  }


  const onChangeCategory=(e)=>{
    setSelectedCategory(e)
  }


  return (
    <div className="add-product-page">
        <div className="product-main-container ">
            <h1 className="heading">Add Product Form</h1>
            <div className="product-container">
                <Form>
                    <Form.Item className="input1" label="Catergory" name="category">
                        <Select className="input1" onChange={onChangeCategory} placeholder="category" value={selectedCategory}>
                            {category.map((fruit, index) => {
                                return <Select.Option key={index} value={fruit}>{fruit}</Select.Option>
                            })}
                        </Select>   
                    </Form.Item>
                    <Form.Item className="input1" label="Name" name="name">
                        <Input placeholder='Name' required></Input>

                    </Form.Item>
                    <Form.Item className="input1" label="Description" name="description">
                        <Input placeholder='Description' required></Input>
                    </Form.Item>
                    <Form.Item className="input1" label="Price" name="price">
                        <Input type="number" placeholder='Price' required></Input>
                    </Form.Item>
                    <Form.Item className="input1">
                        <Button type="primary" htmlType='submit' onClick={handleSubmit}>ADD ITEM</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </div>
  )
}

export default AddPage;
