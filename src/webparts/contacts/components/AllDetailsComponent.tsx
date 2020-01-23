import * as React from"react";
import {Contact } from "../models/Contact";
import {ContactService} from '../services/service';
import styles from "./Contacts.module.scss";
interface IState{
  contacts:Contact[]
}
interface IProps{
  showContact:any
}
export class AllDetailComponent extends React.Component<IProps,IState>{
  service : ContactService;
constructor(props:IProps) {
  super(props);
  this.service=new ContactService();
  // this.state={
  //   contacts:this.service.getAllContacts()
  // }  
  console.log("called second");
}
displayall(contacts:Contact[]){
  console.log("display called");
return(
  contacts.map(d=>
          <ul key={d.id} className={styles["display-item"]} onClick={(e)=>{
            this.props.showContact(d.id)
            console.log(d,d.id)
          }}>
            <li >{d.name}</li>
              <li >{d.email}</li>
                <li >{d.contactnumber}</li>
                  </ul>
       )
     
        )
}

    render()
    {
        return (
        <div className={styles["main-container"]}>
        
<h1>Contacts </h1>
<ol className={styles["display-list"]}>
    
      { this.displayall(this.service.getAllContacts())}
      {console.log("printed")}
      </ol>
        </div>
       
            )
    }
}