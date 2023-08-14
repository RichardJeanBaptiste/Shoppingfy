import './Home.css';
import HeartPic from '../../assets/shoppingify-master/logo.svg';
import WineLogo from '../../assets/shoppingify-master/source.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRotateLeft, faSquarePollVertical, faCartShopping, faPlus } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddItem from './AddItem';


export default function Home() {

    let { userId } = useParams();
    const navigate = useNavigate();

    
    const [ ShowAddItem, SetShowAddItem ] = useState(false);
    const [ ItemList, SetItemList ] = useState([]);

    useEffect(() => {

        axios.post('/get_items', {
           USERID: userId,
        }).then((response) => {
            if(response.status === 200){
                //console.log(response.data);
                const tempArr = Object.entries(response.data).map(([key, value]) => ({ key, value}));
                SetItemList(tempArr);
            } else {
                console.log("Failed request");
            }
        }).catch((error) => {
            console.log(error);
        })    
        
    },[userId]);
    

    const show = () => {
        if(ShowAddItem) {
            SetShowAddItem(false);
        } else {
            SetShowAddItem(true);
        }
    }

    const logout = () => {
       
        axios.post('http://localhost:5000/logout', {
            USERID: userId,
         }).then((response) => {
             if(response.status === 200){
                //console.log(response.data);
                //navigate('/') 
             } else {
                //navigate('/login')   
             }
         }).catch((error) => {
             console.log(error);
         }) 
    }

    const ItemCategory = (props) => {

        return (
            <div className='item_category'>
                <h3 >{props.Title}</h3>
                <div className='item_container'>
                    {props.Items.map((x, index) => {
                        return (
                            <div className='item_cell'>
                                <div key={uuidv4()}>
                                    <p onClick={() => alert(`${x[0]} - ${x[1]} - ${x[2]}`)}>{x[0]}</p>
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                               
                            </div>  
                        )
                    })}
                </div>
                
            </div>
        )
    }

    const ShoppingList = () => {

        if(ShowAddItem){
            return (
                <AddItem close={show}/>
            )
        } else {

            return (
                <div style={{ width: '2%'}}>
                    <div className='add_item_div'>
                        <Image src={WineLogo}/>
    
                        <div className='add_item_div2'>
                            <p>Didn't find what you need?</p>
                            <Button onClick={show}>Add item</Button>
                        </div>
                    </div>
    
    
                    
                    <div className='add_item_footer'>
                        <Form.Control placeholder='Enter a name'/>
                    </div>
                </div>
            )
        } 
    }

  
    return (
        <div className='home_root'>
            {/*********** Navbar ***********************/}
            <div className='navbar'>
                <Image src={HeartPic} rounded onClick={logout}/>
                <FontAwesomeIcon className='navIcon' icon={faBars} />
                <FontAwesomeIcon className='navIcon' icon={faRotateLeft} />
                <FontAwesomeIcon className='navIcon' icon={faSquarePollVertical} />
                <div className='navBorder'>
                    <FontAwesomeIcon className='navIcon2' icon={faCartShopping} />
                </div>
            </div>

            {/************ Items ***********************/}
            <div className='items'>

                <div className='title'>
                    <h2><span>Shoppingfy</span> allows you to take your<br/>shopping list wherever you go</h2>
                    <input placeholder='    search item'/>
                </div>
              
                <div className='item_root'>
                    {ItemList.map((x , index) => {
                        return (
                            <ItemCategory
                                key={index}
                                Title={x.key}
                                Items={x.value}
                            />
                        )
                    })}
                </div>
                

            </div>

            {/************ Shopping List ************* */}
            <ShoppingList/>
            
        </div>
    )
}

/**
 * <ItemCategory 
        Title="Fruits And Vegetables" 
        Items={ ["Avocado", "Banana", "Bunch of carrots 5pcs", "Chicken 1kg", "Pre-cooked corn 450g", "Mandarin Nadorcott", "Piele De Sapo Melon", "Watermelon"]}
    />

    <ItemCategory 
        Title="Meat and Fish" 
        Items={ ["Chicken leg box", "Chicken 1kg", "Pork fillets 450g", "Salmon 1kg"]}
    />
 */