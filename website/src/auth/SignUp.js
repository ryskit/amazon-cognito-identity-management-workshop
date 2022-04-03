/*
 *   Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 *  Licensed under the Apache License, Version 2.0 (the "License").
 *  You may not use this file except in compliance with the License.
 *  A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the "license" file accompanying this file. This file is distributed
 *  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *  express or implied. See the License for the specific language governing
 *  permissions and limitations under the License.
 */
import React from 'react';
import { Auth } from 'aws-amplify';
import DynamicImage from '../components/DynamicImage';
import { withRouter } from 'react-router-dom';

import '../css/app.css';

/**
 * Registration Page
 */
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      email: '',
      phone: '',
      genre: '',
      password: '',
      confirm: '',
      code: ''
    };
  }

  async onSubmitForm(e) {
    e.preventDefault();
    console.info("");
    try {
        const params = {
            username: this.state.email,
            password: this.state.password,
            attributes: {
                email: this.state.email,
                phone_number: this.state.phone,
                'custom:genre': this.state.genre
            },
            validationData: []
        };
        const data = await Auth.signUp(params);
        console.log(data);
        this.setState({ stage: 1 });
    } catch (err) {
      if (err === "No userPool") {
        // User pool not defined in Amplify config file
        console.error("User Pool not defined");
        alert("User Pool not defined. Amplify config must be updated with user pool config");
      } else if (err.message === "User already exists") {
          // Setting state to allow user to proceed to enter verification code
          this.setState({ stage: 1 });
      } else {
          if (err.message.indexOf("phone number format") >= 0) {err.message = "Invalid phone number format. Must include country code. Example: +14252345678"}
          alert(err.message);
          console.error("Exception from Auth.signUp: ", err);
          this.setState({ stage: 0, email: '', password: '', confirm: '' });
      }
    }
  }

  async onSubmitVerification(e) {
    e.preventDefault();
    try {
        const data = await Auth.confirmSignUp(
            this.state.email,
            this.state.code
        );
        console.log(data);
        // Go to the sign in page
        this.props.history.replace('/signin');
    } catch (err) {
        alert(err.message);
        console.error("Exception from Auth.confirmSignUp: ", err);
    }
  }

  onEmailChanged(e) {
    this.setState({ email: e.target.value.toLowerCase() });
  }

  onPhoneChanged(e) {
    this.setState({ phone: e.target.value });
  }
  
  onGenreChanged(e) {
    this.setState({ genre: e.target.value.toLowerCase() });
  }

  onPasswordChanged(e) {
    this.setState({ password: e.target.value });
  }

  onConfirmationChanged(e) {
    this.setState({ confirm: e.target.value });
  }

  onCodeChanged(e) {
    this.setState({ code: e.target.value });
  }

  isValidEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  renderSignUp() {
    const isValidEmail = this.isValidEmail(this.state.email);
    const isValidPassword = this.state.password.length > 1;
    const isValidGenre = this.state.genre.length > 1;
    const isValidConfirmation = isValidPassword && this.state.password === this.state.confirm;

    return (
      <div className="app">
        <header>
          <DynamicImage src="logo.png"/>
        </header>
        <section className="form-wrap">
          <h1>Register</h1>
          <form id="registrationForm" onSubmit={(e) => this.onSubmitForm(e)}>
            <input className={isValidEmail?'valid':'invalid'} type="email" placeholder="Email" value={this.state.email} onChange={(e) => this.onEmailChanged(e)}/>
            <input className='valid' type="phone" placeholder="Phone" value={this.state.phone} onChange={(e) => this.onPhoneChanged(e)}/>
            <input className='valid' type="Genre" placeholder="Genre" value={this.state.genre} onChange={(e) => this.onGenreChanged(e)}/>
            <input className={isValidPassword?'valid':'invalid'} type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.onPasswordChanged(e)}/>
            <input className={isValidConfirmation?'valid':'invalid'} type="password" placeholder="Confirm Password" value={this.state.confirm} onChange={(e) => this.onConfirmationChanged(e)}/>
            <input disabled={!(isValidEmail && isValidPassword && isValidConfirmation)} type="submit" value="Let's Ryde"/>
          </form>
        </section>
      </div>
    );
  }

  renderConfirm() {
    const isValidEmail = this.isValidEmail(this.state.email);
    const isValidCode = this.state.code.length === 6;

    return (
      <div className="app">
        <header>
          <DynamicImage src="logo.png"/>
        </header>
        <section className="form-wrap">
          <h1>Verify Email</h1>
          <form id="verifyForm" onSubmit={(e) => this.onSubmitVerification(e)}>
            <input className={isValidEmail?'valid':'invalid'} type="email" placeholder="Email" value={this.state.email}/>
            <input className={isValidCode?'valid':'invalid'} type="text" placeholder="Verification Code" value={this.state.code} onChange={(e) => this.onCodeChanged(e)}/>
            <input disabled={!(isValidCode&&isValidEmail)} type="submit" value="Verify"/>
          </form>
        </section>
      </div>
    );
  }

  render() {
    switch (this.state.stage) {
      case 0:
      default:
        return this.renderSignUp();
      case 1:
        return this.renderConfirm();
    }
  }
}

export default withRouter(SignUp);
