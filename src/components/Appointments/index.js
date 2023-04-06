// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', isFilter: false, appointmentsList: []}

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onFilter = () => {
    this.setState(previous => ({isFilter: !previous.isFilter}))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  addAppointment = event => {
    event.preventDefault()

    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isStared: false,
    }
    this.setState(previous => ({
      appointmentsList: [...previous.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onToggleIsStared = id => {
    this.setState(previous => ({
      appointmentsList: previous.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStared: !eachAppointment.isStared}
        }
        return eachAppointment
      }),
    }))
  }

  allAppointments = () => {
    const {appointmentsList, isFilter} = this.state

    if (isFilter) {
      return appointmentsList.filter(
        eachAppointment => eachAppointment.isStared === true,
      )
    }

    return appointmentsList
  }

  render() {
    const {title, date} = this.state
    const filteredList = this.allAppointments()

    return (
      <div className="app-container">
        <div className="appointment-container">
          <div className="sub-container">
            <h1 className="main-heading">Add Appointment</h1>
            <div className="input-image-container">
              <form className="form-container" onSubmit={this.addAppointment}>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  placeholder="TITLE"
                  value={title}
                  className="input"
                  id="title"
                  onChange={this.onChangeTitle}
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  value={date}
                  placeholder="dd/mm/yyy"
                  className="input"
                  id="date"
                  onChange={this.onChangeDate}
                />
                <button type="submit" className="submit-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-image"
              />
            </div>
            <hr className="separator" />
            <div className="bottom-section-heading-container">
              <h1 className="main-heading bottom-section-heading">
                Appointments
              </h1>
              <button
                type="button"
                className="submit-button stared-button"
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-list-container">
              {filteredList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  eachAppointment={eachAppointment}
                  onToggleIsStared={this.onToggleIsStared}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
