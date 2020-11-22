import React from 'react';
import SkyLight from 'react-skylight';
import Register from './Register';
import 'typeface-roboto';

class LoginToRegister extends React.Component {
 
    registerFormat = {
        width: '90%',
        minHeight: '500px',
        position: 'absolute',
        top: '45%',
        marginTop: '-200px',
        backgroundColor: '#fff',
        borderRadius: '2px',
        zIndex: '100',
        padding: '15px',
        boxShadow: '0px 0px 4px rgba(0,0,0,.14),0px 4px 8px rgba(0,0,0,.28)',
      }

  render() {
    console.log('step logintoregister');

    return (
      <div>
        <button id = "registerLink" onClick ={() => this.customDialog.show()}>Register now</button>
        <SkyLight dialogStyles={this.registerFormat} ref={ref => this.customDialog = ref}>
            <div id = "registerArea">
                <Register/>
            </div>
        </SkyLight>
      </div>
    );
  }
}

export default LoginToRegister;