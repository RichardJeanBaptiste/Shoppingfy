import './DisplayItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

export default function DisplayItem(props){

    const LabelAndInfo = (props) => {

        return (
            <div className='di_info1'>
                <p>{props.label}</p>
                <h3 className='di_info1_label'>{props.info}</h3>
            </div>
        )
    }

    return (
        <div className='di_root'>
            <div className='di_backbutton' onClick={() => props.closeDisplay(false)}>
                <FontAwesomeIcon icon={faArrowLeft}/>
                <p>back</p>
            </div>

            <div className='di_root2'>
                <Image className='di_displayimg' src={props.displayItems[1]}/>
                <LabelAndInfo className='di_info1' label='name' info={props.displayItems[0]}/>
                <LabelAndInfo className='di_info1' label='category' info={props.displayItems[3]}/>
                <LabelAndInfo className='di_info1' label='note' info={props.displayItems[2]}/>

                <div className='di_confirmButtons'>
                    <p onClick={() => props.deleteItemFunc(props.displayItems[3], props.displayItems[0])}>delete</p>
                    <Button>Add to list</Button>
                </div>

            </div>
            
        </div>
        
    )
}