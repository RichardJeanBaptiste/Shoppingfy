import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LOGO from './assets/logo.svg';
import { ListUl, ArrowCounterclockwise, FileEarmarkBarGraph } from 'react-bootstrap-icons';
import CartIcon from './components/CartIcon';

function App() {

  return (
    <div className="App">

      <div className="LeftNav">
        <div className="LeftNavContainer">
            <img src={LOGO} alt="Logo" style={{ width: '60px', height: '60px', marginTop: '2em'}}/>

            <div className='LeftNavIconContainer'>

              <div className='IconRow'>
                <div className='IconHoverBar'/>
                <ListUl className='LeftNavIcons'/>
              </div>

              <div className='IconRow'>
                <div className='IconHoverBar'/>
                <ArrowCounterclockwise className='LeftNavIcons'/>
              </div>
              
              <div className='IconRow'>
                <div className='IconHoverBar'/>
                <FileEarmarkBarGraph className='LeftNavIcons'/>
              </div>
              
            </div>

            <div style={{ marginTop:'15em', marginLeft: '6px'}}>
              <CartIcon/>
            </div>
        </div>
      </div>

    </div>
  );
}

export default App;
