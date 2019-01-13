import React from 'react';

const User = (props) => {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.children}</td>
      <td>{props.usernames}</td>
      <td><input onChange={props.changeEvent} value={props.children}/></td>
      <td><button onClick={props.delEvent}>X</button></td>
    </tr>
  )
}


export default User;
