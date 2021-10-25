import { React } from 'react';
import { PlusLg } from 'react-bootstrap-icons';


export default function ItemSection(props){

    let data = props.Data;


    function ItemCell(props) {
        return (
            <div style={{display: 'flex', flexDirection:'row', marginLeft:'2%'}}>
                <div style={{ display: 'flex', flexDirection:'row', width: '16em', height: '65px', backgroundColor:'white', borderRadius:'12px'}}>
                    <p style={{ fontStyle: 'normal', fontSize:'22px', fontWeight: 'bold', lineHeight:'20px', marginTop:'6%', marginLeft: '7%', width:'70%'}}>
                        {props.Item}
                    </p>
                    <PlusLg style={{ marginTop:'8%', marginLeft: '7%',color: '#C1C1C4'}}/>
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
                temp.push(<ItemCell Item={food} key={i}/>)
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