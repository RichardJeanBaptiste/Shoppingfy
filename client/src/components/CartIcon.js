import '../App.css';
import { React } from 'react';
import { Cart3 } from 'react-bootstrap-icons';

export default function CartIcon(props){
    return (
        <div className='CartIconBackground'>
            <div className='CartIconContainer'>
                <p style={{ color: 'white', textAlign: 'center'}}>3</p>
            </div>
            <Cart3 style={{ width:'25px', height: '25px', marginLeft: '19%', marginTop: '-40%', color: 'white'}}/>
        </div>
    )
}