import * as React from 'react';
import styles from './Contacts.module.scss';
import {HomeComponent} from './HomeComponent';
import {FormComponent} from './FormComponent';
import { IContactsState } from './IContactsState';
import {DetailComponent} from './DetailComponent';
import {ContactService} from '../services/service'
import {IContactsWebPartProps} from '../ContactsWebPart'
export default class Contacts extends React.Component<IContactsWebPartProps,IContactsState> {
  service:ContactService;
  constructor(props:IContactsWebPartProps){
    super(props);
    this.state={
      addForm:false,
      contactDetails:false,
      id:0
    }
    console.log("called first");
    this.service=new ContactService();
    this.service.getAllContactsFromSP();
    this.activateForm=this.activateForm.bind(this);
    this.deactivateForm=this.deactivateForm.bind(this);
    this.showContact=this.showContact.bind(this);
  }
  public activateForm(newid:number){
    this.setState({addForm :true,
    id:newid,
  contactDetails:false})
  }
 public  deactivateForm(){
    this.setState({
      addForm :false,
      id:0
    })
  }
public showContact(newid:number){
  this.setState({
    contactDetails:true,
    id:newid,
    addForm:false
  })
}
  public render(): React.ReactElement<IContactsState> {
    return (
      <div className={styles.contacts}>
        {console.log("rendering")}
      <HomeComponent activateForm={this.activateForm} deactivateForm={this.deactivateForm} showContact={this.showContact}/>
      <FormComponent id={this.state.id} addForm={this.state.addForm} deactivateForm={this.deactivateForm} context={this.props.context}/>
      <DetailComponent id={this.state.id} contactDetails={this.state.contactDetails} activateForm={this.activateForm} />
      </div>
    );
  }
}
