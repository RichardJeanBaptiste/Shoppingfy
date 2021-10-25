import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LOGO from './assets/logo.svg';
import SOURCE from './assets/source.svg';
import { ListUl, ArrowCounterclockwise, FileEarmarkBarGraph, Search } from 'react-bootstrap-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button  from 'react-bootstrap/Button';
import CartIcon from './components/CartIcon';
import LeftNavIcon from './components/LeftNavIcon';
import ItemSection from './components/ItemSection';


//import { useState } from 'react';

const fruitData = ["Avocado", "Banana", "Bunch of Carrots", "Chicken 1kg", "Pre-cooked corn 450g", 
"Mandarin Nadorcott", "Piele De Sapo Melon", "Watermelon"];

const meatData = ["Chicken leg box", "Chicken 1kg", "Pork fillets 450g", "Salmon 1kg"];

const bevData = ["Acocado", "Banana", "Bunch of carrots 5pcs", "Chicken 1kg", "Pre-cooked corn 450g",
"Mandarin Nadorcott", "Piele De Sapo Melon", "Watermelon"];

function App() {

 
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

            <div className='ItemSectionStyle'>
                <ItemSection Title="Fruits and Vegetables" Data={fruitData}/>
            </div>  
            
            <div className='ItemSectionStyle'>
                <ItemSection Title="Meat and Fish" Data={meatData}/>
            </div>

            <div className='ItemSectionStyle'>
                <ItemSection Title="Beverages" Data={bevData}/>
            </div>
      </div>

      <div className='SearchContainer'>
          <div className='AddItemContainer'>
              <img src={SOURCE} alt="logo" style={{ width: '75%', height: '102%', marginLeft: '-14%', marginTop:'-9%'}}/>
              <div className='AddItemContainer2'>
                  <p style={{ color:'white', fontSize:'20px', lineHeight:'20px', fontWeight: 700, whiteSpace:'pre-wrap', marginTop:'15%', marginLeft:'-11%'}}>{"Didn't find what you \nneed"}</p>
                  <Button variant='light' style={{ marginLeft: '-11%', width:'63%', height:'27%'}}>Add item</Button>
              </div>
          </div>
      </div>

    </div>
  );
}

export default App;
