import './Home.css';
import HeartPic from '../../assets/shoppingify-master/logo.svg';
import WineLogo from '../../assets/shoppingify-master/source.svg';
import EmptyLogo from '../../assets/shoppingify-master/empty.svg';
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
import DisplayItem from './DisplayItem';


export default function Home() {

    let { userId } = useParams();
    //const navigate = useNavigate();

    const [ ShowAddItem, SetShowAddItem ] = useState(false);
    const [ ItemList, SetItemList ] = useState([]);
    const [ Categories, SetCategories] = useState([]);
    const [ Refetch, SetRefetch ] = useState(false);
    const [ displayItemInfo, SetDisplayItemInfo ] = useState(false);
    const [ currentDisplayItems, SetCurrentDisplayItems] = useState([]);
    const [ emptyList, SetEmptyList ] = useState(true);
    const [ shoppingList, SetShoppingList ] = useState({});


    /**
     *  [categroy: [ [item, amt], [item,amt]]]
     * 
     */

    useEffect( () => {
        if(Object.keys(shoppingList).length === 1){
            SetEmptyList(false)   
        }

    },[shoppingList]);
    

    useEffect(() => {

        axios.post('/get_items', {
            USERID: userId,
         }).then((response) => {
             if(response.status === 200){
                 //console.log(response.data);
                 const tempArr = Object.entries(response.data).map(([key, value]) => ({ key, value}));
                 const tempCatArr = Object.entries(response.data).map(([key]) => ({ key }));
                 SetItemList(tempArr);
                 SetCategories(tempCatArr);
             } else {
                 console.log("Failed request");
             }
         }).catch((error) => {
             console.log(error);
         })     
    },[userId]);

    useEffect(() => {
        if(Refetch){
            axios.post('/get_items', {
                USERID: userId,
             }).then((response) => {
                 if(response.status === 200){
                     //console.log(response.data);
                     const tempArr = Object.entries(response.data).map(([key, value]) => ({ key, value}));
                     const tempCatArr = Object.entries(response.data).map(([key]) => ({ key }));
                     SetItemList(tempArr);
                     SetCategories(tempCatArr);
                     SetRefetch(false);
                 } else {
                     console.log("Failed request");
                 }
             }).catch((error) => {
                 console.log(error);
             })  
        }

    },[userId, Refetch]);

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

        const openDisplayItems = (itemname, itemimg, itemnote, itemcategory) => {
            SetCurrentDisplayItems([itemname, itemimg, itemnote, itemcategory]);
            SetDisplayItemInfo(true);
        }

        const addItemToCart = (itemname, itemcategory) => {

            //console.log(shoppingList);
            /**
             * Check if category exists
             * Check if item exists
             * Check amount
             */
            if (itemcategory in shoppingList){
                
                let temp2 = { ...shoppingList};

                let itemExists = false;

                temp2[itemcategory].map( (x, index) => {

                    if(x[0] === itemname){
                        itemExists = true;
                    }
                    console.log(x[0]);
                    return "";
                })
                
                if(!itemExists){
                    temp2[itemcategory].push([itemname, 1]);
                }

                SetShoppingList(temp2);

            } else { 

                let temp = {
                    ...shoppingList,
                    //itemcategory: [itemname , 1],
                }
                
                temp[itemcategory] = [[itemname, 1]];

                SetShoppingList(temp);
            }

            console.log(shoppingList);

        }

        return (
            <div className='item_category'>
                <h3 >{props.Title}</h3>
                <div className='item_container'>
                    {props.Items.map((x, index) => {
                        return (
                            <div className='item_cell' key={index}>
                                <div key={uuidv4()}>
                                    <p onClick={() => openDisplayItems(x[0], x[1], x[2], props.Title)}>{x[0]}</p>
                                    <FontAwesomeIcon icon={faPlus} onClick={() => addItemToCart(x[0], props.Title)}/>
                                </div>
                            </div>  
                        )
                    })}
                </div>
                
            </div>
        )
    }

    const CurrentList = () => {
        
    }


    const ListDisplay = () => {

        if(emptyList){
            return (
                <div className='emptyList_root'>
                    <p className='emptyListP'>No Items</p>
                    <Image className='emptyListImg' src={EmptyLogo}/>
                </div>
            )
        } else {
            return (
                <div>
                    
                </div>
            )
        }
        
    }
    /**********************************  Main Components **********************************************/

    const ShoppingList = () => {

        if(displayItemInfo){
            return (
                <DisplayItem
                    displayItems = {currentDisplayItems}
                    closeDisplay= {SetDisplayItemInfo}
                />
            )
        }else if(ShowAddItem){
            return (
                <AddItem  
                    refetchBoolFunc = {SetRefetch}                
                    categories={Categories} 
                    close={show}
                />
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

                    <ListDisplay/>
    
    
                    
                    <div className='add_item_footer'>
                        <div className='add_item_footer_search'>
                            <Form.Control placeholder='Enter a name'/>
                            <Button className='add_item_footer_button'>Save</Button>
                        </div>
                        
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

 // let itemExists = false;

                // temp2[itemcategory].map( (x, index) => {

                //     if(x[0] === itemname){
                //         x[1] = x[1] + 1;
                //         itemExists = true;
                //     }
                //     console.log(x[0]);
                //     return "";
                // })
                
                // if(!itemExists){
                //     temp2[itemcategory].push([itemname, 1]);
                // }
                