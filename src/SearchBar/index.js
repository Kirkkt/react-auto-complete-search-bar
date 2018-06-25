import React from 'react'
import styled from 'styled-components'
import { debounce } from 'lodash'

import redirectToId from '../utils/redirectToId'
import InputField from './InputField'
import Suggestion from './Suggestion'

// how many ms do we wait until we think the user is done inputing, this is because we use debounce here to avoid
// creating a lot of uncessary API requests for partial user inputs
const SEARCH_WAIT = 1000
// 1000 free queries a day for this API key
const AUTO_COMPLETE_URL_PREFIX = 'http://www.omdbapi.com/?apikey=99adea95&s='

const Wrapper = styled.div`
  width: 600px;
  margin: 10px auto;
`

export default class SearchBar extends React.Component {
  state = {
    // search bar input value
    value: '',
    // result objects from imdb API server
    results: [],
    // which index do we highlight with keyboard arrow up/down. Note that 0 means not focus on anything, 1 means the 1st
    // one, ..., {results.length} means the last one
    focus: 0,
  }
  doSearch = value => {
    // don't send a wasteful search with empty query
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
      // body.Response can be either 'True' or 'False' (string value)
      if (body.Response.toLowerCase() !== 'true') {
        throw new Error(body.Error)
      } else {
        // body.Search contains actual objects of interest
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
    // when user types, focus/highlight should be cleared to avoid confusion
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
    // when nothings is highlighted, do nothing
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
