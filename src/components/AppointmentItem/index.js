// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, onToggleIsStared} = props
  const {id, title, date, isStared} = eachAppointment

  const imageChange = () => {
    onToggleIsStared(id)
  }

  const starImage = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-item">
      <div className="appointment-details">
        <p className="item-heading">{title}</p>
        <button
          type="button"
          data-testid="star"
          className="button-star"
          onClick={imageChange}
        >
          <img src={starImage} alt="star" className="star-image" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
