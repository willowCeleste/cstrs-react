const Home = props => {
  console.log(props.user);
  return <div>
    <h2>Hello {props.user.firstName}!</h2>
  </div>
};

export default Home;