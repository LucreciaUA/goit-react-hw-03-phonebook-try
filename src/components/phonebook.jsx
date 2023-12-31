import { Component } from "react";
import css from './phonebook.module.css'
import { ContactForm } from "./contact-form/contact-form";
import { Filter } from "./filter/filter";
import { ContactList } from "./contact-list/contact-list";


class Phonebook extends Component {
    state = {
        contactss: [],
        filter: '',
    }


   // generateId = () => { 
   //     const ids = this.state.contactss.map((contact) => parseInt(contact.id.split('-')[1]));
   //     const max = Math.max(...ids);
   //     const newId = max + 1||1;
   //     const contactId = `id-${String(newId).padStart(2, '0')}`;
   //     return contactId;
  //  }

    deleteContacts = (id) => {
        const newData = this.state.contactss.filter((contact) => contact.id !== id)

        this.setState(
            { contactss: newData })
       
    }

   
    
    inputChange = (e) => {
        this.setState({ filter: e.target.value });
    };
    

    addContact = (newContact) => {
        
        const isExisting = this.state.contactss.some((contact) =>
        { return (contact.name.toLowerCase() === newContact.name.toLowerCase() || contact.number === newContact.number) })
        
        if (!isExisting) {
  

        const newData = [...this.state.contactss, newContact]
        

            this.setState({
            contactss: newData,

            })
            console.log(this.state.contactss)
        }
        else {
            alert(`${newContact.name} is already in your contacts`)
        }
    }

    componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const dataContacts = JSON.parse(contacts);
    if (dataContacts) {
      this.setState({ contactss: dataContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contactss !== prevState.contactss) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contactss));
    }
  }
    
    render() {
        const { contactss, filter } = this.state;
        const searchTerm = filter.toLowerCase();
        const filteredContacts = contactss.filter((contact) => {
            return (
                contact.name.toLowerCase().includes(searchTerm) ||
                contact.number.includes(searchTerm)
            );
        });
        return (
            <div className={css.wrapper}>
            <h1>Phonebook</h1>
                <ContactForm state={this.state}
                    nameChange={this.nameChange}
                    numberChange={this.numberChange}
                    addContact={this.addContact} />
            <h2>Contacts</h2>
                <Filter state={this.state}
                inputChange={this.inputChange}/>
                <ContactList filteredContacts={filteredContacts}
                deleteContacts={this.deleteContacts}/>

            </div>
    )
}

}

export default Phonebook