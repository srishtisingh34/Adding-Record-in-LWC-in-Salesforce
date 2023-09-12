import { LightningElement,track } from 'lwc';
import FName from '@salesforce/schema/Candidate__c.Full_Name__C';
import PhoneNo from '@salesforce/schema/Candidate__c.PhoneNumber__c';
import Email_ID from '@salesforce/schema/Candidate__c.EmailID__c';

import addNewCandidate from '@salesforce/apex/LWCApex.addNewCandidate';
import { ShowToastEvent}  from 'lightning/platformShowToastEvent';

export default class CreateCandidate extends LightningElement 
{
    @track studDetails = 
    {
        firstname:FName,
        phone:PhoneNo,
        email:Email_ID

    };
    
    handlechange(event)
    {
        this.studDetails.firstname=event.target.value
    }
    phonehandlechange(event)
    {
        this.studDetails.phone=event.target.value
    }
    Emailhandlechange(event)
    {
        this.studDetails.email=event.target.value
    }

    handleclick()
    {
        addNewCandidate
        (
            {
                cName:this.studDetails.firstname,
                cEmail:this.studDetails.email,
                cPhone:this.studDetails.phone

            }
        ).then(result =>
        {
            const event = new ShowToastEvent
            ({
                title : 'Candidate Registered',
                message: 'New Candidate'+this.studDetails.firstname+'created.',
                variant: 'success'

            });
            this.dispatchEvent(event);

        })
        .catch(error=>
        {
            const event = new ShowToastEvent
            ({
                title : 'Error',
                message: 'Error creating student record',
                variant: 'Error'

            });
            this.dispatchEvent(event);

        });
    }

}