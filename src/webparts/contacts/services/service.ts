import { Contact } from '../models/Contact';
import { sp, ItemAddResult, ItemUpdateResult } from "@pnp/sp";
export let contacts: Contact[]=[] ;
export class ContactService {
  public generateId(): number {
    return contacts[contacts.length - 1].id + 1
  }

  public getAllContacts(): Contact[] {
    console.log(contacts);
    return contacts;
  }

  public getAllContactsFromSP() {
    console.log("asdfsfdfd");
    sp.web.lists.getByTitle("Contacts").items.getAll().then((items: any[]) => {
      items.map((detail) => {
        this.converting(detail)
      })
    }
    )
  }

  public getContact(id: number): Contact {
    console.log("getcontact");
    console.log(contacts.filter((con) => { return con.id === id })[0])
    return (contacts.filter((con) => { return con.id === id })[0]);
  }

  public converting(detail): void {
    console.log("convert");
    let newContact = new Contact(0, " ")
    newContact.id = detail["ID"]
    newContact.name = detail["Title"]
    newContact.email = detail["EmailId"]
    newContact.department = detail["Department"]
    newContact.contactnumber = detail["ContactNumber"]
    newContact.choose=detail["Choose"]
    newContact.date=detail["Time"]
    newContact.people=detail["PeopleId"]
    newContact.termset=detail["TermSet"]
    contacts.push(newContact)
    
  }

  public sharepointContactConvertor(contact: Contact) {
    console.log(contact.termset[0].name,contact.termset[0].key,contact.people)
    return ({
      IdNo: contact.id,
      Title: contact.name,
      EmailId: contact.email,
      Department: contact.department,
      ContactNumber: contact.contactnumber,
      Choose:contact.choose,
      PeopleId:contact.people,
      TermSet:{
        __metadata:{"type":"SP.Taxonomy.TaxonomyFieldValue"},
        Label:contact.termset[0].name.toString(),
        TermGuid:contact.termset[0].key.toString(),
        WssId:-1
      }
    })
   
  }

  public addContact(contact: Contact):void {
    contact.id = this.generateId();
    contacts.push(contact);
    let newContact = this.sharepointContactConvertor(contact)
    sp.web.lists.getByTitle("Contacts").items.add(newContact
    )
    .then((response)=>{
      console.log(response);
    })

    
  }

  public deleteContact(id: number) {
    contacts = contacts.filter((e) => e.id !== id);
    sp.web.lists.getByTitle("Contacts").items.getById(id).delete().then(f=>console.log(f))
  }

  public editContact(contact: Contact): Promise<ItemUpdateResult> {
    contacts = contacts.map((con) => { return con.id === contact.id ? { ...contact } : con });
    let newContact = this.sharepointContactConvertor(contact)
    console.log(sp.web.lists.getByTitle("Contacts").items.getById(contact.id).update(newContact));
    return sp.web.lists.getByTitle("Contacts").items.getById(contact.id).update(newContact)
  }
}

