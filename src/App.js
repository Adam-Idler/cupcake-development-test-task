import React, { Component } from 'react';
import Loader from "./Loader/Loader";
import Table from './Table/Table';

class App extends Component {
  state = {
    isLoading: true,
    isPolling: false,
    markets: []
  }

  getJSON = params => {
    const MAX_WAITING_TIME = 10000;// in ms
    const wrappedPromise = {};

    const promise = new Promise(function (resolve, reject) {
      wrappedPromise.resolve = resolve;
      wrappedPromise.reject = reject;
    });

    wrappedPromise.then = promise.then.bind(promise);
    wrappedPromise.catch = promise.catch.bind(promise);
    wrappedPromise.promise = promise;// e.g. if you want to provide somewhere only promise, without .resolve/.reject/.catch methods
    
    fetch(params.url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(function (response) {
        wrappedPromise.resolve(response);
      }, function (error) {
        wrappedPromise.reject(error);
      })
      .catch(function (error) {
        wrappedPromise.catch(error);
      });

    const timeoutId = setTimeout(function () {
      // reject on timeout
      wrappedPromise.reject(new Error('Load timeout for resource: ' + params.url)); 
    }, MAX_WAITING_TIME);

    return wrappedPromise.promise
      .then(function(response) {
        clearTimeout(timeoutId);
        return response;
      })
      .then(function(response) {
        if (response.status === 200 || response.status === 0) {
          return Promise.resolve(response)
        } else {
          return Promise.reject(new Error(response.statusText))
        }
      })
      .then(function(response) {
        return response.json();
      });
  }

  longPoll = (url, i, arr) => {
    const _this = this;
    this.getJSON({
      url: this.state.isPolling ? url + '/poll' : url
    }).then(function(data) {// on success
      _this.longPoll(url, i, arr);
      arr[i] = data;
      let arrFilter = arr.filter(item => item != null);

      _this.setState({
        isLoading: arrFilter.length === arr.length ? false : true,
        isPolling: true,
        markets: arrFilter.length === arr.length ? arr : []
      })
    }, function(error) {// on reject
      _this.longPoll(url, i, arr);
      console.error('An error occured!');
      console.error(error.message ? error.message : error);
    })
  }

  componentDidMount() {
    const markets = [];

    this.longPoll.bind(this, '/first', 0, markets)();
    this.longPoll.bind(this, '/second', 1, markets)();
    this.longPoll.bind(this, '/third', 2, markets)();
  }

  render() {
    return (
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
        <div className="table-responsive w-75">
          {
            this.state.isLoading 
            ? <Loader />
            : <Table 
                markets={this.state.markets}
              />
          }
        </div>
      </div>
    );
  }
}

export default App;
