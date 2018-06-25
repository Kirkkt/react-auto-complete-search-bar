import React from 'react'
import styled from 'styled-components'
import { debounce } from 'lodash'

import InputField from './InputField'
import Suggestion from './Suggestion'

const SEARCH_WAIT = 1000
const AUTO_COMPLETE_URL_PREFIX = 'http://www.omdbapi.com/?apikey=99adea95&s='

const Wrapper = styled.div`
  width: 600px;
  margin: 10px auto;
`

export default class SearchBar extends React.Component {
  state = {
    value: '',
    results: [],
  }
  doSearch = value => {
    fetch(
      AUTO_COMPLETE_URL_PREFIX + this.state.value,
    ).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.statusText)
      }
    }).then(body => {
      if (body.Response.toLowerCase() !== 'true') {
        throw new Error(body.Error)
      } else {
        this.setState({ results: body.Search })
      }
    })
    .catch(error => {
      this.setState({ results: [] })
      alert(error.message)
    })
  }
  debouncedDoSearch = debounce(this.doSearch, SEARCH_WAIT)
  onInputTextChange = value => {
    this.setState({ value })
    this.debouncedDoSearch(value)
  }
  render() {
    const { value, results } = this.state
    return (
      <Wrapper>
        <InputField
          onChange={this.onInputTextChange}
          value={value}
        />
        <Suggestion
          value={value}
          results={results}
        />
      </Wrapper>
    )
  }
}
