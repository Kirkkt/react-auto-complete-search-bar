import React from 'react'
import styled from 'styled-components'
import { debounce } from 'lodash'

import redirectToId from '../utils/redirectToId'
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
    focus: 0,
  }
  doSearch = value => {
    if (!value) {
      return
    }
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
    this.setState({ value, focus: 0 })
    this.debouncedDoSearch(value)
  }
  onFocusIncrease = delta => {
    let nextFocus = this.state.focus + delta
    nextFocus = Math.max(0, nextFocus)
    nextFocus = Math.min(this.state.results.length, nextFocus)
    this.setState({ focus: nextFocus })
  }
  onEnter = () => {
    const { focus, results } = this.state
    if (focus === 0 || !results || results.length === 0) {
      return
    }
    redirectToId(results[focus - 1].imdbID)

  }
  render() {
    const {
      value,
      results,
      focus,
    } = this.state
    return (
      <Wrapper>
        <InputField
          onChange={this.onInputTextChange}
          value={value}
          onArrowDown={() => this.onFocusIncrease(1)}
          onArrowUp={() => this.onFocusIncrease(-1)}
          onEnter={this.onEnter}
        />
        <Suggestion
          value={value}
          results={results}
          focus={focus}
        />
      </Wrapper>
    )
  }
}
