import React from 'react';
import './App.css';
import User from './components/user'
import UniqueID from 'react-html-id';

class App extends React.Component {
    constructor(props) {
      super(props);
      UniqueID.enableUniqueIds(this);
      this.state = {
        search: '',
        contacts: props.contacts,
        direction: {
          id: 'asc',
        },
        users: []
      };
      this.sortBy = this.sortBy.bind(this)
    }

    componentDidMount() {
      fetch("http://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => (this.setState({ users: data })))
    }

    updateSearch(event) {
      this.setState({search: event.target.value.substr(0,20)})
    }

    addContact(event) {
      event.preventDefault();
      let id = this.nextUniqueId().slice(5);
      let name = this.refs.name.value;
      let username = this.refs.username.value;
      this.setState({
        users: this.state.users.concat({id, name, username})
      });
      console.log(this.state.users);
      this.refs.name.value = '';
      this.refs.username.value = '';
    }

    sortBy(key) {
      this.setState({
        contacts: this.state.users.sort( (a, b) => (
          this.state.direction[key] === 'asc'
            ? parseFloat(b[key]) - parseFloat(a[key])
            : parseFloat(a[key]) - parseFloat(b[key])
        )),
        direction: {
          [key]: this.state.direction[key] === 'asc'
            ? 'desc'
            : 'asc'
        }
      })

    }

    deleteUser = (key, e) => {
      const users = Object.assign([], this.state.users);
      users.splice(key, 1);
      this.setState({users: users});
    }

    changeUserName = (id, event) => {
      if (event.target.value.length === 0) {
        return;
      }
      const index = this.state.users.findIndex((user)=> {
          return (user.id === id);
      })

      const user = Object.assign({}, this.state.users[index]);
      user.name = event.target.value;

      const users = Object.assign([], this.state.users);
      users[index] = user;

      this.setState({users: users});
    }

    render() {
      let filteredUsers = this.state.users.filter(
        (user) => {
          return user.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
      );

      return (
        <div>
          <input type="text"
            placeholder="Search"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}/>
          <form onSubmit={this.addContact.bind(this)}>
            <input type="text" placeholder="Name" ref="name" />
            <input type="text" placeholder="Username" ref="username" />
            <button type="submit">Add New Contact</button>
          </form>
          <table>
            <thead>
              <tr>
                <th>
                <button
                  onClick={() => this.sortBy('id')}
                >
                id
                </button>
                </th>
                <th>Name</th>
                <th>Username</th>
                <th>NameEdit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredUsers.map((user, key) => {
                  return (<User
                    id={user.id}
                    users={user.name}
                    usernames={user.username}
                    key={this.nextUniqueId()}
                    delEvent={this.deleteUser.bind(this, key)}
                    changeEvent={this.changeUserName.bind(this, user.id)}>
                    {user.name}
                    </User>)
                })
              }
            </tbody>
          </table>
        </div>
      )
    }
}

export default App;
