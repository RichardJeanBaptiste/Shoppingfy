 import { React, useState } from 'react';
 import Modal from 'react-bootstrap/Modal';
 import Form from 'react-bootstrap/Form';
 import Button from 'react-bootstrap/Button';
 
 // Add Item Modal

 export default function AddItemModal(props) {

    let itemList = props.Data;
    const show = props.show;
    //const setShow = props.setShow;

    const [ category, setCategory ] = useState("");
    const [ food, setFood ] = useState("");
    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleFoodChange = (e) => setFood(e.target.value);


    const handleAddItem = () => {

      //Check if category exist

      let doesKeyExist = (check) => {

        let doesExist = false;

        for(let i = 0; i < itemList.length; i++){
          if(itemList[i].Title === check){
            doesExist = true;
          }
        }
        
        return doesExist;
      }

     
      let getFoodValues = (title) => {
        let foodFilter = itemList.filter(x => x.Title === title)
        return foodFilter;
      }

      let doesValueExist = (foods,check) => {

        let doesExist = false;

        for(let i = 0; i < foods[0].Items.length; i++){

          if(foods[0].Items[i] === check){
            doesExist = true;
          }
        }

        return doesExist;
      }


      if(doesKeyExist(category)){

        // check if value exists
        if(doesValueExist(getFoodValues(category), food)){
            alert("Exists")
            props.setShow(false)
            return;
            
        }else{
          let f = getFoodValues(category);
          //let temp = [...f];
          //temp[0].Items.push(food);
          //console.log(temp);
          f[0].Items.push(food)
          props.setShow(false)
        }

      }else{
        let x = [...itemList];

        
        x.push({
          Title: category,
          Items: [food]
        })

        
        props.setData(x)
        props.setShow(false)
        
      }        
       
      
    }
    
      return (
        <>
          <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add a New Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" placeholder="Enter Category" onChange={handleCategoryChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Food</Form.Label>
                        <Form.Control type="text" placeholder="Enter Food" onChange={handleFoodChange}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleAddItem}>
                Save Changes
              </Button>
              <Button variant="primary" onClick={props.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
  }
// Add Item Modal