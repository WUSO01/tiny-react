# tiny-react

## Example

```javascript
import React from 'tinys-react'

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
      </div>
    )
  }
}

React.render(<App name='world' />, document.getElementById('root'))
```
