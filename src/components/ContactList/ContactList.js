export function ContactList({ contacts, handleDeleteContact }) {
   return (
      <ul>
         {contacts.map(({ id, name, number }) => {
            return (
               <li key={id}>
                  <p>name: {name}</p>
                  <p>number: {number}</p>
                  <button onClick={() => handleDeleteContact(id)}>delete</button>
               </li>
            );
         })}
      </ul>
   );
}