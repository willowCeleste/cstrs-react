import Title from "../../Components/Title/Title";

const Info = () => {
  return <div>
    <Title text="Some Info" />
    <p className="o-paragraph">Hello! If you're reading this right now, you're very likely some sort of roller coaster nerd. If not, that's okay! Here are some terms that will make this app make a whole lot more sense:</p>

    <ul className="o-list">
      <li><span className="o-list__bold">Ride</span> - This is probably self-explanatory, but if you waited in line to board a roller coaster and then remained on it while it completed the circuit, that was one ride. You can track individual rides and give them ratings.</li>
      <li><span className="o-list__bold">Credit</span> - Enthusiasts say you have a credit for a roller coaster if you've ridden it. So, your list of credits in the app is a list of all the roller coasters you've ridden, along with the date you first rode it.</li>
    </ul>

    <p className="o-paragraph">This app is a labor of love! I personally tracked my rides and credits in a big spreadsheet, but I always wished there was an intuitive, data-driven app that enthusiasts could use to keep track of the coasters they've ridden (because we all love to brag about our credit counts). I took a lot of inspiration from <a className="o-link o-link__paragraph" href="https://letterboxd.com/">Letterboxd</a> and <a href="https://www.bgstatsapp.com/" className="o-link o-link__paragraph">Board Game Stats</a>, so thank you to the teams that built those!</p>

    <p className="o-paragraph">
      The database of roller coasters is far from complete. I've been manually copying data from <a href="http://rcdb" className="o-link o-link__paragraph">The Roller Coaster Database</a>, and it's time consuming! I'm hoping to have all operating coasters in North America entered by the start of the 2022 season, followed by Europe and then the rest of the world (hopefully). If you're here to test drive the app, try adding rides for coasters at Six Flags Great Adventure (El Toro, Nitro, Jersey Devil, Kingda Ka), Hersheypark (Stormrunner, Skyrush, Fahrenheit) or Dorney Park (Steel Force, Talon, Hydra).
    </p>

    <p className="o-paragraph">
    Please email <a href="mailto:admin@cstrs.net" className="o-link o-link__paragraph">admin@cstrs.net</a> with any issues or suggestisons. Enjoy your rides!
    </p>

    <p className="o-paragraph">
      Best,
      <br />
      Willow
    </p>

    <p className="o-paragraph">
      p.s. My partner and I run a little enthusiasts Instagram called <a href="https://www.instagram.com/coasterpunx/" className="o-link o-link__paragraph">coasterpunx</a> if you'd like to follow our adventures. 
    </p>
    
  </div>
};

export default Info;