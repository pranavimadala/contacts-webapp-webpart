import * as React from "react";
import { Contact } from "../models/Contact";
import styles from "./Contacts.module.scss";
import { ContactService } from '../services/service';
interface Iprops {
  id: number;
  contactDetails: boolean,
  activateForm: any
}
export class DetailComponent extends React.Component<Iprops, {}>{
  service: ContactService;
  selectedContact: Contact
  constructor(props: any) {
    super(props);
    this.service = new ContactService();
    this.selectedContact = new Contact(0, '');
  }

  DeleteContact(id: number) {
    this.service.deleteContact(id);
  }
  display() {
    this.selectedContact = this.service.getContact(this.props.id)

  }
  render() {
    if (this.props.contactDetails) {
      return (
        <div className={styles["body-routing"]}>
          <h1>Contact details</h1>
          {this.display()}
          <ul>
            <li>Employee Id: {this.selectedContact.id}</li>
            <li>Eloyee Name: {this.selectedContact.name}</li>
            <li>Email id: {this.selectedContact.email}</li>
            <li>Department: {this.selectedContact.department}</li>
            <li>ContactNUmber: {this.selectedContact.contactnumber}</li>
            <li>Choose:{this.selectedContact.choose}</li>
            <li>PeoplePicker:{this.selectedContact.people}</li>
            
          </ul>
          <br />
          <br />
          <button onClick={(e) => this.props.activateForm(this.selectedContact.id)}>
            EDIT
</button>
          <button onClick={(e) => this.DeleteContact(this.selectedContact.id)}>
            DELETE
</button>

        </div>
      )
    }

    else {
      return null
    }
  }
}