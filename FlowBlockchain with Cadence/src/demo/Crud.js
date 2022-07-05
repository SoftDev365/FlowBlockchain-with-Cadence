import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ModalForm from '../components/Modal'
import DataTable from '../components/DataTable'
//import { CSVLink } from "react-csv"

const Crud = ()=> {
  // state = {
  //   items: []
  // }
  const [items, setItems] = useState([])

  // const getItems = () => {
  //   fetch('http://localhost:3000/crud')
  //     .then(response => response.json())
  //     .then(items => this.setState({items}))
  //     .catch(err => console.log(err))
  // }

  const addItemToState = (item) => {
    setItems(prevState => ({
      items: [...prevState.items, item]
    }))
  }

  const updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data.id === item.id)
    const newArray = [
    // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
    // add the updated item to the array
      item,
    // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray })
  }

  const deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item.id !== id)
    this.setState({ items: updatedItems })
  }

  const getData = () => {

  }
  // componentDidMount(){
  //   this.getItems()
  // }

  return (
    <Container className="App">
      <Row>
        <Col>
          <h1 style={{margin: "20px 0"}}>BlockChain Database</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <DataTable items={items} updateState={updateState} deleteItemFromState={deleteItemFromState} />
        </Col>
      </Row>
      <Row>
        <Col>
          <button onClick={getData}>
            Get Data from BlockChain
          </button>
          <ModalForm buttonLabel="Add Item" addItemToState={addItemToState}/>
        </Col>
      </Row>
    </Container>
  )
}

export default Crud