import { ContactListItem } from "./ContactListItem";

export function ContactList({ contacts, handleDeleteContact }) {
   return (
      <ul>
         {contacts.map(({ id, name, number }) => {
            return (
               <ContactListItem
                  key={id}
                  id={id}
                  name={name}
                  number={number}
                  handleDeleteContact={handleDeleteContact} />
            );
         })}
      </ul>
   );
}