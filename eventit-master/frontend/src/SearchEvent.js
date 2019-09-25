import React, { Component } from 'react'
import { classnames } from './helpers';
import api from './api';
import MessageHandler from './Message/messageHandler'
import PlacesAutocomplete from 'react-places-autocomplete';
import { Link } from 'react-router-dom';
import ToggleButton from 'react-toggle-button'
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import './search.css';
class SearchEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      errorMessage: '',
      latitude: null,
      longitude: null,
      isError: false,
      isGeocoding: false,
      value: false,
      event: ''
    };
    this.handleEventChange = this.handleEventChange.bind(this);
  }

  handleChange = address => {
    this.setState({
      address,
      latitude: null,
      longitude: null,
      errorMessage: '',
    });
  };
  handleEventChange = event => {
    debugger;
    this.setState({
      event: event.target.value
    });
  };

  handleSelect = selected => {
    this.setState({ isGeocoding: true, address: selected });
    debugger;
    geocodeByAddress(selected)
      .then((res) => {

        var { lat, lng } = getLatLng(res[0])
        this.setState({
          latitude: lat,
          longitude: lng,
          address: res[0]["formatted_address"],
          isGeocoding: false,
        });
        var link = document.getElementById('test');
        link.click();
      })
      .catch(error => {
        this.setState({ isGeocoding: false });
        this.setState({ isError: true });
        this.setState({ errorMessage: error });
        console.log('error', error); // eslint-disable-line no-console
      });
  };

  handleCloseClick = () => {
    this.setState({
      address: '',
      latitude: null,
      longitude: null,
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status);
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  render() {
    const clsThumbStyle = { borderRadius: '0.2rem', };
    const clsTrackStyle = { borderRadius: '0.2rem' };
    const clsLabelStyle = { width: '50rem', padding: "1rem!important" };

    const {
      address,
      errorMessage,
      latitude,
      longitude,
      isGeocoding,
      event,
    } = this.state;
    let body = null;
    if (this.state.value) {
      body = (<div>
        <PlacesAutocomplete
          onChange={this.handleChange}
          value={address}
          onSelect={this.handleSelect}
          onError={this.handleError}
          shouldFetchSuggestions={address.length > 2}>
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <div>
                <div className="clssearch-box">
                  <input
                    {...getInputProps({
                      placeholder: 'Search Places...',
                      className: 'clssearch-txt',
                    })}
                  />
                  {this.state.address.length > 0 && (
                    <button
                      className="Demo__clear-button"
                      onClick={this.handleCloseClick}
                    >
                      x
                </button>
                  )}
                  {suggestions.length > 0 && (
                    <div className=" clsSuggestionContainer">
                      {suggestions.map(suggestion => {
                        const className = classnames('clsSuggestionItem', {
                          'clsSuggestionItem-active': suggestion.active,
                        });

                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, { className })}
                          >
                            <strong>
                              {suggestion.formattedSuggestion.mainText}
                            </strong>{' '}
                            <small>
                              {suggestion.formattedSuggestion.secondaryText}
                            </small>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>
            );
          }}
        </PlacesAutocomplete>
        {
          errorMessage.length > 0 && (
            <div className="Demo__error-message">{this.state.errorMessage}</div>
          )
        }

        {
          ((latitude && longitude) || isGeocoding) && (
            <div>
              <h3 className="Demo__geocode-result-header">Geocode result</h3>
              {isGeocoding ? (
                <div>
                  <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
                </div>
              ) : (
                  <div>
                    <div className="Demo__geocode-result-item--lat">
                      <label>Latitude:</label>
                      <span>{latitude}</span>
                    </div>
                    <div className="Demo__geocode-result-item--lng">
                      <label>Longitude:</label>
                      <span>{longitude}</span>
                    </div>
                  </div>
                )}
            </div>
          )
        }
        <Link to={{
          pathname: "/events", address: {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            address: this.state.address
          }
        }} style={{ hidden: true }} id="test">
        </Link>
      </div>

      )
    }
    else {
      body = (
        <div>
          <div>
            <div className="clssearch-box">
              <input
                placeholder='Search Events...'
                className='clssearch-txt' value={this.state.event} onChange={this.handleEventChange}
                onKeyPress={(event) => {
                  if (event.key === 'Enter' || event.key === 'Return') {
                    var link = document.getElementById('eventtest');
                    link.click();
                  }
                }}
              />
              <button
                className="Demo__clear-button"
                onClick={this.handleCloseClick}
              >
                x
                </button>
            </div>

          </div>
          <Link to={{
            pathname: "/events", event: {
              event: this.state.event
            }
          }} style={{ hidden: true }} id="eventtest">
          </Link>
        </div >

      )
    }
    var error = null;
    if (this.state.isError) {
      error = <MessageHandler message={{ isError: this.state.isError, message: this.state.errorMessage }} />
    }
    else if (!this.state.isError && this.state.errorMessage !== '') {
      error = <MessageHandler message={{ isError: this.state.isError, message: this.state.errorMessage }} />
    }
    else {
      error = null
    }
    return (
      <div >
        {error}
        <div className="clssearch-container">
          <div className="clsToggleSwitchContainer col-lg-12">
            <div className="clsToggleSwitchContainerInner col-lg-12">
              <div className="clsToggleLabels">Search Events</div>
              <ToggleButton
                inactiveLabel=""
                activeLabel=""
                colors={{
                  activeThumb: {
                    base: 'rgb(1, 100, 124)',
                  },
                  inactiveThumb: {
                    base: 'rgb(1, 100, 124)',
                  },
                  active: {
                    base: 'rgb(255,255,255);',
                    hover: 'rgb(255,255,255);',
                  },
                  inactive: {
                    base: 'rgb(255,255,255)',
                    hover: 'rgb(255,255,255)',
                  }
                }}
                thumbStyle={clsThumbStyle}
                trackStyle={clsTrackStyle}
                labelStyle={clsLabelStyle}
                value={this.state.value}
                onToggle={(value) => {
                  this.setState({
                    value: !value,
                  })
                }} />
              <div className="clsToggleLabels">Search Places</div>
            </div>

          </div>

          {body}
        </div>
      </div>
    );
  }

}
export default SearchEvent;