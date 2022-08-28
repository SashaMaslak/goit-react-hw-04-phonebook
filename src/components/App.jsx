import { Component } from 'react';
import { theme } from 'theme';
import { Box } from './Box';
import { Section } from './Section/Section';
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

  componentDidMount() {
    const savedState = localStorage.getItem('contacts');
    if (savedState) {
      this.setState({ contacts: JSON.parse(savedState) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    if (prevState.contacts.length !== this.state.contacts.length) {
      this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
    }
  }

  handleAddContact = contact => {
    if (this.state.contacts.some(cont => cont.name === contact.name)) {
      alert('Contact already exist');
      return;
    }
    this.setState(prev => ({
      contacts: [...prev.contacts, contact],
    }));
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  setFilterValue = ({ target: { value } }) => {
    this.setState({ filter: value });
  };

  render() {
    const filteredContacts = filterContacts(
      this.state.contacts,
      this.state.filter
    );
    return (
      <Box
        as={theme.as.s}
        width={theme.space[12]}
        bg={theme.colors.bgSection}
        my={theme.space[5]}
        mx={theme.position.a}
        p={theme.space[5]}
      >
        {' '}
        <Section title={'Phonebook'}>
          <ContactForm onAddContact={this.handleAddContact} />
        </Section>
        <Section title={'Contacts'}>
          <Filter handleSetFilterValue={this.setFilterValue} />
          <ContactList
            contacts={filteredContacts}
            handleDeleteContact={this.handleDeleteContact}
          />
        </Section>
      </Box>
    );
  }
}
