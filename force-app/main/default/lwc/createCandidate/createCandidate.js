import { LightningElement,api,track } from 'lwc';
import addNewCandidate from '@salesforce/apex/LWCApex.addNewCandidate';
import { ShowToastEvent}  from 'lightning/platformShowToastEvent';

export default class CreateCandidate extends LightningElement 
{
    @api FName;
    @api PhoneNo;
    @api Email_ID;
    
    handlechange(event)
    {
        this.FName=event.target.value;
    }
    Mobilehandlechange(event)
    {
        this.PhoneNo=event.target.value;
    }
    Emailhandlechange(event)
    {
        this.Email_ID=event.target.value;
    }

    handleclick()
    {
        addNewCandidate
        (
            {
                cName:this.FName,
                cEmail:this.Email_ID,
                cPhone:this.PhoneNo

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