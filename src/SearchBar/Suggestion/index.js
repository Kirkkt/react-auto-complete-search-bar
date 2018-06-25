import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.ul`
  border-radius: 3px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: 0;
  border: 1px solid #f1f1f1;
  list-style-type: none;
  margin: 0;
  max-height: 380px;
  overflow-y: auto;
  padding: 0;
`
const Item = styled.li`
  cursor: pointer;
  padding: 10px;
  list-style-type: none;
  font-size: 16px;
  font-weight: 100;
  &:hover {
    background: papayawhip;
  }
`

export default class Suggestion extends React.Component {
  render() {
    const { value } = this.props
    if (!value) {
      return null
    }
    return (
      <Wrapper>
        {[...new Array(120)].map((_, index) => (
          <Item key={index}>
            {'item ' + index}
          </Item>
        ))}
      </Wrapper>
    )
  }
}
