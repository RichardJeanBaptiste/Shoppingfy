 import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LOGO from './assets/logo.svg';
import SOURCE from './assets/source.svg';
import { ListUl, ArrowCounterclockwise, FileEarmarkBarGraph, Search, PlusLg, PenFill, X } from 'react-bootstrap-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';
import Button  from 'react-bootstrap/Button';
import CartIcon from './components/CartIcon';
import LeftNavIcon from './components/LeftNavIcon';
import { v4 as uuidv4} from 'uuid';
import { useState } from 'react';


function App() {

  const [ itemList, setItemList] = useState([
      {
        Title: 'Fruits And Vegetables',
        Items: ["Apples", "Banana", "Strawberries","Pears", "Avocado", "Brocolli"]
      },
      {
        Title: 'Beverages',
        Items: ["Water", "Beer", "Lemonade"]
      }
  ]);

  // Modal Functions
  const [ show, setShow ] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Modal Functions

  // Shopping List Functions
  const [ shoppingList, setShoppingList ] = useState([]);
  //const [ newEntry, setNewEntry ] = useState({});
  //Shopping List Functions



  // Item Section Component

  function ItemSection(props){

    let data = props.Data;

    function ItemCell(props) {
        let cellItem = props.Item
        let cellTitle = props.Title
        return (
            <div style={{display: 'flex', flexDirection:'row', marginLeft:'2%'}}>
                <div style={{ display: 'flex', flexDirection:'row', width: '16em', height: '65px', backgroundColor:'white', borderRadius:'12px'}}>
                    <p style={{ fontStyle: 'normal', fontSize:'22px', fontWeight: 'bold', lineHeight:'20px', marginTop:'6%', marginLeft: '7%', width:'70%'}}>
                        {props.Item}
                    </p>
                    
                    <PlusLg style={{ marginTop:'8%', marginLeft: '7%',color: '#C1C1C4'}} />
                    
                </div>
            </div>
        )
    }

    function ItemRow() {
        let count = 1;
        let temp = [];
        let final = [];

        data.map((food, i) => {
   
            if(count !== 4){
                temp.push(<ItemCell Title={props.Title} Item={food} key={i}/>)
                count++;
            }else if(count === 4){

                temp.push(<ItemCell Item={food} key={i}/>)
                let tempMap = temp.map((item) => {
                    return item;
                })

                let ItemLi = () => {
                    return (
                        <li style={{ display:'flex', flexDirection: 'row', marginBottom: '2%'}}>
                            {tempMap}
                        </li>
                    )
                }
                final.push(<ItemLi key={i}/>)
                count = 1;
                temp = [];
                
            }
            return 'x';
        })


        let LeftOver = () => {
            return (
                <li style={{ display:'flex', flexDirection: 'row', marginBottom: '2%'}}>
                    {temp.map( (items) => {
                        return items;
                    })}
                </li>
            )
        }

        final.push(<LeftOver key={uuidv4()}/>);

        return (
            <>
                {final.map((item,i) => {
                    return item;
                })}
            </>
        )
    }

    return (
        <> 
            <h3 style={{ fontWeight:'bold', marginLeft: '4%', marginBottom: '2%'}}>{props.Title}</h3>
            <ul>
                <ItemRow/>
            </ul>
            
        </>
    )
}
  // Item Section Component

  // Add Item Modal

    function AddItemModal() {

      const [ category, setCategory ] = useState("");
      const [ food, setFood ] = useState("");
      const handleCategoryChange = (e) => setCategory(e.target.value);
      const handleFoodChange = (e) => setFood(e.target.value);
      const handleAddItem = () => {
        let x = itemList;

        x.push({
          Title: category,
          Items: [food]
        })

        setItemList(x)

        setShow(false)
      }
      
        return (
          <>
            <Modal show={show} onHide={handleClose}>
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
                <Button variant="primary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )
    }
  // Add Item Modal

 
  return (
    <div className="App">

      <div className="LeftNav">
        <div className="LeftNavContainer">
            <img src={LOGO} alt="Logo" style={{ width: '60px', height: '60px', marginTop: '2em'}}/>

            <div className='LeftNavIconContainer'>

              
              <LeftNavIcon info='items' ICON={<ListUl className='LeftNavIcons'/>}/>

              <LeftNavIcon info='history' ICON={<ArrowCounterclockwise className='LeftNavIcons'/>}/>

              <LeftNavIcon info='statistics' ICON={<FileEarmarkBarGraph className='LeftNavIcons'/>}/>

            </div>

            <div style={{ marginTop:'15em', marginLeft: '17px'}}>
              <CartIcon/>
            </div>
        </div>
      </div>

      <div className='CenterContainer'>
          <div className='CenterTitle'>

            <h3 style={{ whiteSpace: 'pre-wrap', fontWeight: 700, fontStyle:'normal', fontSize:'26px', lineHeight:'32.5px', marginTop:'1em'}}> 
              <span style={{ color: '#F9A109' , fontWeight: 700}}>Shoppingfy</span> {'allows you to take your \nshopping list wherever you go'} 
            </h3>

            <InputGroup style={{ width: '25em', height: '4em', marginLeft: '7%', marginTop:'2%'}}>

                <InputGroup.Text style={{ backgroundColor: 'white' }}>
                  <Search/>
                </InputGroup.Text>
                
                <FormControl
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  style={{ borderLeftStyle: 'none'}}
                  placeholder='search item'
                />
              
            </InputGroup>
          </div>

          <AddItemModal/>
          
          <div style={{ marginTop: '5%'}}>
              {/***************** Items ***************/}

              {itemList.map((item, i) => {
                  return(
                    <div className='ItemSectionStyle'>
                        <ItemSection Title={item.Title} Data={item.Items} key={i}/>
                    </div>
                  )
              })}
          </div>

            
      </div>

      <div className='SearchContainer'>
          <div className='AddItemContainer'>
              <img src={SOURCE} alt="logo" style={{ width: '69%', height: '102%', marginLeft: '-18%', marginTop:'-9%'}}/>
              <div className='AddItemContainer2'>
                  <p style={{ color:'white', fontSize:'20px', lineHeight:'20px', fontWeight: 700, whiteSpace:'pre-wrap', marginTop:'15%', marginLeft:'-11%'}}>{"Didn't find what you \nneed"}</p>
                  <Button variant='light' style={{ marginLeft: '-11%', width:'63%', height:'27%'}} onClick={handleShow}>Add item</Button>
              </div>
          </div>

          <div style={{ display:'flex', flexDirection: 'row', width: '25em', marginLeft:'12%', marginTop:'4em'}}>
              <p style={{ color:'#34333A', fontSize:'24px', lineHeight:'30px', fontWeight:700}}>Shopping list</p>
              <PenFill style={{ fontSize: '18px', marginLeft:'49%', marginTop:'1%'}}/>

          </div>
      </div>

    </div>
  );
}

export default App;


