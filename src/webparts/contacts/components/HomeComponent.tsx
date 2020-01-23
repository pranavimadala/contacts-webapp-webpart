import * as React from "react";
import { AllDetailComponent } from "./AllDetailsComponent";
import styles from "./Contacts.module.scss";
interface IProps{
      activateForm:any,
      deactivateForm:any,
      showContact:any
}
export class HomeComponent extends React.Component<IProps> {
      render() {
            return (
                  <div >
                        <div>
                              <div className={styles['title-container']}>ADDRESS BOOK</div>
                              <div className={styles["nav-link"]} >
                                   
                                   <input type="button" value="+ADD" onClick={(e)=> {
                                         this.props.activateForm(0)} }/> 
                              </div>
                        </div>
                        <div>
                              <AllDetailComponent showContact={this.props.showContact}/>
                        </div>

                  </div>
            )
      }
}
