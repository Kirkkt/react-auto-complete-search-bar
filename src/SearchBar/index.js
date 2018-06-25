import React from 'react'
import styled from 'styled-components'

import InputField from './InputField'
import Suggestion from './Suggestion'

const Wrapper = styled.div`
  width: 600px;
  margin: 10px auto;
`

export default class SearchBar extends React.Component {
  state = {
    value: '',
  }
  onInputTextChange = value => this.setState({ value })
  render() {
    const { value } = this.state
    return (
      <Wrapper>
        <InputField
          onChange={this.onInputTextChange}
          value={value}
        />
        <Suggestion
          value={value}
        />
      </Wrapper>
    )
  }
}
