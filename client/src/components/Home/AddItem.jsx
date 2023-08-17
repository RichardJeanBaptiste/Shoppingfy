import './AddItem.css';
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function AddItem(props) {

    let { userId } = useParams();

    const [ name, setName ] = useState("");
    const [ note, setNote ] = useState("");
    const [ imgUrl, setImgUrl ] = useState("");
    const [ category, setCategroy ] = useState("");
    const [displayCat, setDisplayCat] = useState("none");
    


    const optionHandler = (e) => {
        if(e.target.value === "New Category"){
            setDisplayCat("block");
        } else {
            setDisplayCat("none");
            setCategroy(e.target.value);
        }
    }

    const nameHandler = (e) => {
        setName(e.target.value);
    }

    const noteHandler = (e) => {
        setNote(e.target.value);
    }

    const imgHandler = (e) => {
        setImgUrl(e.target.value);
    }

    const categoryHandler = (e) => {
        setCategroy(e.target.value);
    }

    const submitHandler = () => {
        
        axios.post('http://localhost:5000/add_items', {
            USERID: userId,
            Category: category,
            IMG: imgUrl,
            Note: note,
            New_Item: name,
         }).then((response) => {
             if(response.status === 200){
                props.refetchBoolFunc(true);
             } else {
                alert("Something went wrong!");   
             }
         }).catch((error) => {
             console.log(error);
         }) 
    }

   
    return (

        <div className='add_item_root'>

            <div className='add_div'>
                <h3 className='add_title'>Add a new item</h3>

                <Form className='add_item_form'>

                    <Form.Group className="mb-4">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter a name" className='add_input1' onChange={nameHandler}/>
                    </Form.Group>   

                    <Form.Group className="mb-4">
                        <Form.Label>Note (optional) </Form.Label>
                        <Form.Control  as="textarea" placeholder="Leave a comment here" className='add_input2' onChange={noteHandler}/>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Image (optional) </Form.Label>
                        <Form.Control type="text" placeholder="Enter a url" className='add_input1' onChange={imgHandler}/>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Category</Form.Label>
                        <Form.Select className='add_input1' onClick={optionHandler}>
                            <option>Enter a category</option>
                            {props.categories.map((x, index) => {
                                return (
                                    <option value={x.key} key={index}>{x.key}</option>
                                )
                            })}
                            <option value="New Category">New Category</option>
                        </Form.Select>
                        <Form.Control style={{ display: displayCat}}type="text" placeholder='New Category' className='add_input3' onChange={categoryHandler}/>
                    </Form.Group>
                    
                </Form>

                <div className='button_group'>
                    <Button className="cancel_button" variant='link' onClick={props.close}>cancel</Button>
                    <Button className="save_button" onClick={submitHandler}>Save</Button>
                </div>
                
            </div>
            
        </div>
    )
}
