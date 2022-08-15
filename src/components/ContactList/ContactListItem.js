export function ContactListItem({ id, name, number, handleDeleteContact }) {
   return (
      <li>
         <p>Name: {name}</p>
         <p>Number: {number}</p>
         <button onClick={() => handleDeleteContact(id)}>Delete</button>
      </li>
   )
}