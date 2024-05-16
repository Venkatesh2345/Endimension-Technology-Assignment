
//import 'antd/dist/antd.css';
import './App.css';
import { Button, Input, Select } from "antd";
import { useState } from "react"
import AddPage from './components/AddPage';
import TablePage from './components/TablePage';
// import {Link, withRouter,Switch,Route,Redirect}  from 'react-router-dom'

const App=()=> {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(["Books", "Clothing", "Electronics"]);
  const [selectedCategory, setSelectedCategory] = useState()
  const [products,setProducts]=useState([
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
])

  const onChangeName = (e) => {
    setName(e.target.value)
  }

  const onChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  const onChangeCategory = (e) => {
    setSelectedCategory(e)
  }

  const doFilters = () => {
    console.log(name, description, category)
  }

  return (
    <div className="App">
      <div className="main-data">
        <div className="heading">
          <h1>Product Management Application</h1>

        </div>

        <div className="filter-box  ">
          <p>Filter</p>
          <Input className="input" onChange={onChangeName} placeholder="Name"></Input>
          <Input className="input" onChange={onChangeDescription} placeholder="Description"></Input>
          <Select className="input" onChange={onChangeCategory} placeholder="Category" value={selectedCategory}>
            {category.map((fruit, index) => {
              return <Select.Option key={index} value={fruit}>{fruit}</Select.Option>
            })}
          </Select>
          <Button onClick={doFilters} type="primary">Search</Button>
        </div>
        <TablePage products={products}/>
        {/* <AddPage/> */}
        
      </div>
    </div>
  )
}

export default App;
