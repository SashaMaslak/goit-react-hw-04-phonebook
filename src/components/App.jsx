import { Component } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

// helpers
import { filterContacts } from 'helpers/filterContacts';


const initialContacts = [
   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export class App extends Component {

   state = {
      contacts: initialContacts,
      filter: '',
   };

  handleAddContact = (contact) => {
    if (this.state.contacts.some(cont => cont.name === contact.name)) {
      alert('Contact already exist');
      return;
     }
      this.setState((prev) => ({
         contacts: [...prev.contacts, contact],
      }));
   };

   handleDeleteContact = (id) => {
      this.setState(prevState => ({
         contacts: prevState.contacts.filter((contact) => contact.id !== id),
      }));
   };

   setFilterValue = ({ target: { value } }) => {
      this.setState({ filter: value });
   };

   render() {
      const filteredContacts = filterContacts(this.state.contacts, this.state.filter);
      return (
      <div className="App">
            <ContactForm onAddContact={this.handleAddContact} />
            <Filter handleSetFilterValue={this.setFilterValue} />
            <ContactList contacts={filteredContacts} handleDeleteContact={this.handleDeleteContact} />
         </div>
      );
   };
};
