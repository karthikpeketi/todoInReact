import {Component} from 'react'

import './index.css'

class Tags extends Component {
  state = {
    isTagActive: false,
  }

  onClickTag = () => {
    // const {displayText} = isTagActive

    this.setState(
      prevState => ({isTagActive: !prevState.isTagActive}),
      () => {
        const {isTagActive} = this.state
        const {tagDetails, handleFilterByTag} = this.props
        const {displayText} = tagDetails
        handleFilterByTag(displayText, isTagActive)
      },
    )
  }

  render() {
    const {isTagActive} = this.state

    const {tagDetails} = this.props
    const {displayText} = tagDetails
    const activeStyling = isTagActive === true ? 'active-styling' : null
    return (
      <li>
        <button
          onClick={this.onClickTag}
          className={`${activeStyling} tag-button`}
          type="button"
        >
          {displayText}
        </button>
      </li>
    )
  }
}

export default Tags
