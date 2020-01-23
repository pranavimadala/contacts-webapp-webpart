import {  IPickerTerms } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";
export class Contact{
    id:number;
    name:string;
    email:string;
    department:string;
    contactnumber:string;
     choose:string;
     date:Date;
     people:string[];
     termset:IPickerTerms;
    constructor(id:number,name:string) {
       this.id=id;
       this.name=name;
       this.email=name;
       this.department=name;
       this.contactnumber=name
}
 }

