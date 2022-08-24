import { Component } from 'react';
import { theme } from 'theme';
import { Box } from './Box';
import { Section } from './Section/Section';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

// helpers
import { filterContacts } from 'helpers/filterContacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedState = localStorage.getItem('contacts');
    console.log(savedState);
    if (savedState) {
      this.setState({ contacts: JSON.parse(savedState) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      const savedState = localStorage.getItem('contacts');
      console.log(savedState);
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
