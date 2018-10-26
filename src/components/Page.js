import React from 'react'
import PropTypes from 'prop-types'

export class Page extends React.Component {
  onBtnClick = e => {
    this.props.getPhotos(e) // setYear -> getPhotos
  }
  renderTemplate = () => {
    const { photos, isFetching, error } = this.props

    if (error) {
      return <p className="error">Во время загрузки фото произошла ошибка</p>
    }

    if (isFetching) {
      return <p>Загрузка...</p>
    } else {
      return photos.map((entry, index) => ( // [1]
        <div key={index} className="photo">
          <p>
            <img src={entry.sizes[0].url} alt="" />
          </p>
          <p>{entry.likes.count} ❤</p>
        </div>
      ))
    }
  }

  render() {
    const { year, photos, years } = this.props
    return (
      <div className="ib page">
        <p>
          {years.map(item => <button key={item} className="btn" onClick={() => this.onBtnClick(item)}>
            {item}
          </button>)}
        </p>
        <h3>
          {year} год [{photos.length}]
        </h3>
        {this.renderTemplate()}
      </div>
    )
  }
}

Page.propTypes = {
  year: PropTypes.number.isRequired,
  photos: PropTypes.array.isRequired,
  getPhotos: PropTypes.func.isRequired,
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
}