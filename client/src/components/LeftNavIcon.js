import '../App.css';
import { React} from 'react';


export default function LeftNavIcon(props){

    /*
    const [ showInfo, setShowInfo ] = useState(false);

    function show() {
        if(showInfo){
            return {
                display: 'inline'
            }
        }else{
            return {
                display: 'none'
            }
        }
    }

    function handleShow(){
        if(showInfo){
            setShowInfo(false)
        }else{
            setShowInfo(true)
        }
    }
    */

    return (
        <div className='IconRow'>
            
            
            {props.ICON}
            
        </div>
    )
    
}

/**
 * 
 * <div className='IconHoverBar' />
 * 
 * 
 * <div className='IconHoverInfo'>
                <p style={{ textAlign: 'center', fontSize:'12px', color:'white'}}>{props.info}</p>
            </div>
 * 
 */