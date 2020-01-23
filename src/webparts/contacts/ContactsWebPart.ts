import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  WebPartContext
} from '@microsoft/sp-webpart-base';
import { sp } from "@pnp/sp";
import * as strings from 'ContactsWebPartStrings';
import Contacts from './components/Contacts';
import { IContactsState } from './components/IContactsState';

export interface IContactsWebPartProps {
  description: string;
  context:WebPartContext;
  siteUrl:string
}

export default class ContactsWebPart extends BaseClientSideWebPart<IContactsWebPartProps> {
  public onInit(): Promise < void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }
 
  public render(): void {
    const element: React.ReactElement<IContactsWebPartProps> = React.createElement(
      Contacts,
      {
        description: this.properties.description,
       context:this.context,
       siteUrl:this.context.pageContext.web.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
