import React from 'react'
import ReactDOM from 'react-dom'

class ChatApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      socket: io('http://localhost:8080'),
      user: undefined
    }
  }

componentDidMount () {
  console.log('componentDidMount here')
  var self = this
  this.state.socket.on('receive-message', function(msg) {
    var messages = self.state.messages
    messages.push(msg)
    self.setState({messages: messages})
  })
}

submitMessage () {
  var body = document.getElementById("message").value
  var message = {
    body: body,
    user: this.state.user || "guest"
  }
  this.state.socket.emit("new-message", message)
  console.log('message sent' + message);
}
  pickUser () {
    console.log('new user picked')
    var user = document.getElementById("user").value
    this.setState({user: user})
  }
  render () {
    console.log('new render')
    var self = this
    var messages = self.state.messages.map(function(msg){
      return <li key={Math.random()}><strong>{msg.user}:  </strong><span>{msg.body}</span></li>
    })
    return (
      <div>
        <ul>
          {messages}
        </ul>
        <input id='message' type='text' /><button onClick={() => self.submitMessage()}>send message</button><br/>
        <input id='user' type='text' placeholder='username' onChange={() => self.pickUser()} />
      </div>
    )
  }
}

ReactDOM.render(<ChatApp />, document.getElementById('chat'))
