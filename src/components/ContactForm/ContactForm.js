import { Component } from "react";
import shortid from 'shortid';
import PropTypes from "prop-types";
import css from './ContactForm.module.css';

export class ContactForm extends Component {
   state = {
      name: "",
      number: "",
   };

   handleChangeInput = ({ target: { value, name } }) => {
      this.setState({ [name]: value });
   };

   handleSubmit = (e) => {
      e.preventDefault();
      const contact = {
         ...this.state,
         id: shortid.generate(),
      };

      this.props.onAddContact(contact);
      this.reset();
   };

   reset = () => {
      this.setState({
         name: '',
         number: '',
      })
   }

   render() {
      return (
         <form className={css.form}  onSubmit={this.handleSubmit}>
            <label className={css.form__label}>
               <input
                  className={css.form__input}
                  onChange={this.handleChangeInput}
                  type="text"
                  name="name"
                  placeholder="name"
                  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                  required
                  value={this.state.name}
               />
            </label>
            <label className={css.form__label}>
               <input
                  className={css.form__input}
                  onChange={this.handleChangeInput}
                  type="tel"
                  name="number"
                  placeholder="number"
                  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                  required
                  value={this.state.number}
               />
            </label>
            <button className={css.form__btn} type="submit">Add Contact</button>
            </form>
      );
   };
};

ContactForm.propTypes = {
   onAddContact: PropTypes.func.isRequired,
};
