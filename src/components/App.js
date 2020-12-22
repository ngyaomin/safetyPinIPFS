import React, { Component } from 'react';
import safetyPinLogo from '../safetyPin.png';
import './App.css';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      buffer: null,
      ipfsHash: 'Qmbi4GowPrWGc9cNSNxQg3b22qwkLv3oG5m3xYh86BbxbK'
    }
  }

  captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
    }
  }
//"Qmbi4GowPrWGc9cNSNxQg3b22qwkLv3oG5m3xYh86BbxbK"
// url https://ipfs.infura.io/ipfs/Qmbi4GowPrWGc9cNSNxQg3b22qwkLv3oG5m3xYh86BbxbK
  onSubmit = (event) => {
    event.preventDefault()
    console.log("Pinning file to ipfs...")
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Pinning', result)
      const ipfsHash = result[0].hash
      this.setState({ ipfsHash })
      if(error) {
        console.error(error)
        return
      }

    })
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.stillthinking"
            target="_blank"
            rel="noopener noreferrer"
          >
            Safety Pin Home
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={`https://ipfs.infura.io/ipfs/${this.state.ipfsHash}`} className="App-logo" alt="logo" />
                </a>
                <h1>Safety Pin IPFS</h1>
                <p>&nbsp;</p>
                <h2>Upload your Documents here</h2>
                <form onSubmit={this.onSubmit} >
                  <input type="file" onChange={this.captureFile} />
                  <input type="submit" />
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
