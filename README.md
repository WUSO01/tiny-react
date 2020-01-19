# tiny-react

## Example

```javascript
import React from 'tiny-react'

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
