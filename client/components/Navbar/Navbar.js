import React from 'react';
// import PropTypes from 'prop-types';

const Navbar = () => (
  <header className="header-container">
    <nav>
      <input type="text" placeholder="Search questions" name="Where" />
      <ul>
        <li><a href="/" className="button"><span>Ask a question</span></a></li>
        <li><a href="/" className="button" onClick={this.signIn}><span>Log In</span></a></li>
      </ul>
    </nav>
  </header>
);


export class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      username: '',
      password: '',
    };
  }
  onUsernameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onPasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }
  render() {
    return (
      <form className="form">
        <h2 className="form--header">Join our community!</h2>
        <label htmlFor="username" className="form--label">Username
          <input
            type="text"
            onChange={this.onUsernameChange}
            className="form--input"
            placeholder="Username"
          />
        </label>
        <label htmlFor="Password" className="form--label">Password
          <input
            type="password"
            onChange={this.onPasswordChange}
            className="form--input"
            placeholder="Password"
          />
        </label>
        <div className="form--button-wrapper">
          <button className="form--button" onClick={this.signIn} >Sign In</button>
        </div>
        <h1>Hello {this.state.username}{this.state.password}</h1>
      </form>
    );
  }
}

// export class NavMobile extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       visibility: false,
//     };

//   }

//   showMenu() {
//     this.setState({
//       visibility: !this.state.visibility,
//     });
//   }

//   render() {
//     return (
//       <nav>
//         <MenuWrapper fixed={this.state.visibility}>
//           <ToggleMenu onClick={this.showMenu} tabIndex="0">
//             <img src={img} width="30px" alt="menu" />
//           </ToggleMenu>
//           {this.state.visibility && (
//           <MenuMobile>
//             <ul>
//               <li>
//                 <Link to={this.props.path}>
//                   <span>Home</span>
//                 </Link>
//               </li>
//               <li><hr /></li>
//               <li><a href=""><span>Become a Host</span></a></li>
//               <li><a href=""><span>Log In</span></a></li>
//               <li><a href=""><span>Sign Up</span></a></li>
//               <li><hr /></li>
//               <li><a href=""><span>Help</span></a></li>
//             </ul>
//           </MenuMobile>
//           )}
//         </MenuWrapper>
//       </nav>
//     );
//   }
// }


export default Navbar;
