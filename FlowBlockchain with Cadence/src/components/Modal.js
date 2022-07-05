import React, { } from 'react'
//import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
// import AddEditForm from './FormAddEdit'

const ModalForm = () => {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     modal: false
  //   }
  // }

  // const toggle = () => {
  //   this.setState(prevState => ({
  //     modal: !prevState.modal
  //   }))
  // }


  //   const closeBtn =  <button className="close" onClick={toggle}>&times;</button>

  //   const label = ""//this.props.buttonLabel

  //   let button = ''
  //   let title = ''

  //   if(label === 'Edit'){
  //     button = <Button
  //               color="warning"
  //               onClick={toggle}
  //               style={{float: "left", marginRight:"10px"}}>{label}
  //             </Button>
  //     title = 'Edit Item'
  //   } else {
  //     button = <Button
  //               color="success"
  //               onClick={toggle}
  //               style={{float: "left", marginRight:"10px"}}>{label}
  //             </Button>
  //     title = 'Add New Item'
  //   }


    return (
    <div>
      {/* {button}
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={toggle} close={closeBtn}>{title}</ModalHeader>
        <ModalBody>
          <AddEditForm
            addItemToState={this.props.addItemToState}
            updateState={this.props.updateState}
            toggle={toggle}
            item={this.props.item} />
        </ModalBody>
      </Modal> */}
    </div>
  )
}

export default ModalForm