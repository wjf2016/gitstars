import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TagCategorys extends Component {
  handleSwitchTagCategory (category) {
    this.props.onSwitchCategory(category)
  }

  render () {
    const {
      categorys,
      activeCategory,
      style
    } = this.props

    const values = Object.values(categorys)
    const slidebarWidth = 100 / values.length
    const index = values.findIndex(value => value.id === activeCategory.id)
    const slidebarStyle = {
      left: `${index * slidebarWidth}%`,
      width: `${slidebarWidth}%`
    }

    return (
      <ul className='tag-category' style={style}>
        <li className="tag-category__slider" style={slidebarStyle}></li>
        {
          categorys.map(category => {
            return (
              <li
                key={category.id}
                className={`tag-category__item ${category.id === activeCategory.id ? 'active' : ''}`}
                onClick={this.handleSwitchTagCategory.bind(this, category)}>
                {category.name}
              </li>
            )
          })
        }
      </ul>
    )
  }
}

TagCategorys.propTypes = {
  categorys: PropTypes.array.isRequired,
  activeCategory: PropTypes.object.isRequired,
  onSwitchCategory: PropTypes.func.isRequired,
  style: PropTypes.object
}

TagCategorys.defaultProps = {
  style: {}
}

export default TagCategorys
