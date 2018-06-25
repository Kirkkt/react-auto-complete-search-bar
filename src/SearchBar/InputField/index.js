import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-radius: 3px;
  border: 1px solid #f1f1f1;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 400;
  outline: 0;
  padding: 10px;
  width: 100%;
`

export default class InputField extends React.Component {
  onKeyDown = ({ key }) => {
    if (key === 'ArrowDown') {
      this.props.onArrowDown()
    }
    if (key === 'ArrowUp') {
      this.props.onArrowUp()
    }
    if (key === 'Enter') {
      this.props.onEnter()
    }
  }
  render() {
    return (
      <Input
        type="text"
        placeholder="Let's search something..."
        value={this.props.value}
        onChange={({ target: { value }}) => this.props.onChange(value)}
        onKeyDown={this.onKeyDown}
      />
    )
  }
}

