import React from 'react'
import PropTypes from 'prop-types'
import { IndexPageTemplate } from '../../templates/index-page'

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    console.log(theme)
    theme = data.colorTheme;
    var mainColor;
    var secondColor;
    if (theme == "mod") {
      mainColor = "#d3d4ce"
      secondColor = "#013246"
    } else {
      mainColor = "purple"
      secondColor = "red"
    }
    return (
      <IndexPageTemplate
        image={getAsset(data.image)}
        title={data.title}
        heading={data.heading}
        mainColor={mainColor}
        secondColor={secondColor}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default IndexPagePreview
