import * as React from "react";
import { Contact } from "../models/Contact";
import { ContactService } from '../services/service';
import styles from "./Contacts.module.scss";
import { DateTimePicker, DateConvention, TimeConvention } from "@pnp/spfx-controls-react";
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { TaxonomyPicker, IPickerTerms } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";
interface State {
    contact: Contact,
    addUsers:string[]
}

interface IProps {
    id: number,
    addForm: boolean,
    deactivateForm: any,
    context:WebPartContext
}

export class FormComponent extends React.Component<IProps, State>{
    service: ContactService;
    mode: string;
    form: any
    contact: Contact
    date:Date
    constructor(props: IProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this._getPeoplePickerItems=this._getPeoplePickerItems.bind(this);
        this.onTaxPickerChange=this.onTaxPickerChange.bind(this);
        this.state = {
            contact: this.props.id === 0 ? new Contact(this.props.id, ' ') : this.service.getContact(this.props.id),
        addUsers:[]
        };
        this.date=new Date(this.state.contact.date)
        this.service = new ContactService();
        this.mode = this.props.id === 0 ? "Add" : "Edit"
    }

    handleSubmit(event: any) {
        console.log("before",this.state.contact)
        if (this.mode === 'Add')
            this.service.addContact(this.state.contact);
        else
            this.service.editContact(this.state.contact);
        event.preventDefault();
        this.props.deactivateForm();
    }

    componentWillReceiveProps() {
        this.setState({
            contact: this.props.id === 0 ? new Contact(this.props.id, ' ') : this.service.getContact(this.props.id)
        })
        this.mode = this.props.id === 0 ? "Add" : "Edit"
        this.date=new Date(this.state.contact.date)
        console.log(this.date)
        console.log(this.state.contact.date)
    }

    changeHandler(event: any) {

        this.setState(
            {
                contact: {
                    ...this.state.contact, [event.target.name]: event.target.value
                }
            }

        );



    }
    private onTaxPickerChange(terms : IPickerTerms) {
        console.log("Terms", terms);
        this.setState({
            contact:{
              ...this.state.contact,  termset:terms
            }
        })
    }
    private _getPeoplePickerItems(items: any) {
        console.log('Items:', items);
        console.log(items[0].id,items[0].text);
        this.setState({
            contact:{
              ...this.state.contact,  people:items[0].id
            }
        })
      }
    render() {

        if (this.props.addForm) {
            return (
                <div className={styles["body-routing"]}>
                    <div className={styles["form-container"]}>
                        <h1>{this.mode} Contact</h1>

                        <form onSubmit={this.handleSubmit} >

                            <label>
                                Employee Id:
                   <input type="text" name='id' value={this.mode === 'Add' ? ' ' : this.state.contact.id} disabled className={styles["datainput"]} />
                            </label>
                            <br /><br />
                            <label >
                                Employee name:</label>
                            <input type="text" pattern="[A-Z a-z]*" name='name' value={this.state.contact.name} onChange={this.changeHandler} className={styles["datainput"]} required />
                            <br /><br />
                            <label htmlFor="email">
                                Employee email:
                   <input type="email" name='email' value={this.state.contact.email} onChange={this.changeHandler} className={styles["datainput"]} required />
                            </label><br /><br />
                            <label>
                                Employee Department:
                   <input type="text" pattern="[A-Z a-z]*" name='department' value={this.state.contact.department} onChange={this.changeHandler} className={styles["datainput"]} required />
                            </label><br /><br />
                            <label>
                                Employee contactnumber:
                   <input type="text" name='contactnumber' value={this.state.contact.contactnumber} onChange={this.changeHandler} className={styles["datainput"]} required />
                            </label><br /><br />
                            <label>
                                Choose:
              <input type="radio" name='choose' value='YES' checked={this.state.contact.choose === 'YES'} onChange={this.changeHandler} />YES
            <input type="radio" name='choose' value='NO' checked={this.state.contact.choose === 'NO'} onChange={this.changeHandler} />NO
            <br/><br/>
          </label>
       
                            <PeoplePicker
    context={this.props.context}
    titleText="People Picker"
    personSelectionLimit={1}
    groupName={""}
    defaultSelectedUsers={this.state.contact.people}
    showtooltip={true}
    isRequired={true}
    disabled={false}
    ensureUser={true}
  selectedItems={this._getPeoplePickerItems}
    showHiddenInUI={false}
    principalTypes={[PrincipalType.User]}
    />
     <br/><br/>
     <TaxonomyPicker allowMultipleSelections={false}
                termsetNameOrID="Department"
                panelTitle="Select Term"
                label="Taxonomy Picker"
                context={this.props.context}
                onChange={this.onTaxPickerChange}
                isTermSetSelectable={true} />
                <br/>
                <br/>
     <input type="submit" value={this.mode} className={styles["edit-class"]} />
                        </form>
                    </div>
                </div>
            )
        }
        else {
            return (null)
        }
    }
}